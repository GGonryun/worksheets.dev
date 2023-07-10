import * as fs from 'fs';
import { Command } from 'commander';
import {
  apiKey,
  apiUrl,
  appUrl,
  configFileName,
  printVerboseHook,
  rootDebug,
  verboseDebug,
} from '../utils.js';
import * as process from 'process';
import { readFilesInFolder, removeExtension } from '@worksheets/util-hardware';
import { yaml } from '@worksheets/util-yaml';
import inquirer from 'inquirer';
import {
  CommitDeploymentRequest,
  CommitDeploymentResponse,
  StageDeploymentRequest,
  StageDeploymentResponse,
} from '@worksheets/schemas-deployments';
import {
  CreateWorksheetRequest,
  overridableCreationPropertiesSchema,
} from '@worksheets/schemas-worksheets';

const key = 'deploy';
const debug = rootDebug.extend(key);
const error = rootDebug.extend(`${key}:error`);
const verbose = verboseDebug.extend(`${key}`);

export const deploy = () => {
  const command = new Command(key);
  command
    .option('--verbose', 'output verbose debug logs', false)
    .option(
      '-d, --dry',
      'test to see what your deployment will look like before performing it',
      false
    )
    .option(
      '-D, --delete',
      'delete worksheets that are not in the workspace',
      false
    )
    .option('-y, --yes', 'skip confirmation prompt', false)
    .option(
      '-p, --path <folder>',
      'override worksheet folder location',
      process.env['WORKSHEETS_FOLDER'] ?? '.worksheets/'
    )
    .hook('preAction', printVerboseHook)
    .action(async () => {
      const options = command.opts();

      const dry = options['dry'];
      const skipPrompts = options['yes'];
      const destroy = options['delete'];
      const path = options['path'];

      if (path && !fs.existsSync(path)) {
        error('invalid path provided');
        process.exit(1);
      }

      debug(`Searching for worksheets in workspace ${path}`);

      let overrides: Record<string, unknown> = {};
      const worksheets: Record<string, string> = {};
      const files = readFilesInFolder(path);
      // get all files in the path.
      for (const key in files) {
        // search for the config file and save it for later
        if (key === configFileName) {
          // save overrides
          overrides = yaml.read(files[key]);
          verbose(`Found config file ${JSON.stringify(overrides, null, 4)}`);
        } else {
          const value = files[key];

          // remove the extension from the key
          const name = removeExtension(key);
          worksheets[name] = value;
          verbose(`Found file ${name}\n${value}`);
        }
      }

      debug(
        `Detected ${Object.keys(files).length} worksheets in workspace ${path}.`
      );
      debug(`Bundling worksheets for deployment.`);

      // for each worksheet, upsert it.
      const requests: CreateWorksheetRequest[] = [];
      for (const key in worksheets) {
        const request: CreateWorksheetRequest = {
          name: key,
          text: worksheets[key],
        };

        // set any specified overrides or upsert with defaults.
        const override = overrides[key];
        if (override) {
          verbose(`Found overrides for ${key}`);
          const parse = overridableCreationPropertiesSchema.safeParse(override);
          if (parse.success) {
            Object.assign(request, parse);
          } else {
            error(`Error parsing overrides for ${key}: ${parse.error.message}`);
            process.exit(1);
          }
        }

        requests.push(request);
      }

      // request the state of each worksheet for deployment
      const request: StageDeploymentRequest = { requests: requests };
      const stageDeployment = await fetch(
        `${apiUrl}/api/worksheets/deployment/stage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(request),
        }
      );

      if (!stageDeployment.ok) {
        error(
          `An error occured while analyzing changes in workspace: ${stageDeployment.statusText}`
        );
        process.exit(1);
      }

      const { operations, errors }: StageDeploymentResponse =
        await stageDeployment.json();

      // if there are any worksheets that are not valid, then stop the deployment with a build error.
      if (errors.length > 0) {
        error(
          `There were ${errors.length} errors while validating worksheets.`
        );
        error(
          `Please fix the following errors and try again:\n${JSON.stringify(
            errors,
            null,
            4
          )}`
        );
        process.exit(1);
      } else {
        verboseDebug(`Validation step was successful.`);
      }

      // let the user know what worksheets are going to be deployed.
      debug(
        `There are ${operations.filter(
          (x) => x.action !== 'noop'
        )} worksheets with pending changes in your workspace.`
      );
      debug(
        `There are ${operations.filter(
          (x) => x.action === 'create'
        )} worksheets to create.`
      );
      debug(
        `There are ${operations.filter(
          (x) => x.action === 'update'
        )} worksheets to update.`
      );
      debug(
        `There are ${operations.filter(
          (x) => x.action === 'delete'
        )} worksheets to delete.${
          destroy ? '' : ' Run with --delete to delete worksheets.'
        }`
      );

      // for each request, ask the user if they would like to deploy it.
      const approvedRequests = [];
      for (const option of operations) {
        // if the request is a delete and we are not deleting, then skip it.
        if (option.action === 'delete' && !destroy) {
          verbose(
            'Skipping delete request, run with --delete to delete worksheets.'
          );
          continue;
        }

        // if the request is a noop, then skip it.
        if (option.action === 'noop') {
          verbose(
            `Skipping noop request for ${option.name}, no changes detected.`
          );
          continue;
        }

        // ask the user if they want to continue with the deployment. skip approval if forced.
        let approved = skipPrompts;
        if (!approved) {
          const rsp = await inquirer.prompt([
            {
              type: 'confirm',
              name: 'confirm',
              message: `Are you sure you want to ${option.action} worksheet ${option.name}?`,
            },
          ]);

          approved = rsp.confirm;
        }

        // if approved or forced, then add to the list of approved requests.
        if (approved) {
          verbose(`Approved worksheet ${option.name}`);
          const request = requests.find((x) => x.name === option.name);
          if (!request) {
            error(
              `Could not find matching request for deployment option ${option.name}`
            );
            process.exit(1);
          }
          approvedRequests.push(request);
        }
      }

      // if there are no approved requests, then exit.
      if (approvedRequests.length === 0) {
        debug('No worksheets were approved for deployment.');
        process.exit(0);
      }

      // ask the user to review the approved requests.
      const review = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `Are you sure you want to deploy ${approvedRequests.length} worksheets?`,
        },
      ]);

      // if not confirmed, then exit.
      if (!review.confirm) {
        debug('Deployment cancelled.');
        process.exit(0);
      }

      // if dry run, then exit.
      if (dry) {
        debug('Dry run complete.');
        process.exit(0);
      }

      // deploy the approved requests.
      const commitRequest: CommitDeploymentRequest = {
        requests: approvedRequests,
      };

      const commitResult = await fetch(
        `${apiUrl}/api/worksheets/deployment/commit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(commitRequest),
        }
      );

      if (!commitResult.ok) {
        error(
          `An error occured while deploying worksheets: ${commitResult.statusText}`
        );
        process.exit(1);
      }

      const deployment: CommitDeploymentResponse = await commitResult.json();
      if (!deployment.success) {
        error(
          `An error occured while deploying worksheets: ${JSON.stringify(
            deployment.errors,
            null,
            4
          )}`
        );
        process.exit(1);
      }

      for (const state of deployment.states) {
        if (state.action !== 'noop' && state.state == 'missing-connections') {
          debug(
            `Worksheet ${state.name} requires a connection. Visit ${appUrl}/worksheets/${state.id}/connections to complete the deployment.`
          );
        }
      }
      debug(`Deployment complete.`);

      process.exit(0);
    });
  return command;
};

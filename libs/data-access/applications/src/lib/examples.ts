import { TRPCError } from '@trpc/server';
import { AnyApplication } from '@worksheets/apps-core';
import {
  MethodSampleData,
  ApplicationRegistrySampleData,
  sampleData,
} from '@worksheets/apps-sample-data';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

const format = (input: unknown) => {
  if (input == null) return '';
  return JSON.stringify(input, null, 4);
};

export const createTypeScriptExample = ({
  appId,
  methodId,
}: {
  appId: string;
  methodId: string;
}) => {
  const options = format({ apiKey: 'WORKSHETS_API_KEY' });

  const appContext = format(getAppContext(appId));

  const input = format(getMethodInputs({ appId, methodId }));

  const output = format(getMethodOutputs({ appId, methodId }));

  const lines = [];

  lines.push(`const client = newClient(${options})`);
  lines.push(``);
  lines.push(`${appId}(${appContext}).${methodId}(${input}).then((data) => {`);
  lines.push(`\t console.log(data);`);
  lines.push(`})`);
  lines.push(`/**********************`);
  lines.push(`${output}`);
  lines.push(`**********************/`);

  return lines.join('\n');
};

// TODO: move to strings
function stringifyWithSpace(obj: unknown) {
  if (!obj) return '';
  let result = JSON.stringify(obj, null, 1); // stringify, with line-breaks and indents
  result = result.replace(/^ +/gm, ' '); // remove all but the first space for each line
  result = result.replace(/\n/g, ''); // remove line-breaks
  result = result.replace(/{ /g, '{').replace(/ }/g, '}'); // remove spaces between object-braces and first/last props
  result = result.replace(/\[ /g, '[').replace(/ \]/g, ']'); // remove spaces between array-brackets and first/last items
  return result;
}

export const createCurlExample = ({
  appId,
  methodId,
}: {
  appId: string;
  methodId: string;
}) => {
  const context = stringifyWithSpace(getAppContext(appId) ?? {});

  const input = stringifyWithSpace(getMethodInputs({ appId, methodId }));

  const output = format(getMethodOutputs({ appId, methodId }));

  const request = `
curl --request POST '${SERVER_SETTINGS.WEBSITES.API_URL()}/v1/call/${appId}/${methodId}'  \\
  --header 'Content-Type: application/json' \\
  --header 'Authorization: Bearer WORKSHEETS_API_KEY' \\
  -d '{ "context": ${context}, "input": ${input || format({})} }'
    `.trim();

  const response = output;

  return { request, response };
};

/** All of these methods fetch sample data */
const getApp = (
  appId: string
): MethodSampleData<AnyApplication> | undefined => {
  const key = appId as keyof ApplicationRegistrySampleData;
  return sampleData[key] as unknown as MethodSampleData<AnyApplication>;
};

const getAppContext = (appId: string) => {
  return getApp(appId)?.context;
};

const getMethod = ({
  appId,
  methodId,
}: {
  appId: string;
  methodId: string;
}) => {
  const app = getApp(appId);
  if (!app) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `App not found: ${appId}`,
    });
  }

  const method = app[methodId];
  if (!method) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Method not found: ${methodId} on app: ${appId}`,
    });
  }
  return method;
};

const getMethodInputs = ({
  appId,
  methodId,
}: {
  appId: string;
  methodId: string;
}) => {
  const method = getMethod({ appId, methodId });
  return method.input;
};

const getMethodOutputs = ({
  appId,
  methodId,
}: {
  appId: string;
  methodId: string;
}) => {
  const method = getMethod({ appId, methodId });
  return method.output;
};

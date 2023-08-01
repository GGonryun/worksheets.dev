import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import {
  ConnectionStatuses,
  GetConnectionDetailsRequest,
  GetConnectionDetailsResponse,
  PresentationalField,
} from '@worksheets/schemas-connections';
import { maskStringExceptLastFive } from '@worksheets/util/strings';
import { getConnection } from './util';

const applications = newApplicationsDatabase();

export const getConnectionDetails: (
  uid: string,
  req: GetConnectionDetailsRequest
) => Promise<GetConnectionDetailsResponse> = async (userId, { appId }) => {
  const appDetails = applications.getDetails(appId);
  const connectionDetails = applications.getConnectionDetails(appId);

  const connection = await getPresentiationalConnection({ userId, appId });

  return {
    appId: appId,
    header: {
      name: appDetails.title,
      logo: appDetails.logo,
      categories: appDetails.categories,
      setupTime: `< ${connectionDetails.setupTime} minutes`,
    },
    details: {
      description: appDetails.description,
      instructions: connectionDetails.instructions,
      security: connectionDetails.security,
    },
    form: {
      status: connection.status ?? 'uninstalled',
      dialog: {
        severity: connection.error ? 'error' : 'none',
        content: connection.error ?? '',
      },
      fields: [...connection.fields],
    },
  };
};

type PresentationalConnection = {
  status: ConnectionStatuses;
  error?: string;
  fields: PresentationalField[];
};

const getPresentiationalConnection = async (opts: {
  userId: string;
  appId: string;
}): Promise<PresentationalConnection> => {
  // get the form field metadata.
  const form = applications.getConnectionFields(opts.appId);

  // get the connection.
  const connection = await getConnection(opts);

  // the connection should be decrypted already after we access it.
  const fields: PresentationalField[] = [];
  for (const key in form) {
    const field = form[key];
    if (field.type === 'sensitive') {
      const value = maskStringExceptLastFive(connection?.fields[key] ?? '');

      fields.push({
        key,
        label: field.title,
        type: 'sensitive',
        helpUrl: field.helpUrl,
        value,
      });
    } else if (field.type === 'oauth') {
      // if the oauth access token exists, treat it as valid.
      const value = Boolean(connection?.fields[key]);
      const error = connection?.error;

      fields.push({
        key,
        label: field.title,
        type: 'button',
        value: error ? 'error' : value ? 'true' : '',
        helpUrl: field.helpUrl,
      });
    }
  }

  return {
    status: connection?.status ?? 'uninstalled',
    error: connection?.error,
    fields: fields,
  };
};

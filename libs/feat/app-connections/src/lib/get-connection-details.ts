import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import {
  CredentialStatuses,
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
) => Promise<GetConnectionDetailsResponse> = async (
  userId,
  { appId, connectionId }
) => {
  const appDetails = applications.getDetails(appId);
  const connectionDetails = applications.getConnectionDetails(appId);

  const connection = await getPresentiationalConnection({
    userId,
    appId,
    connectionId,
  });

  return {
    id: connectionId,
    appId: appId,
    header: {
      updatedAt: connection.updatedAt,
      createdAt: connection.createdAt,
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
    credentials: {
      status: connection.status,
      fields: [...connection.fields],
      dialog: {
        severity: 'none',
        content: '',
      },
    },
    configuration: {
      name: connection.name,
      enabled: connection.enabled,
    },
  };
};

type PresentationalConnection = {
  id: string;
  status: CredentialStatuses;
  fields: PresentationalField[];
  name: string;
  enabled: boolean;
  updatedAt: number;
  createdAt: number;
};

export const getPresentiationalConnection = async (opts: {
  userId: string;
  connectionId: string;
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

      fields.push({
        key,
        label: field.title,
        type: 'oauth',
        value: value ? 'true' : '',
        helpUrl: field.helpUrl,
      });
    } else if (field.type === 'text') {
      const value = connection?.fields[key] ?? '';

      fields.push({
        key,
        label: field.title,
        type: 'text',
        helpUrl: field.helpUrl,
        value,
      });
    }
  }

  return {
    id: connection?.id ?? '',
    status: connection ? 'active' : 'pending', // TODO: check status of connection
    name: connection?.name ?? '',
    enabled: connection?.enabled ?? false,
    updatedAt: connection?.updatedAt ?? 0,
    createdAt: connection?.createdAt ?? 0,
    fields: fields,
  };
};

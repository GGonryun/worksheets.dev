import { TRPCError } from '@trpc/server';
import { connections } from '@worksheets/apps-connections';
import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { newConnectionsDatabase } from '@worksheets/data-access/connections';
import { DatabaseFailure } from '@worksheets/firebase/firestore';
import { GetApplicationDetailsResponse } from '@worksheets/schemas-applications';
import { ConnectionBasics } from '@worksheets/schemas-connections';

const applications = newApplicationsDatabase();
const connectionsDb = newConnectionsDatabase();

export const getConnectableAppKeys = (): string[] => {
  const keys = Object.keys(connections);
  return keys.filter((key) => connections[key as keyof typeof connections]);
};

export const getApplicationDetails = () => {
  const details: GetApplicationDetailsResponse[] = [];

  for (const key of getConnectableAppKeys()) {
    if (applications.isVisibleInGallery(key)) {
      details.push(applications.getDetails(key));
    }
  }

  return details.map(translateApplicationDetailsToConnectionDetails);
};

export const translateApplicationDetailsToConnectionDetails = (
  details: GetApplicationDetailsResponse
): ConnectionBasics => {
  return {
    appId: details.appId,
    name: details.title,
    logo: details.logo,
    description: details.description,
    status: 'unknown',
  };
};

export const getConnection = async (opts: {
  connectionId: string;
  userId: string;
}) => {
  try {
    return await connectionsDb.getByConnectionId({
      connectionId: opts.connectionId,
      userId: opts.userId,
    });
  } catch (error) {
    if (!(error instanceof DatabaseFailure) || error.code !== 'not-found') {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Unexpected failure when fetching connection`,
        cause: error,
      });
    }

    return undefined;
  }
};

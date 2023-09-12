import { newApplicationsDatabase } from '@worksheets/data-access/applications';
import { publicProcedure } from '../../../procedures';
import { listVaultConnectorsResponseSchema } from '@worksheets/schemas-connections';

export default publicProcedure
  .output(listVaultConnectorsResponseSchema)
  .query(() => {
    return listVaultConnectors();
  });

// TODO: we need to create a vault connector feature library.
const db = newApplicationsDatabase();
const listVaultConnectors = () => {
  const filtered = db.list().filter((e) => db.supportsConnections(e.id));
  return filtered.map((e) => ({
    appId: e.id,
    title: e.name,
    logo: e.logo,
  }));
};

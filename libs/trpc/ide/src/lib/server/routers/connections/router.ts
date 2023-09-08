import { t } from '../../trpc';
import getDetails from './getDetails';
import createOAuthUrl from './createOAuthUrl';
import upsertConnection from './upsertConnection';
import deleteByApplication from './deleteByApplication';
import updateConfiguration from './updateConfiguration';
import testConnection from './testConnection';
import list from './list';
import destroy from './delete';

export default t.router({
  getDetails,
  createOAuthUrl,
  deleteByApplication,
  list,
  updateConfiguration,
  upsertConnection,
  testConnection,
  delete: destroy,
});

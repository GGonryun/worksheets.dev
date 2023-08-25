import { t } from '../../trpc';
import getPage from './getPage';
import getDetails from './getDetails';
import createOAuthUrl from './createOAuthUrl';
import upsertConnection from './upsertConnection';
import deleteByApplication from './deleteByApplication';
import updateConfiguration from './updateConfiguration';
import testConnection from './testConnection';
import toggleStatus from './toggleStatus';
import list from './list';
import destroy from './delete';

export default t.router({
  getPage,
  getDetails,
  createOAuthUrl,
  deleteByApplication,
  toggleStatus,
  list,
  updateConfiguration,
  upsertConnection,
  testConnection,
  delete: destroy,
});

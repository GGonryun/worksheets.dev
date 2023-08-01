import { t } from '../../trpc';
import getPage from './getPage';
import getDetails from './getDetails';
import createOAuthUrl from './createOAuthUrl';
import deleteByApplication from './deleteByApplication';
import updateProperty from './updateProperty';
import toggleStatus from './toggleStatus';

export default t.router({
  getPage,
  getDetails,
  createOAuthUrl,
  deleteByApplication,
  updateProperty,
  toggleStatus,
});

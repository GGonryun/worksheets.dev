import { t } from '../../trpc';
import details from './details';
import list from './list';
import selectProvider from './selectProvider';
import toggleStatus from './toggleStatus';

export default t.router({
  list,
  details,
  selectProvider,
  toggleStatus,
});

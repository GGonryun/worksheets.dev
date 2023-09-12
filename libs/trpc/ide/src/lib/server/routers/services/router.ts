import { t } from '../../trpc';
import details from './details';
import list from './list';
import selectProvider from './selectProvider';
import toggleStatus from './toggleStatus';
import categorize from './categorize';

export default t.router({
  list,
  categorize,
  details,
  selectProvider,
  toggleStatus,
});

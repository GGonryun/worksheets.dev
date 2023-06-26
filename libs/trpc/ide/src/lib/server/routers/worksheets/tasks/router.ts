import { t } from '../../../trpc';
import history from './history';
import execution from './execution';

export default t.router({
  history,
  execution,
});

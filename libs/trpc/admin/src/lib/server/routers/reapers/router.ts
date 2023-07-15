import { t } from '../../trpc';
import limits from './limits';
import executions from './executions';

export default t.router({
  limits,
  executions,
});

import { t } from '../../trpc';
import limits from './limits';
import logging from './logging';
import executions from './executions';
import history from './history';
import handshakes from './handshakes';

export default t.router({
  logging,
  limits,
  executions,
  history,
  handshakes,
});

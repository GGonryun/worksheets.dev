import { t } from '../../../trpc';
import echo from './echo';
import log from './log';
import ping from './ping';

export default t.router({
  echo,
  log,
  ping,
});

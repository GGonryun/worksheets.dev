import { t } from '../../../trpc';
import echo from './echo';
import ping from './ping';

export default t.router({
  echo,
  ping,
});

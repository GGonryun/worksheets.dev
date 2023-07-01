import { t } from '../../trpc';
import execute from './execute';
import reap from './reap';
import process from './process';

export default t.router({
  execute,
  process,
  reap,
});

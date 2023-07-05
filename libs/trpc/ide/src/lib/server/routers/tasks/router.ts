import { t } from '../../trpc';
import execute from './execute';
import process from './process';

export default t.router({
  execute,
  process,
});

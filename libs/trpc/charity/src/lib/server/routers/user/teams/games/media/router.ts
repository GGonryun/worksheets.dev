import { t } from '../../../../../trpc';
import read from './read';
import update from './update';

export default t.router({
  read,
  update,
});

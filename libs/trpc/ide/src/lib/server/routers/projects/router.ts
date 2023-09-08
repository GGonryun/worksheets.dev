import { t } from '../../trpc';
import list from './list';
import create from './create';
import validateProjectId from './validateProjectId';

export default t.router({
  list,
  create,
  validateProjectId,
});

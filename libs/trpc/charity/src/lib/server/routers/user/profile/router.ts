import { t } from '../../../trpc';
import terms from './terms/router';
import update from './update';

export default t.router({
  update,
  terms,
});

import { t } from '../../trpc';

//routers
import methods from './methods/router';
//actions
import get from './get';
import list from './list';

export default t.router({
  list,
  get,
  methods,
});

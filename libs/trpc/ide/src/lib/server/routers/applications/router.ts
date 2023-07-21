import { t } from '../../trpc';
//routers
import methods from './methods/router';

//actions
import get from './get';
import details from './details';
import list from './list';

export default t.router({
  list,
  get,
  details,
  methods,
});

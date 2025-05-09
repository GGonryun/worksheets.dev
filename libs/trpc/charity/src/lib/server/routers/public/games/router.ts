import { t } from '../../../trpc';
import find from './find';
import library from './library';
import list from './list';
import newest from './newest';
import popular from './popular';
import report from './report';
import suggestions from './suggestions';
import team from './team/router';
import vote from './vote/router';

export default t.router({
  vote,
  suggestions,
  popular,
  newest,
  find,
  report,
  list,
  library,
  team,
});

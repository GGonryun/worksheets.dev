import { t } from '../../../trpc';
import achievements from './achievements';
import find from './find';
import library from './library';
import list from './list';
import newest from './newest';
import popular from './popular';
import popularity from './popularity';
import report from './report';
import suggestions from './suggestions';
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
  achievements,
  popularity,
});

import { t } from '../../../trpc';
import find from './find';
import findRandom from './findRandom';
import library from './library';
import list from './list';
import play from './play/router';
import popular from './popular';
import report from './report';
import suggestions from './suggestions';
import vote from './vote/router';

export default t.router({
  vote,
  suggestions,
  popular,
  find,
  findRandom,
  play,
  report,
  list,
  library,
});

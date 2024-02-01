import { t } from '../../trpc';
import files from './files/router';
import find from './find';
import findRandom from './findRandom';
import list from './list';
import play from './play/router';
import report from './report';
import submissions from './submissions/router';
import suggestions from './suggestions';
import vote from './vote/router';

export default t.router({
  // sub-routers
  vote,
  submissions,
  files,
  // procedures
  suggestions,
  find,
  findRandom,
  play,
  report,
  list,
});

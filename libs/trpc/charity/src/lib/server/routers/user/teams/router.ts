import { t } from '../../../trpc';
import create from './create';
import files from './files/router';
import games from './games/router';
import images from './images/router';
import list from './list';

export default t.router({
  list,
  create,
  images,
  files,
  games,
});

import { t } from '../../../trpc';
import checkSlug from './check-slug';
import create from './create';
import files from './files/router';
import games from './games/router';
import links from './links';
import list from './list';
import profile from './profile';
import select from './select';
import selected from './selected';

export default t.router({
  list,
  select,
  create,
  files,
  games,
  selected,
  checkSlug,
  profile,
  links,
});

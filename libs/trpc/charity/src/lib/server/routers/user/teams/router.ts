import { t } from '../../../trpc';
import check from './check';
import create from './create';
import destroy from './destroy';
import files from './files/router';
import games from './games/router';
import invitations from './invitations/router';
import links from './links';
import list from './list';
import members from './members/router';
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
  check,
  profile,
  links,
  members,
  invitations,
  delete: destroy,
});

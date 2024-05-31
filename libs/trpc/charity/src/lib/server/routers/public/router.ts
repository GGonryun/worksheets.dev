import { t } from '../../trpc';
import categories from './categories/router';
import developers from './developers/router';
import games from './games/router';
import items from './items/router';
import monsters from './monsters/router';
import raffles from './raffles/router';
import usage from './usage/router';
import users from './users/router';

export default t.router({
  raffles,
  usage,
  categories,
  developers,
  games,
  monsters,
  items,
  users,
});

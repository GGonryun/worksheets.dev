import { t } from '../../trpc';
import arcade from './arcade/router';
import categories from './categories/router';
import developers from './developers/router';
import games from './games/router';
import prizes from './prizes/router';
import raffles from './raffles/router';
import usage from './usage/router';

export default t.router({
  arcade,
  prizes,
  raffles,
  usage,
  categories,
  developers,
  games,
});

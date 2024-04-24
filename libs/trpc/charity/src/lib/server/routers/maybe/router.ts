import { t } from '../../trpc';
import advertisements from './advertisements/router';
import battles from './battles/router';

export default t.router({
  battles,
  advertisements,
});

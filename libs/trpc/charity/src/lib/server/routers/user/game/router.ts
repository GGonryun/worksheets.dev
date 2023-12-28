import { t } from '../../../trpc';
import details from './details';
import vote from './vote';
import favorite from './favorite';

export default t.router({
  details,
  vote,
  favorite,
});

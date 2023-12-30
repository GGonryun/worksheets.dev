import { t } from '../../trpc';
import contributions from './contributions';
import popularity from './popularity';

export default t.router({
  contributions,
  popularity,
});

import { t } from '../../trpc';
import identify from './identify';
import tokens from './tokens/router';

export default t.router({
  identify,
  tokens,
});

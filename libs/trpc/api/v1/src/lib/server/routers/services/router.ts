import { t } from '../../trpc';
import email from './email/router';
import system from './system/router';

export default t.router({
  email,
  system,
});

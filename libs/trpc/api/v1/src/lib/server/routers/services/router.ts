import { t } from '../../trpc';
import email from './email/router';
import system from './system/router';
import gifs from './gifs/router';

export default t.router({
  email,
  system,
  gifs,
});

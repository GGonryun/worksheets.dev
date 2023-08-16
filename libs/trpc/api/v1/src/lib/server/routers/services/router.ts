import { t } from '../../trpc';
import email from './email/router';
import system from './system/router';
import gifs from './gifs/router';
import sms from './sms/router';
import crud from './crud/router';

export default t.router({
  email,
  system,
  gifs,
  sms,
  crud,
});

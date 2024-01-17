import { t } from '../../../trpc';
import anonymous from './anonymous';
import authorized from './authorized';

export default t.router({
  anonymous,
  authorized,
});

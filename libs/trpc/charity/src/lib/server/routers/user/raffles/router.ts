import { t } from '../../../trpc';
import entered from './entered';
import enterRaffle from './enterRaffle';
import participation from './participation';

export default t.router({
  entered,
  participation,
  enterRaffle,
});

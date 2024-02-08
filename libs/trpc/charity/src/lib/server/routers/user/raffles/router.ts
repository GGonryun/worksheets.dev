import { t } from '../../../trpc';
import claim from './claim';
import entered from './entered';
import enterRaffle from './enterRaffle';
import participation from './participation';
import won from './won';

export default t.router({
  entered,
  won,
  participation,
  enterRaffle,
  claim,
});

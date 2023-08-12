import { ServiceProviderBridges } from '../framework';
import { echo } from './echo';
import { log } from './log';
import { ping } from './ping';

export const system: ServiceProviderBridges<'system'> = {
  echo,
  log,
  ping,
};

import { ServiceProviderBridges } from '../framework';
import { echo } from './echo';
import { ping } from './ping';

export const system: ServiceProviderBridges<'system'> = {
  echo,
  ping,
};

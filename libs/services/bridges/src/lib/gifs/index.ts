import { ServiceProviderBridges } from '../framework';
import { search } from './search';

export const gifs: ServiceProviderBridges<'gifs'> = {
  search,
};

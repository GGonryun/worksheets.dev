import { ServiceProviderBridges } from '../framework';
import { send } from './send';

export const email: ServiceProviderBridges<'email'> = {
  send,
};

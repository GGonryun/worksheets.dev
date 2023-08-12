import { ServiceProviderBridges } from '../framework';
import { send } from './send';

export const sms: ServiceProviderBridges<'sms'> = {
  send,
};

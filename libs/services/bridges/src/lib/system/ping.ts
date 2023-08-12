import { formatTimestampLong } from '@worksheets/util/time';
import { EndpointProviderBridge, EndpointProviderBridges } from '../framework';

export const sys: EndpointProviderBridge<
  'system',
  'ping',
  'sys'
> = async () => {
  return { pong: `ping ${formatTimestampLong(Date.now())}` };
};

export const ping: EndpointProviderBridges<'system', 'ping'> = {
  sys,
};

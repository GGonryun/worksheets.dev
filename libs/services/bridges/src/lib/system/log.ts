import { EndpointProviderBridge, EndpointProviderBridges } from '../framework';

export const sys: EndpointProviderBridge<'system', 'log', 'sys'> = async (
  opts
) => {
  console.log('system application logging', opts);
  return { message: opts.input.message };
};

export const log: EndpointProviderBridges<'system', 'log'> = {
  sys,
};

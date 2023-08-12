import { EndpointProviderBridges } from '../framework';

export const echo: EndpointProviderBridges<'system', 'echo'> = {
  sys: async ({ input }) => input,
};

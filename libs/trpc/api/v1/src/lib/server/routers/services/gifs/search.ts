import { services } from '@worksheets/services-registry';
import { providerBridges } from '@worksheets/services-bridges';
import skeleton from '../../../skeleton';

export default skeleton({
  service: services.gifs,
  endpoint: services.gifs.endpoints.search,
  bridges: providerBridges.gifs.search,
});

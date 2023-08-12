import { providerBridges } from '@worksheets/services-bridges';
import { services } from '@worksheets/services-registry';
import skeleton from '../../../skeleton';

export default skeleton({
  service: services.system,
  endpoint: services.system.endpoints.log,
  bridges: providerBridges.system.log,
});

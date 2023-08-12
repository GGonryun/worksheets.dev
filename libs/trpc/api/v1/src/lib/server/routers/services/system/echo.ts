import { services } from '@worksheets/services-registry';
import { providerBridges } from '@worksheets/services-bridges';
import skeleton from '../../../skeleton';

export default skeleton({
  service: services.system,
  endpoint: services.system.endpoints.echo,
  bridges: providerBridges.system.echo,
});

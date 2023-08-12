import { services } from '@worksheets/services-registry';
import { providerBridges } from '@worksheets/services-bridges';
import skeleton from '../../../skeleton';

export default skeleton({
  service: services.email,
  endpoint: services.email.endpoints.send,
  bridges: providerBridges.email.send,
});

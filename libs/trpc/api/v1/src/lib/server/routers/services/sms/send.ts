import { services } from '@worksheets/services-registry';
import { providerBridges } from '@worksheets/services-bridges';
import skeleton from '../../../skeleton';

export default skeleton({
  service: services.sms,
  endpoint: services.sms.endpoints.send,
  bridges: providerBridges.sms.send,
});

import { services } from '@worksheets/services-registry';
import { providerBridges } from '@worksheets/services-bridges';
import skeleton from '../../../skeleton';

export default skeleton({
  service: services.crud,
  endpoint: services.crud.endpoints.list,
  bridges: providerBridges.crud.list,
});
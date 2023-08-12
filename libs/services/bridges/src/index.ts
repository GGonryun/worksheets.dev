export * from './lib/framework';

import { ServiceBridgeRegistry } from './lib/framework';
import { email } from './lib/email';
import { crud } from './lib/crud';
import { gifs } from './lib/gifs';
import { sms } from './lib/sms';
import { system } from './lib/system';

export const providerBridges: ServiceBridgeRegistry = {
  crud,
  email,
  gifs,
  sms,
  system,
};

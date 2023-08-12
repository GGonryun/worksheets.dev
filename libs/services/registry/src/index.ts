import { newRegistry } from '@worksheets/services-core';
import { email } from './lib/email';
import { crud } from './lib/crud';
import { gifs } from './lib/gifs';
import { sms } from './lib/sms';
import { system } from './lib/system';

export const services = newRegistry({
  crud,
  email,
  gifs,
  sms,
  system,
});

export type ServiceRegistry = typeof services;
export type ServiceRegistryKeys = keyof ServiceRegistry;

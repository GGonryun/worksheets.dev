// system test methods like.
import { newService, newEndpoint } from '@worksheets/services-core';
import { z } from '@worksheets/zod';

const log = newEndpoint({
  id: 'log',
  title: 'Log',
  subtitle: 'Log a message',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/system/log.svg',
  input: z.object({
    message: z.string(),
  }),
  output: z.object({
    message: z.string(),
  }),
  providers: ['sys'],
});

const echo = newEndpoint({
  id: 'echo',
  title: 'Echo',
  subtitle: 'Echo a message',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/system/echo.svg',
  input: z.object({
    message: z.string(),
  }),
  output: z.object({
    message: z.string(),
  }),
  providers: ['sys'],
});

const ping = newEndpoint({
  id: 'ping',
  title: 'Ping',
  subtitle: 'Ping the service',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/system/ping.svg',
  input: z.object({}),
  output: z.object({
    pong: z.string(),
  }),
  providers: ['sys'],
});

export const system = newService({
  id: 'system',
  title: 'System',
  subtitle: 'System test methods like log, echo, and ping',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/system/system.svg',
  category: 'internal',
  providers: ['sys'],
  endpoints: {
    log,
    echo,
    ping,
  },
});

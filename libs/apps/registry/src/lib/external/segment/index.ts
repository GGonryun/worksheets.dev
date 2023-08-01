import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export const alias = newMethod({
  appId: 'segment',
  methodId: 'alias',
  input: z.object({
    userId: z.string(),
    previousId: z.string(),
  }),
  output: z.undefined(),
});

export const group = newMethod({
  appId: 'segment',
  methodId: 'group',
  input: z.object({
    userId: z.string().optional(),
    groupId: z.string(),
    traits: z.record(z.unknown()).optional(),
    context: z.record(z.unknown()).optional(),
    anonymousId: z.string().optional(),
    timestamp: z.string().optional(),
  }),
  output: z.undefined(),
});

export const page = newMethod({
  appId: 'segment',
  methodId: 'page',
  input: z.object({
    userId: z.string().optional(),
    name: z.string().optional(),
    category: z.string().optional(),
    properties: z.record(z.unknown()).optional(),
    context: z.record(z.unknown()).optional(),
    anonymousId: z.string().optional(),
    timestamp: z.string().optional(),
  }),
  output: z.undefined(),
});

export const track = newMethod({
  appId: 'segment',
  methodId: 'track',
  input: z.object({
    userId: z.string().optional(),
    event: z.string(),
    properties: z.record(z.unknown()).optional(),
    anonymousId: z.string().optional(),
  }),
  output: z.undefined(),
});

export const identify = newMethod({
  appId: 'segment',
  methodId: 'identify',
  input: z.object({
    userId: z.string().optional(),
    traits: z.record(z.unknown()).optional(),
    anonymousId: z.string().optional(),
  }),
  output: z.undefined(),
});

export const segment = newApp({
  appId: 'segment',
  context: z.object({
    apiKey: z.string(),
  }),
  methods: {
    alias,
    group,
    page,
    track,
    identify,
  },
});

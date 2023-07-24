import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';

export const alias = newMethod({
  appId: 'segment',
  methodId: 'alias',
  label: 'Alias',
  description:
    'Alias lets you merge two user identities, effectively connecting two sets of user data as one. This is an advanced method, but it is required to manage user identities successfully in some of our integrations.',
  input: z.object({
    userId: z.string(),
    previousId: z.string(),
  }),
  output: z.undefined(),
});

export const group = newMethod({
  appId: 'segment',
  methodId: 'group',
  label: 'Group',
  description:
    'Group lets you associate an individual user with a group—such as a company, organization, account, project, workspace, team, etc.',
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
  label: 'Page',
  description:
    'Page lets you record page views on your website, along with optional extra information about the page being viewed.',
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
  label: 'Track',
  description:
    'Track lets you record any actions your users perform. Every action triggers what we call an “event”, which can also have associated properties.',
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
  label: 'Identify',
  description:
    'Identify lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about them.',
  input: z.object({
    userId: z.string().optional(),
    traits: z.record(z.unknown()).optional(),
    anonymousId: z.string().optional(),
  }),
  output: z.undefined(),
});

export const segment = newApp({
  appId: 'segment',
  label: 'Segment',
  description:
    'Segment is a customer data platform (CDP) that helps you collect, clean, and control your customer data.',
  context: z.object({
    apiKey: z.string(),
  }),
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/segment.svg',
  methods: {
    alias,
    group,
    page,
    track,
    identify,
  },
});

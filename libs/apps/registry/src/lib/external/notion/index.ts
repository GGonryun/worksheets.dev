import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import {
  botSchema,
  personSchema,
  pageSchema,
  databaseSchema,
  createPageSchema,
} from './schemas';

const listUsers = newMethod({
  appId: 'notion',
  methodId: 'listUsers',
  input: z
    .object({
      startCursor: z.string().optional(),
      pageSize: z.number().optional(),
    })
    .optional(),
  output: z.object({
    nextCursor: z.string().optional(),
    hasMore: z.boolean(),
    results: z.array(z.union([personSchema, botSchema])),
  }),
});

const getUser = newMethod({
  appId: 'notion',
  methodId: 'getUser',
  input: z.object({
    userId: z.string(),
  }),
  output: z.union([personSchema, botSchema]),
});

const getBot = newMethod({
  appId: 'notion',
  methodId: 'getBot',
  input: z.null(),
  output: botSchema,
});

const getDatabase = newMethod({
  appId: 'notion',
  methodId: 'getDatabase',
  input: z.object({
    databaseId: z.string(),
  }),
  output: databaseSchema,
});

const createPage = newMethod({
  appId: 'notion',
  methodId: 'createPage',
  input: createPageSchema,
  output: pageSchema,
});

export default newApp({
  appId: 'notion',
  context: z.object({
    apiKey: z.string(),
  }),
  methods: {
    listUsers,
    getUser,
    getBot,
    getDatabase,
    createPage,
  },
});

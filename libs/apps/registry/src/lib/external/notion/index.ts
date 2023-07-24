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
  label: 'Add Item to Database',
  description: 'Add an item to a notion database',
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
  label: 'Retrieve a user',
  description: 'Retrieves a User using the ID specified.',
  input: z.object({
    userId: z.string(),
  }),
  output: z.union([personSchema, botSchema]),
});

const getBot = newMethod({
  appId: 'notion',
  methodId: 'getBot',
  label: "Retrieve your token's bot user",
  description: 'Retrieves the bot user associated with the provided token.',
  input: z.null(),
  output: botSchema,
});

const getDatabase = newMethod({
  appId: 'notion',
  methodId: 'getDatabase',
  label: 'Retrieve a database',
  description:
    "Retrieves a database object — information that describes the structure and columns of a database — for a provided database ID. The response adheres to any limits to an integration's capabilities.",
  input: z.object({
    databaseId: z.string(),
  }),
  output: databaseSchema,
});

const createPage = newMethod({
  appId: 'notion',
  methodId: 'createPage',
  label: 'Create a page',
  description: 'Creates a new page that is a child of an existing database.',
  input: createPageSchema,
  output: pageSchema,
});

export const notion = newApp({
  appId: 'notion',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/notion.svg',
  label: 'Notion',
  description:
    "Developers can use Notion's public API to interact with Notion workspaces programmatically.",
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

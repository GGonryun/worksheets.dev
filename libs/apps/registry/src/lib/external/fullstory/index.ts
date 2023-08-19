import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import { sessionSchema, userSchema } from './schemas';

const createUser = newMethod({
  appId: 'fullstory',
  methodId: 'createUser',
  input: z.object({
    userId: z.string(),
    email: z.string().optional(),
    displayName: z.string().optional(),
    properties: z.record(z.unknown()).optional(),
    idempotenceKey: z.string().optional(),
  }),
  output: z.object({
    id: z.string(),
  }),
});

const getUser = newMethod({
  appId: 'fullstory',
  methodId: 'getUser',
  input: z.object({
    id: z.string().describe('The FullStory-generated id for the user'),
  }),
  output: userSchema,
});

const listUsers = newMethod({
  appId: 'fullstory',
  methodId: 'listUsers',
  input: z.undefined(),
  output: z.object({
    results: z.array(userSchema),
    totalRecords: z.number().optional(),
    nextPageToken: z.string().optional(),
  }),
});

const deleteUser = newMethod({
  appId: 'fullstory',
  methodId: 'deleteUser',
  input: z.object({
    id: z
      .string()
      .optional()
      .describe(
        'The FullStory-generated id for the user - not required if uid is passed as a query parameter'
      ),
    userId: z
      .string()
      .optional()
      .describe(
        "The customer-provided id for a user - required if the id parameter isn't included in the URL path"
      ),
  }),
  output: z.undefined(),
});

const updateUser = newMethod({
  appId: 'fullstory',
  methodId: 'updateUser',

  input: userSchema.partial().required({ id: true }),
  output: z.object({
    id: z.string(),
  }),
});

const createEvent = newMethod({
  appId: 'fullstory',
  methodId: 'createEvent',

  input: z.object({
    user: z
      .object({
        id: z.string().optional(),
        userId: z.string().optional(),
      })
      .optional(),
    name: z.string(),
    session: z
      .object({
        id: z.string().optional(),
        useMostRecent: z.boolean().optional(),
      })
      .optional(),
    timestamp: z.string().optional(),
    properties: z.record(z.unknown()).optional(),
  }),
  output: z.undefined(),
});

const listSessions = newMethod({
  appId: 'fullstory',
  methodId: 'listSessions',

  input: z.object({
    userId: z.string().optional(),
    limit: z.number().optional(),
    email: z.string().optional(),
  }),
  output: z.object({
    sessions: z.array(sessionSchema),
  }),
});

const me = newMethod({
  appId: 'fullstory',
  methodId: 'me',
  input: z.undefined(),
  output: z.object({
    email: z.string().optional(),
    orgId: z.string().optional(),
    embedPartnerId: z.string().optional(),
    role: z
      .enum([
        'UNKNOWN',
        'ADMIN',
        'USER',
        'VIEW_ONLY',
        'UMBRELLA_MANAGER',
        'ARCHITECT',
      ])
      .default('UNKNOWN')
      .optional(),
  }),
});

export default newApp({
  appId: 'fullstory',
  context: z
    .object({
      apiKey: z.string(),
    })
    .partial()
    .optional(),
  methods: {
    createUser,
    getUser,
    listUsers,
    deleteUser,
    updateUser,
    createEvent,
    listSessions,
    me,
  },
});

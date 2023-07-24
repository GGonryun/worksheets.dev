import { newApp, newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import { sessionSchema, userSchema } from './schemas';

const createUser = newMethod({
  appId: 'fullstory',
  methodId: 'createUser',
  label: 'Create User',
  description:
    'Creates a user with the specified details. This request can be made idempotent.',
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
  label: 'Get User',
  description:
    'Get data about users who have been identified in the browser via the FS.identify Browser API function.',
  input: z.object({
    id: z.string().describe('The FullStory-generated id for the user'),
  }),
  output: userSchema,
});

const listUsers = newMethod({
  appId: 'fullstory',
  methodId: 'listUsers',
  label: 'List Users',
  description:
    'Retrieve a list of users matching the supplied filter criteria.',
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
  label: 'Delete User',
  description:
    'Delete a user and all associated data. This operation is irreversible.',
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
  label: 'Update User',
  description: 'Updates a user with the specified details',
  input: userSchema.partial().required({ id: true }),
  output: z.object({
    id: z.string(),
  }),
});

const createEvent = newMethod({
  appId: 'fullstory',
  methodId: 'createEvent',
  label: 'Create Event',
  description:
    'Creates one event with the specified details. This request can be made idempotent.',
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
  label: 'List Sessions',
  description:
    'Retrieve a list of sessions matching the supplied filter criteria.',
  input: z.object({
    userId: z.string().optional(),
    limit: z.number().optional(),
    email: z.string().optional(),
  }),
  output: z.object({
    sessions: z.array(sessionSchema),
  }),
});

export const fullstory = newApp({
  appId: 'fullstory',
  label: 'FullStory',
  description:
    'The FullStory API allows you to capture custom user and event data. This data will enrich your analysis with FullStory by giving you additional dimensions to create segments and data visualizations that are better tailored to your specific business needs.',
  context: z.object({
    apiKey: z.string(),
  }),
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/fullstory.svg',
  methods: {
    createUser,
    getUser,
    listUsers,
    deleteUser,
    updateUser,
    createEvent,
    listSessions,
  },
});

import { newService, newEndpoint } from '@worksheets/services-core';
import { z } from '@worksheets/zod';

const entity = z.object({
  collection: z.string().optional(),
  key: z.string(),
  value: z
    .any()
    .describe(
      'The data you wish to store in the record. It can be any JSON data.'
    ),
});

const create = newEndpoint({
  id: 'create',
  title: 'Create',
  subtitle: 'Create a new record',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/crud/create.svg',
  input: z.object({
    collection: z.string().optional(),
    value: z
      .any()
      .describe(
        'The data you wish to store in the record. It can be any JSON data.'
      ),
    overrides: z.any(),
  }),
  output: z.object({
    key: z.string(),
  }),
  providers: ['jsonbin'],
});

const read = newEndpoint({
  id: 'read',
  title: 'Read',
  subtitle: 'Read a record',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/crud/read.svg',
  input: z.object({ key: z.string(), overrides: z.any() }),
  output: entity,
  providers: ['jsonbin'],
});

const update = newEndpoint({
  id: 'update',
  title: 'Update',
  subtitle: 'Update a record',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/crud/update.svg',
  input: z.object({ key: z.string(), value: z.any(), overrides: z.any() }),
  output: entity,
  providers: ['jsonbin'],
});

const remove = newEndpoint({
  id: 'delete',
  title: 'Delete',
  subtitle: 'Delete a record',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/crud/delete.svg',
  input: z.object({ key: z.string(), overrides: z.any() }),
  output: z.object({
    success: z.boolean(),
    message: z.string().optional(),
  }),
  providers: ['jsonbin'],
});

const list = newEndpoint({
  id: 'list',
  title: 'List',
  subtitle: 'List records',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/crud/list.svg',
  input: z.object({
    collection: z.string().optional(),
    overrides: z.any(),
  }),
  output: z.array(entity),
  providers: ['jsonbin'],
});

export const crud = newService({
  id: 'crud',
  title: 'CRUD',
  subtitle: 'Create, read, update, and delete json entities',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/crud/crud.svg',
  category: 'data',
  providers: ['jsonbin'],
  endpoints: {
    create,
    read,
    update,
    delete: remove,
    list,
  },
});

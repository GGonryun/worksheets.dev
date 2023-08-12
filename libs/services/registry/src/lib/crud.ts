import { newService, newEndpoint } from '@worksheets/services-core';
import { z } from '@worksheets/zod';

const entity = z.object({
  resource: z.string(),
  key: z.string(),
  value: z.string(),
});

const create = newEndpoint({
  id: 'create',
  title: 'Create',
  subtitle: 'Create a new record',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/crud/create.svg',
  input: entity,
  output: entity,
  providers: [],
});

const read = newEndpoint({
  id: 'read',
  title: 'Read',
  subtitle: 'Read a record',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/crud/read.svg',
  input: z.object({
    resource: z.string(),
    key: z.string(),
  }),
  output: entity,
  providers: [],
});

const update = newEndpoint({
  id: 'update',
  title: 'Update',
  subtitle: 'Update a record',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/crud/update.svg',
  input: entity,
  output: entity,
  providers: [],
});

const remove = newEndpoint({
  id: 'delete',
  title: 'Delete',
  subtitle: 'Delete a record',

  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/crud/delete.svg',
  input: entity,
  output: entity,
  providers: [],
});

export const crud = newService({
  id: 'crud',
  title: 'CRUD Database',
  subtitle: 'Create, read, update, and delete json data',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/crud/crud.svg',
  category: 'data',
  providers: [],
  // providers: ['jsonbin'],
  endpoints: {
    create,
    read,
    update,
    delete: remove,
  },
});

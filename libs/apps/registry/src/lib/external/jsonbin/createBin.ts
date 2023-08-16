import { newMethod } from '@worksheets/apps-core';
import { z } from '@worksheets/zod';
import { metadata } from './schemas';

export default newMethod({
  appId: 'jsonbin',
  methodId: 'createBin',
  input: z.object({
    name: z
      .string()
      .optional()
      .describe(
        'Creating a JSON record will generate a Random Id which will be used to take any action like Read, Update and so on. Since the Id is not enough to identify the records, you can use a name to identify the record.'
      ),
    private: z
      .boolean()
      .optional()
      .describe(
        'When creating a JSON record, you can decide if you wish to set the visibility to Private or Public. By default, the record is created as a private record. '
      ),
    collectionId: z
      .string()
      .optional()
      .describe(
        'You can add a record to a specific Collection. This is helpful when you want to group these records in a specific category, and also, you can validate these records against a JSON Schema.'
      ),
    data: z
      .any()
      .describe(
        'The data you wish to store in the record. It can be any JSON data.'
      ),
  }),
  output: z.object({
    data: z.any(),
    metadata,
  }),
});

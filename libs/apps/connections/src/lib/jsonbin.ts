import { z } from '@worksheets/zod';
import {
  ConnectionContextTranslationFunction,
  ConnectionForm,
  ConnectionValidationFunction,
} from './framework';

const instructions = `
1. Sign up for a jsonbin account at https://jsonbin.io/
2. Click on API Keys in the left menu or visit https://jsonbin.io/app/app/api-keys
3. Copy the Master Key into the field below
`;

const security = ``;

const form: ConnectionForm<'jsonbin'> = {
  setupTime: 5,
  instructions,
  security,
  tutorialUrl: 'https://jsonbin.io/api-reference',
  fields: {
    masterKey: {
      type: 'sensitive',
      title: 'Master Key',
      helpUrl: 'https://jsonbin.io/app/app/api-keys',
      schema: z.string(),
    },
  },
};

const translator: ConnectionContextTranslationFunction<'jsonbin'> = (o) => o;

const validator: ConnectionValidationFunction<'jsonbin'> = async (
  connection
) => {
  if (!connection.masterKey) {
    return { errors: { masterKey: 'Master Key is required' } };
  }

  console.error('TODO: implement validator for jsonbin connection');
  return {};
};

export default { form, translator, validator };

import { z } from '@worksheets/zod';
import {
  ConnectionContextTranslationFunction,
  ConnectionForm,
  ConnectionValidationFunction,
} from './framework';

const instructions = `
Finding your OpenAI API Key is easy. Just follow these steps:


1. Go to https://platform.openai.com/account/api-keys
2. Click on "Create new secret key"
3. Copy the key and paste it in the field below.

If you belong to multiple organizations, please make sure you have given the correct organization access to the API key.
`;

const security = `OpenAI uses API keys to authenticate requests. You can find your API key in the OpenAI dashboard. There are no additional scopes or permissions required.`;

const form: ConnectionForm<'openai'> = {
  setupTime: 5,
  instructions,
  security,
  tutorialUrl: 'https://docs.worksheets.dev/tutorial/integrations/openai',
  fields: {
    apiKey: {
      type: 'sensitive',
      title: 'API Key',
      helpUrl:
        'https://docs.worksheets.dev/tutorial/integrations/openai#api-key',
      schema: z.string(),
    },
  },
};

const translator: ConnectionContextTranslationFunction<'openai'> = ({
  apiKey,
}) => {
  console.error('TODO: implement translator for openai connection');
  return {
    apiKey: apiKey as string,
  };
};

const validator: ConnectionValidationFunction<'openai'> = async (
  connection
) => {
  if (connection.apiKey === '') {
    return { errors: { apiKey: 'API Key is required' } };
  }
  console.error('TODO: implement validator for openai connection');
  return {};
};

export default { form, validator, translator };

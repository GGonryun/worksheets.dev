import { z } from '@worksheets/zod';
import {
  ConnectionContextTranslationFunction,
  ConnectionForm,
  ConnectionValidationFunction,
} from './framework';

const instructions = `
1. Create a GIPHY API Key by clicking “Create an App” on the Developer Dashboard (you need to create an account first).
    - Note: All API Keys start as beta keys, which are rate limited (42 reads per hour and 1000 searches/API calls per day.)
2. Create separate keys for each platform (iOS, Android, Web) and section. If you're using a GIPHY integration in different sections of your app, GIPHY requires that each use of our service be delineated by a different key for each section per platform.
`;

const security = `
The Giphy API is a REST API. All requests are made to endpoints require an API key. You must provide your API key in the HTTP Authorization header with every request you make.
`;

const form: ConnectionForm<'giphy'> = {
  setupTime: 5,
  instructions,
  security,
  tutorialUrl: 'https://developers.giphy.com/docs/api/#quick-start-guide',
  fields: {
    apiKey: {
      type: 'sensitive',
      title: 'API Key',
      helpUrl: 'https://developers.giphy.com/docs/api/#quick-start-guide',
      schema: z.string(),
    },
  },
};

const translator: ConnectionContextTranslationFunction<'giphy'> = ({
  apiKey,
}) => {
  console.error('TODO: implement translator for giphy connection');
  return {
    apiKey,
  };
};

const validator: ConnectionValidationFunction<'giphy'> = async (connection) => {
  if (connection.apiKey === '') {
    return { errors: { '': 'API Key is required' } };
  }
  console.error('TODO: implement validator for giphy connection');
  return {};
};

export default { form, validator, translator };

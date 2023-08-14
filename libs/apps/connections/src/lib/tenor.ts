import { z } from '@worksheets/zod';
import {
  ConnectionContextTranslationFunction,
  ConnectionForm,
  ConnectionValidationFunction,
} from './framework';

const instructions = `
Get a free API key for your app in less than 60 seconds. View your key in your developer dashboard

- developer dashboard: https://tenor.com/developer/dashboard
- documentation: https://tenor.com/gifapi/documentation`;

const security = `The Tenor API is a REST API. All requests are made to endpoints beginning:

https://api.tenor.com/v1/

The Tenor API uses HTTP Basic Authentication. Your API key is provided to you in your developer dashboard (read me in instructions). You must provide your API key in the HTTP Authorization header with every request you make.
`;

const form: ConnectionForm<'tenor'> = {
  setupTime: 5,
  instructions,
  security,
  tutorialUrl: 'https://tenor.com/gifapi/documentation#quickstart',
  fields: {
    key: {
      type: 'sensitive',
      title: 'API Key',
      helpUrl: 'https://tenor.com/gifapi/documentation#quickstart',
      schema: z.string(),
    },
  },
};

const translator: ConnectionContextTranslationFunction<'tenor'> = ({
  key,
  clientKey,
}) => {
  console.error('TODO: implement translator for tenor connection');
  return {
    key,
    clientKey,
  };
};

const validator: ConnectionValidationFunction<'tenor'> = async (connection) => {
  if (connection.key === '') {
    return { error: 'API Key is required' };
  }
  console.error('TODO: implement validator for tenor connection');
  return { error: undefined };
};

export default { form, validator, translator };

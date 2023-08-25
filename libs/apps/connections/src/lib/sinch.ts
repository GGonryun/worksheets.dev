import { z } from '@worksheets/zod';
import {
  ConnectionContextTranslationFunction,
  ConnectionForm,
  ConnectionValidationFunction,
} from './framework';

const instructions = `
1. Sign up for a Sinch account at https://www.sinch.com/products/sms-api/
2. Create a virtual number.
3. Create an API key at https://dashboard.sinch.com/sms/api/rest
4. Copy the API key into the field below
`;

const security = `Sinch uses an API key and service plan ID to authorize requests. No other security is required. No scopes or permissions are required.`;

const form: ConnectionForm<'sinch'> = {
  setupTime: 5,
  instructions,
  security,
  tutorialUrl: 'https://developers.sinch.com/docs/sms/getting-started/',
  fields: {
    apiToken: {
      type: 'sensitive',
      title: 'API Token',
      helpUrl: 'https://dashboard.sinch.com/sms/api/rest',
      schema: z.string(),
    },
    servicePlanId: {
      type: 'text',
      title: 'Service Plan ID',
      helpUrl: 'https://dashboard.sinch.com/sms/api/rest',
      schema: z.string(),
    },
    virtualPhoneNumber: {
      type: 'text',
      title: 'Virtual Phone Number',
      helpUrl: 'https://dashboard.sinch.com/sms/api/rest',
      schema: z.string(),
    },
  },
};

const translator: ConnectionContextTranslationFunction<'sinch'> = (o) => o;

const validator: ConnectionValidationFunction<'sinch'> = async (connection) => {
  const errors: Record<string, string> = {};
  if (!connection.apiToken) {
    errors['apiToken'] = 'API Token is required';
  }
  if (!connection.servicePlanId) {
    errors['servicePlanId'] = 'Service Plan ID is required';
  }
  if (!connection.virtualPhoneNumber) {
    errors['virtualPhoneNumber'] = 'Virtual Phone Number is required';
  }

  return { errors };
};

export default { form, translator, validator };

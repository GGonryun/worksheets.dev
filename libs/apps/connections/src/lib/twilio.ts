import { z } from '@worksheets/zod';
import {
  ConnectionContextTranslationFunction,
  ConnectionForm,
  ConnectionValidationFunction,
} from './framework';

const instructions = `
All requests to Twilio's REST API need to be authenticated. Twilio supports two forms of authentication, both using HTTP basic auth, which use the following username/password schemes:

1. Sign up for a Twilio account at https://www.twilio.com/try-twilio
2. Create a phone number at https://www.twilio.com/console/phone-numbers/incoming
3. Copy the Account SID and Auth Token and Phone numbers into the fields below
`;

const security = `The account SID and auth token are the master keys to your account. They can be found on your Account Dashboard in the Twilio Console. We do not recommend storing your credentials in your source code. If you need to share your code, you can use environment variables to keep your credentials out of your source code.`;

const form: ConnectionForm<'twilio'> = {
  setupTime: 5,
  instructions,
  security,
  tutorialUrl: 'https://www.twilio.com/docs/usage/api',
  fields: {
    token: {
      type: 'sensitive',
      title: 'Auth Token',
      helpUrl:
        'https://www.twilio.com/docs/usage/requests-to-twilio#account-sid-and-auth-token',
      schema: z.string(),
    },
    sid: {
      type: 'text',
      title: 'Account SID',
      helpUrl:
        'https://www.twilio.com/docs/usage/requests-to-twilio#account-sid-and-auth-token',
      schema: z.string(),
    },
    phone: {
      type: 'text',
      title: 'Phone Number',
      helpUrl:
        'https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account#get-your-first-twilio-phone-number',
      schema: z.string(),
    },
  },
};

const translator: ConnectionContextTranslationFunction<'twilio'> = (o) => o;

const validator: ConnectionValidationFunction<'twilio'> = async (
  connection
) => {
  if (!connection.token) {
    return { error: { token: 'Auth Token is required' } };
  }
  if (!connection.sid) {
    return { error: { sid: 'Account SID is required' } };
  }
  if (!connection.phone) {
    return { errors: { phone: 'Phone Number is required' } };
  }

  console.error('TODO: implement validator endpoint for twilio connection');
  return {};
};

export default { form, translator, validator };

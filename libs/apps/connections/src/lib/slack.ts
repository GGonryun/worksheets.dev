import { z } from '@worksheets/zod';
import {
  ConnectionContextTranslationFunction,
  ConnectionForm,
  ConnectionValidationFunction,
} from './framework';

const instructions = `
Create a new bot token by following these steps:

1. Navigate to https://api.slack.com/apps.
2. On the top right click on 'your apps' and select 'create new app' or an existing one.
3. On the left sidebar, click on 'OAuth & Permissions'.
4. Scroll down to 'Scopes' and add the following scopes: \`chat:write\` and \`channels:read\`.
5. Scroll up and click on 'Install to Workspace' and authorize the app.
6. Copy the 'Bot User OAuth Token' and paste it in the field below.

Your bot will need to be a member of the channels you want to send messages to.
`;

const security = `
Slack Bot Tokens require permissions to write to channels and reading their messages.

1. sendChatMessage requires the following scopes: \`chat:write\`
2. listConversations requires the following scopes: \`channels:read\`
`;

const form: ConnectionForm<'slack'> = {
  setupTime: 5,
  instructions,
  security,
  tutorialUrl: 'https://docs.worksheets.dev/tutorial/integrations/slack',
  fields: {
    botToken: {
      type: 'sensitive',
      title: 'Bot Token',
      helpUrl:
        'https://docs.worksheets.dev/tutorial/integrations/slack#api-key',
      schema: z.string(),
    },
  },
};

const translator: ConnectionContextTranslationFunction<'slack'> = ({
  botToken,
}) => {
  console.error('TODO: implement translator for slack connection');
  return {
    botToken: botToken as string,
  };
};

const validator: ConnectionValidationFunction<'slack'> = async (connection) => {
  if (connection.botToken === '') {
    return { errors: { botToken: 'Bot Token is required' } };
  }
  console.error('TODO: implement validator for slack connection');
  return {};
};

export default { form, translator, validator };

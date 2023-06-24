import { newMethod } from '@worksheets/apps/framework';
import { settings, getCurrentUserEmail } from './common';
import { newGmailClient } from './common';
import { z } from 'zod';

export const getUserEmail = newMethod({
  id: 'user.get_email',
  label: 'Get User Email',
  description:
    'Returns the email associated with the current connection to gmail',
  settings,
  input: null,
  output: z.string(),
  async call(ctx) {
    const { accessToken } = ctx.settings.tokens;
    const client = newGmailClient(accessToken);
    return await getCurrentUserEmail(client);
  },
});

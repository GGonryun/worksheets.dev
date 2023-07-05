import { MethodCallFailure, newMethod } from '@worksheets/apps/framework';
import { settings, getCurrentUserEmail } from './common';
import { newGmailClient } from './common';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

export const getUserEmail = newMethod({
  id: 'get_user_email',
  label: 'Get User Email',
  description:
    'Returns the email associated with the current connection to gmail',
  settings,
  input: null,
  output: z.string(),
  async call(ctx) {
    const { accessToken } = ctx.settings.tokens;
    const client = newGmailClient(accessToken);
    try {
      return await getCurrentUserEmail(client);
    } catch (error) {
      throw new MethodCallFailure({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Failed to get user email',
      });
    }
  },
});

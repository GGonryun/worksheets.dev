import { TRPCError } from '@trpc/server';
import { ApplicationExecutors } from '../framework';
import { OAuth2Client } from 'google-auth-library';
import { gmail_v1, google } from 'googleapis';
import MailComposer from 'nodemailer/lib/mail-composer';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export const gmail: ApplicationExecutors<'gmail'> = {
  async sendEmail({ context, input }) {
    const { accessToken } = context;
    const { to, subject, body } = input;
    const client = newGmailClient(accessToken);
    const sender = await getCurrentUserEmail(client);
    const email = await formatEmail(sender, to, subject, body);

    let result;
    try {
      result = await client.users.messages.send({
        userId: 'me',
        requestBody: { raw: email },
      });
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'unexpected failure sending email',
        cause: error,
      });
    }
    return {
      to,
      id: result?.data?.id ?? '',
      sentAt: Date.now(),
    };
  },
  async getUserEmail({ context }) {
    const { accessToken } = context;
    const client = newGmailClient(accessToken);
    try {
      return await getCurrentUserEmail(client);
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'unexpected failure getting user email',
      });
    }
  },
};

export function newGmailClient(accessToken: string) {
  if (!accessToken) {
    throw new Error('invalid accessToken');
  }
  const client = new OAuth2Client();
  client.setCredentials({ access_token: accessToken });
  return google.gmail({ version: 'v1', auth: client });
}

export async function getCurrentUserEmail(client: gmail_v1.Gmail) {
  const profile = await client.users.getProfile({ userId: 'me' });
  if (!profile.data.emailAddress) {
    throw new Error('could not find email on profile');
  }
  return profile.data.emailAddress;
}

async function formatEmail(
  replyTo: string,
  to: string,
  subject: string,
  body: string
) {
  const message = new MailComposer({
    to,
    replyTo,
    subject,
    text: `${body}`,
    html: `<p>🙋🏻‍♀️ &mdash; This is gmail was sent by a <b>worksheet</b> from <a href='${SERVER_SETTINGS.WEBSITES.MARKETING_URL()}'>worksheets.dev</a><br/>${body}</p>`,
  });
  const email = await message.compile().build();
  const raw = urlSafeEncoding(email);
  return raw;
}

function urlSafeEncoding(message: Buffer) {
  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

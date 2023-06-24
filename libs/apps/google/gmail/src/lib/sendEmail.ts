import { MethodCallFailure, newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';
import { getCurrentUserEmail, newGmailClient, settings } from './common';
import MailComposer from 'nodemailer/lib/mail-composer';

export const sendEmail = newMethod({
  id: 'send.email',
  label: 'Send Email',
  description:
    'Discover how Gmail keeps your account & emails encrypted, private and under your control with the largest secure email service in the world.',
  input: z.object({
    to: z.string().email(),
    subject: z.string(),
    body: z.string(),
  }),
  output: z.object({
    to: z.string().email(),
    id: z.string(),
    sentAt: z.number(),
  }),
  settings,
  async call({ input, settings }) {
    const { accessToken } = settings.tokens;
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
      throw new MethodCallFailure({
        code: 500,
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
});

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
    html: `<p>🙋🏻‍♀️ &mdash; This is gmail was sent by a <b>worksheet</b> from <a href="https://worksheets.dev">worksheets.dev</a><br/>${body}</p>`,
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

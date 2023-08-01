import { ApplicationExecutors } from '../framework';

// eslint-disable-next-line @nx/enforce-module-boundaries
import * as sgMail from '@sendgrid/mail';

export const sendGrid: ApplicationExecutors<'sendGrid'> = {
  async sendEmail({ context, input }) {
    sgMail.setApiKey(context.apiKey);

    const [result] = await sgMail.send({
      to: input.to,
      from: input.from,
      subject: input.subject,
      text: input.text,
      html: input.html,
    });

    return {
      id: result.headers['x-message-id'] ?? '',
    };
  },
};

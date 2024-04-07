import { SendEmailInput } from '@worksheets/services/email';

import { CONFIRM_NEWSLETTER_SUBSCRIPTION_URL } from './urls';

export class EmailTemplates {
  static confirmNewsletterSubscription(opts: {
    id: string;
    email: string;
  }): SendEmailInput {
    return {
      id: crypto.randomUUID(),
      subject: 'Confirm your newsletter subscription',
      html: `Welcome to the Charity Games Newsletter! We're excited to have you on board.
      <br/><br/><a href="${CONFIRM_NEWSLETTER_SUBSCRIPTION_URL(
        opts.id
      )}">Click here to confirm your subscription.</a><br/><br/>If you did not sign up for our newsletter, disregard this email.`,
      to: [opts.email],
    };
  }
}

import { EmailService, SendEmailInput } from '@worksheets/services/email';

import { CONFIRM_NEWSLETTER_SUBSCRIPTION_URL } from './urls';

export class EmailTemplates {
  static confirmNewsletterSubscription(opts: {
    id: string;
    email: string;
  }): SendEmailInput {
    return {
      id: crypto.randomUUID(),
      subject: 'Confirm your Charity Games newsletter subscription',
      html: EmailService.template({
        title: 'Welcome to the Charity Games Newsletter!',
        paragraphs: [
          `We're excited to have you on board.`,
          `Click the link below to confirm your subscription.`,
          `{{CONFIRM_NEWSLETTER_SUBSCRIPTION}}`,
          `If you did not sign up for our newsletter, disregard this email.`,
        ],
        links: [
          {
            id: 'CONFIRM_NEWSLETTER_SUBSCRIPTION',
            href: CONFIRM_NEWSLETTER_SUBSCRIPTION_URL(opts.id),
            text: 'Confirm Subscription',
          },
        ],
      }),
      to: [opts.email],
    };
  }
}

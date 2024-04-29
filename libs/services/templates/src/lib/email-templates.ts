import { EmailService, SendEmailInput } from '@worksheets/services/email';
import { randomUUID } from '@worksheets/util/crypto';
import {
  daysFromNow,
  printDateTime,
  printTimeRemaining,
} from '@worksheets/util/time';
import { compact } from 'lodash';

import { ExtractTemplatePayload } from './types';
import {
  ACCOUNT_INVENTORY_URL,
  CLAIM_URL,
  CONFIRM_NEWSLETTER_SUBSCRIPTION_URL,
  CONTACT_URL,
} from './urls';

const claimHelpText = `Please visit {{CLAIM_PRIZE}} to claim your prize. If you are unable to claim a prize, please {{CONTACT_US}} for assistance. You may receive an alternative prize or tokens equal to the prize value. If you need help, please visit our {{HELP_CENTER}}.`;

const expirationText = (expiration: Date) =>
  `<b>If you do not claim your prize before ${printDateTime(
    expiration
  )} (${printTimeRemaining(expiration)} from now), it will be forfeited.</b>`;

const claimHelpLinks = [
  {
    id: 'CLAIM_PRIZE',
    href: ACCOUNT_INVENTORY_URL,
    text: 'Charity Games',
  },
  {
    id: 'CONTACT_US',
    href: CONTACT_URL,
    text: 'contact us',
  },
  {
    id: 'HELP_CENTER',
    href: CLAIM_URL,
    text: 'Help Center',
  },
];

export class EmailTemplates {
  static wonRaffle(opts: ExtractTemplatePayload<'won-raffle'>): SendEmailInput {
    return {
      id: randomUUID(),
      to: [opts.user.email],
      subject: `You won a raffle for ${opts.item.name}`,
      html: EmailService.template({
        title: `Congratulations! You won a raffle for a ${opts.item.name}`,
        paragraphs: compact([
          `You won a raffle for {{ITEM_LINK}}.`,
          claimHelpText,
          opts.item.expiration &&
            expirationText(daysFromNow(opts.item.expiration)),
        ]),
        links: [
          ...claimHelpLinks,
          {
            id: 'ITEM_LINK',
            href: ACCOUNT_INVENTORY_URL,
            text: opts.item.name,
          },
        ],
      }),
    };
  }
  static expiringItemReminder(
    opts: ExtractTemplatePayload<'expiring-item-reminder'>
  ): SendEmailInput {
    return {
      id: randomUUID(),
      to: [opts.user.email],
      subject: `An item in your inventory is expiring soon!`,
      html: EmailService.template({
        title: `Don't forget to use your ${opts.item.name} item!`,
        paragraphs: [
          `You won a raffle for ${opts.item.name}.`,
          claimHelpText,
          expirationText(opts.expiresAt),
        ],
        links: [...claimHelpLinks],
      }),
    };
  }
  static activationCodeRedeemed(
    opts: ExtractTemplatePayload<'activation-code-redeemed'>
  ): SendEmailInput {
    return {
      id: randomUUID(),
      to: [opts.user.email],
      subject: `Your activation code for ${opts.item.name}`,
      html: EmailService.template({
        title: `Your activation code for ${opts.item.name} has been redeemed`,
        paragraphs: [
          `Congratulations! You received an activation code.`,
          `Your code is: ${opts.code.content}`,
          `You can view your code any time in your {{INVENTORY}}.`,
        ],
        links: [
          {
            id: 'INVENTORY',
            href: ACCOUNT_INVENTORY_URL,
            text: 'inventory',
          },
        ],
      }),
    };
  }
  static confirmNewsletterSubscription(opts: {
    id: string;
    email: string;
  }): SendEmailInput {
    return {
      id: randomUUID(),
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

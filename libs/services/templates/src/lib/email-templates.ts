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
  CONTACT_URL,
  GAMES_URL,
  HELP_CENTER_URL,
  RAFFLES_URL,
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
    href: HELP_CENTER_URL,
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
  static welcomeUser(
    opts: ExtractTemplatePayload<'welcome-user'>
  ): SendEmailInput {
    return {
      id: randomUUID(),
      to: [opts.user.email],
      subject: `Welcome to Charity Games!`,
      html: EmailService.template({
        title: `Welcome to Charity Games!`,
        paragraphs: [
          `Thank you for joining Charity Games! Our mission is to help you win prizes while supporting great causes. Here's how you can get started:`,
          `1. {{GAMES_LINK}}`,
          `2. {{RAFFLES_LINK}}`,
          `Good luck and have fun!`,
        ],
        links: [
          {
            id: 'GAMES_LINK',
            href: GAMES_URL,
            text: 'Play games',
          },
          {
            id: 'RAFFLES_LINK',
            href: RAFFLES_URL,
            text: 'Participate in raffles',
          },
        ],
      }),
    };
  }
}

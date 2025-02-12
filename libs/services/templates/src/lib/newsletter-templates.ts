import { ScheduleNewsletterInput } from '@worksheets/services/newsletter';
import { removeBreaks } from '@worksheets/util/html';
import {
  daysFromNow,
  hoursFromNow,
  printShortDate,
} from '@worksheets/util/time';
import { EmailPriority } from '@worksheets/util/types';
import { compact } from 'lodash';
import pluralize from 'pluralize';

import { ExtractTemplatePayload } from './types';
import {
  ACCOUNT_ADD_FRIENDS_URL,
  DEVELOPER_URL,
  GAME_URL,
  GAMES_URL,
  RAFFLE_URL,
  RAFFLES_URL,
} from './urls';

export class NewsletterTemplates {
  static newGame(
    opts: ExtractTemplatePayload<'new-game'>
  ): ScheduleNewsletterInput[] {
    return [
      {
        topic: 'NewGame',
        priority: EmailPriority.Normal,
        sendAt: daysFromNow(1),
        subject: `New Game Alert! Play ${opts.title} now!`,
        template: {
          title: `There's a new game on Charity Games!`,
          paragraphs: [
            `Try out our newest game {{PLAY_LINK}} by {{DEVELOPER_LINK}}.`,
            removeBreaks(opts.description),
          ],
          links: [
            {
              id: 'DEVELOPER_LINK',
              href: DEVELOPER_URL(opts.developer.id),
              text: opts.developer.name,
            },
            {
              id: 'PLAY_LINK',
              href: GAME_URL(opts.id),
              text: opts.title,
            },
          ],
        },
      },
    ];
  }
  static newRaffle(
    opts: ExtractTemplatePayload<'new-raffle'>
  ): ScheduleNewsletterInput[] {
    return compact([
      opts.premium && {
        topic: 'NewRaffle',
        priority: EmailPriority.Normal,
        sendAt: hoursFromNow(1),
        subject: `New Raffle Alert! ${opts.name} giveaway!`,
        template: {
          title: `There's a new raffle on Charity Games!`,
          paragraphs: [
            `Enter to win our latest giveaway for a {{RAFFLE_LINK}}!`,
            `${opts.numWinners} lucky ${pluralize(
              'winner',
              opts.numWinners
            )} will be chosen on ${printShortDate(opts.expiresAt)}.`,
          ],
          links: [
            {
              id: 'RAFFLE_LINK',
              href: RAFFLE_URL(opts.id),
              text: opts.name,
            },
          ],
        },
      },
    ]);
  }
  static welcomeUser(
    opts: ExtractTemplatePayload<'welcome-user'>
  ): ScheduleNewsletterInput[] {
    return [
      {
        emails: [opts.user.email],
        topic: 'TipsAndTricks',
        priority: EmailPriority.Significant,
        sendAt: daysFromNow(1),
        subject: `Welcome to Charity Games!`,
        template: {
          title: `Welcome to Charity Games!`,
          paragraphs: [
            `Thank you for joining Charity Games! Our mission is to help you win prizes while supporting great causes. Here's how you can get started:`,
            `1. {{GAMES_LINK}} to earn tokens.`,
            `2. Use tokens to {{RAFFLES_LINK}} and win prizes.`,
            `3. {{ADD_FRIENDS_LINK}} to earn more tokens.`,
            `Good luck and have fun!`,
          ],
          links: [
            {
              id: 'GAMES_LINK',
              href: GAMES_URL,
              text: 'Play games',
            },
            {
              id: 'ADD_FRIENDS_LINK',
              href: ACCOUNT_ADD_FRIENDS_URL,
              text: 'Add friends',
            },
            {
              id: 'RAFFLES_LINK',
              href: RAFFLES_URL,
              text: 'enter raffles',
            },
          ],
        },
      },
    ];
  }
}

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
  ACCOUNT_COMMUNICATIONS_URL,
  ACCOUNT_QUESTS_URL,
  ACCOUNT_REFERRED_ACCOUNTS_URL,
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
        subject: `(1/3) Welcome to Charity Games!`,
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
      {
        emails: [opts.user.email],
        topic: 'TipsAndTricks',
        priority: EmailPriority.Minor,
        sendAt: daysFromNow(7),
        subject: `(2/3) The fastest ways to earn tokens on Charity Games!`,
        template: {
          title: `The best ways to earn tokens on Charity Games!`,
          paragraphs: [
            `Here are some tips to help you earn more tokens on Charity Games:`,
            `1. {{GAMES_LINK}} frequently to earn tokens.`,
            `2. {{QUESTS_LINK}} as often as possible.`,
            `3. {{ADD_FRIENDS_LINK}} and earn tokens when you play together.`,
            `4. {{REFERRALS_LINK}} and earn tokens when your friends join.`,
            `5. {{NEWSLETTER_LINK}} for alerts on new games and events.`,
            `Good luck and have fun!`,
          ],
          links: [
            {
              id: 'GAMES_LINK',
              href: GAMES_URL,
              text: 'Play games',
            },
            {
              id: 'QUESTS_LINK',
              href: ACCOUNT_QUESTS_URL,
              text: 'Complete quests',
            },
            {
              id: 'ADD_FRIENDS_LINK',
              href: ACCOUNT_ADD_FRIENDS_URL,
              text: 'Add friends',
            },
            {
              id: 'REFERRALS_LINK',
              href: ACCOUNT_REFERRED_ACCOUNTS_URL,
              text: 'Refer friends',
            },
            {
              id: 'NEWSLETTER_LINK',
              href: ACCOUNT_COMMUNICATIONS_URL,
              text: 'Subscribe to our newsletter',
            },
          ],
        },
      },
      {
        emails: [opts.user.email],
        topic: 'TipsAndTricks',
        priority: EmailPriority.Moderate,
        sendAt: daysFromNow(15),
        subject: `(3/3) Win free prizes with Charity Games!`,
        template: {
          title: `Win prizes with Charity Games!`,
          paragraphs: [
            `{{RAFFLES_LINK}}`,
            `Here are some tips to help you win prizes on Charity Games:`,
            `1. Look for raffles with low entries for better odds.`,
            `2. Participate in raffles with multiple winners for more chances to win.`,
            `3. Find raffles with an entry limit to even the playing field.`,
            `4. {{ACCOUNT_NEWSLETTER_SUBSCRIBE_LINK}} for alerts on new raffles.`,
            `5. {{QUESTS_LINK}} to earn more tokens for more raffle entries.`,
            `Good luck and have fun!`,
          ],
          links: [
            {
              id: 'QUESTS_LINK',
              href: ACCOUNT_QUESTS_URL,
              text: 'Complete quests',
            },
            {
              id: 'RAFFLES_LINK',
              href: RAFFLES_URL,
              text: 'Want free prizes? Enter raffles!',
            },
            {
              id: 'ACCOUNT_NEWSLETTER_SUBSCRIBE_LINK',
              href: ACCOUNT_COMMUNICATIONS_URL,
              text: 'Subscribe to our newsletter',
            },
          ],
        },
      },
    ];
  }
}

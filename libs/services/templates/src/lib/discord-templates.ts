import { routes } from '@worksheets/routes';
import { DiscordMessageInput } from '@worksheets/services/discord';
import { printShortDate, printShortDateTime } from '@worksheets/util/time';
import pluralize from 'pluralize';

import { ExtractTemplatePayload } from './types';
import { RAFFLE_URL } from './urls';

export class DiscordTemplates {
  static newGame(
    opts: ExtractTemplatePayload<'new-game'>
  ): DiscordMessageInput {
    return {
      content: `🚨 New Game Alert!`,
      embeds: [
        {
          title: `📷 Play ${opts.title} by ${opts.developer.name}!`,
          url: routes.game.path({ params: { gameId: opts.id } }),
          description: opts.description,
        },
      ],
      channel: 'public',
    };
  }
  static newRaffle(
    opts: ExtractTemplatePayload<'new-raffle'>
  ): DiscordMessageInput {
    return {
      content: `💵🎊 GIVEAWAY 🎊💵`,
      embeds: [
        {
          title: `🎁 Enter to win a ${opts.prize.name}!`,
          description: `🏆 ${opts.numWinners} lucky ${pluralize(
            'winner',
            opts.numWinners
          )} will be chosen on ${printShortDate(opts.expiresAt)}.`,
          url: routes.raffle.path({ params: { raffleId: opts.id } }),
        },
      ],
      channel: 'public',
    };
  }
  static unclaimedPrize(
    opts: ExtractTemplatePayload<'unclaimed-prize'>
  ): DiscordMessageInput {
    return {
      content: `A user did not claimed their prize in time.`,
      embeds: [
        {
          title: `User ID: ${opts.user.id}`,
          description: `The user (${
            opts.user.email
          }) did not successfully claim their prize. The last alert was sent at ${
            opts.lastSentAt ? printShortDateTime(opts.lastSentAt) : 'N/A'
          }.`,
        },
      ],
      channel: 'admin',
    };
  }
  static raffleExpired(
    opts: ExtractTemplatePayload<'raffle-expired'>
  ): DiscordMessageInput {
    return {
      content: `A raffle for prize ${opts.prize.name} has expired and ${
        opts.numWinners
      } ${pluralize('winners', opts.numWinners)} have been chosen.`,
      embeds: [
        {
          title: `Raffle ID: ${opts.id}`,
          url: RAFFLE_URL(opts.id),
          description: `This raffle had ${opts.participants.length} ${pluralize(
            'participant',
            opts.participants.length
          )} and expired at ${printShortDateTime(opts.expiresAt)}.`,
        },
      ],
      channel: 'public',
    };
  }
  static newUser(
    opts: ExtractTemplatePayload<'new-user'>
  ): DiscordMessageInput {
    return {
      content: `A new user has signed up: ${opts.user.email}`,
      channel: 'admin',
    };
  }
  static newGameSubmission(
    opts: ExtractTemplatePayload<'new-game-submission'>
  ): DiscordMessageInput {
    return {
      content: `A game submission has been created by ${opts.user.id}.`,
      embeds: [
        {
          title: opts.submission.title ?? 'Untitled',
        },
      ],
      channel: 'admin',
    };
  }
}

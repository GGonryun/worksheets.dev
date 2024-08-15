import { DiscordMessageInput } from '@worksheets/api/discord';
import { routes } from '@worksheets/routes';
import { printShortDate, printShortDateTime } from '@worksheets/util/time';
import pluralize from 'pluralize';

import { ExtractTemplatePayload } from './types';
import { RAFFLE_URL } from './urls';

export class DiscordTemplates {
  static prizePurchased(
    opts: ExtractTemplatePayload<'prize-purchased'>
  ): DiscordMessageInput {
    return {
      content: `A user has purchased a prize: ${opts.prizeId}`,
      embeds: [
        {
          title: `User ID: ${opts.userId}`,
          description: `The user
            (${opts.userId}) has purchased the prize ${opts.name} for ${opts.cost} tokens.`,
        },
      ],
      channel: 'admin',
    };
  }
  static userReport(
    opts: ExtractTemplatePayload<'user-report'>
  ): DiscordMessageInput {
    return {
      content: `A user has been reported: ${opts.againstId}`,
      embeds: [
        {
          title: opts.senderId
            ? `Sent by: ${opts.senderId}`
            : 'Anonymous report received',
          description: opts.text,
        },
      ],
      channel: 'admin',
    };
  }
  static gameReport(
    opts: ExtractTemplatePayload<'game-report'>
  ): DiscordMessageInput {
    return {
      content: `A user has reported a game: ${opts.gameId}`,
      embeds: [
        {
          title: `Reason: ${opts.reason}`,
          description: opts.text,
        },
      ],
      channel: 'admin',
    };
  }
  static newGame(
    opts: ExtractTemplatePayload<'new-game'>
  ): DiscordMessageInput {
    return {
      content: `🚨 New Game Alert!`,
      embeds: [
        {
          title: `Play ${opts.title} by ${opts.developer.name}!`,
          url: routes.game.url({ params: { gameId: opts.id } }),
        },
      ],
      channel: 'notification',
    };
  }
  static newRaffle(
    opts: ExtractTemplatePayload<'new-raffle'>
  ): DiscordMessageInput {
    return {
      content: `💵🎊 NEW GIVEAWAY 🎊💵\n`,
      embeds: [
        {
          title: `🎁 ${opts.name} giveaway!`,
          description: `🏆 ${opts.numWinners} lucky ${pluralize(
            'winner',
            opts.numWinners
          )} will be chosen on ${printShortDate(opts.expiresAt)}.`,
          url: routes.raffle.url({ params: { raffleId: opts.id } }),
        },
      ],
      channel: 'notification',
    };
  }
  static expiredItem(
    opts: ExtractTemplatePayload<'expired-item'>
  ): DiscordMessageInput {
    return {
      content: `A user's item expired.`,
      embeds: [
        {
          title: `User ID: ${opts.user.id}`,
          description: `The user (${opts.user.email}) did not access their item (${opts.item.name}) in time. The item has expired.`,
        },
      ],
      channel: 'admin',
    };
  }

  static raffleExpired(
    opts: ExtractTemplatePayload<'raffle-expired'>
  ): DiscordMessageInput {
    return {
      content: `${opts.name} giveaway has expired and ${
        opts.numWinners
      } ${pluralize('winners', opts.numWinners)} ${
        opts.numWinners > 1 ? 'have' : 'has'
      } been chosen.`,
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
      channel: 'notification',
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
  static newSubscriber(
    opts: ExtractTemplatePayload<'new-subscriber'>
  ): DiscordMessageInput {
    return {
      content: `A new subscriber has signed up: ${opts.email}`,
      channel: 'admin',
    };
  }
}

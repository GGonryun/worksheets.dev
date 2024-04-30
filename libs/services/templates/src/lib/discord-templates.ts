import { routes } from '@worksheets/routes';
import { DiscordMessageInput } from '@worksheets/services/discord';
import { printShortDate, printShortDateTime } from '@worksheets/util/time';
import pluralize from 'pluralize';

import { ExtractTemplatePayload } from './types';
import { BATTLE_URL, RAFFLE_URL } from './urls';

export class DiscordTemplates {
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
      channel: 'public',
    };
  }
  static newRaffle(
    opts: ExtractTemplatePayload<'new-raffle'>
  ): DiscordMessageInput {
    return {
      content: `💵🎊 GIVEAWAY 🎊💵\n`,
      embeds: [
        {
          title: `🎁 Enter to win a ${opts.item.name}!`,
          description: `🏆 ${opts.numWinners} lucky ${pluralize(
            'winner',
            opts.numWinners
          )} will be chosen on ${printShortDate(opts.expiresAt)}.`,
          url: routes.raffle.url({ params: { raffleId: opts.id } }),
        },
      ],
      channel: 'public',
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
  static newBattle(
    opts: ExtractTemplatePayload<'new-battle'>
  ): DiscordMessageInput {
    return {
      content: `A new battle has started!`,
      embeds: [
        {
          title: `Fight the ${opts.mobName} for a chance to win ${opts.loot} items!`,
          url: BATTLE_URL(opts.battleId),
        },
      ],
      channel: 'public',
    };
  }
  static battleCompleted(
    opts: ExtractTemplatePayload<'battle-completed'>
  ): DiscordMessageInput {
    return {
      content: `A battle has expired.`,
      embeds: [
        {
          title: `Battle ID: ${opts.mob.battleId}`,
          description: `The battle against ${opts.mob.name} has ended. The boss battle MVP is ${opts.mvp}. Items have been distributed to participants.`,
          url: BATTLE_URL(opts.mob.battleId),
        },
      ],
      channel: 'public',
    };
  }
  static raffleExpired(
    opts: ExtractTemplatePayload<'raffle-expired'>
  ): DiscordMessageInput {
    return {
      content: `A raffle for prize ${opts.item.name} has expired and ${
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
  static newSubscriber(
    opts: ExtractTemplatePayload<'new-subscriber'>
  ): DiscordMessageInput {
    return {
      content: `A new subscriber has signed up: ${opts.email}`,
      channel: 'admin',
    };
  }
}

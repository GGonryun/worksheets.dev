import { PushNotifyInput } from '@worksheets/services/push';
import {
  EXPIRATION_TIME_THRESHOLD,
  STARTING_GIFT_BOXES,
  STARTING_TOKENS,
  TOKENS_PER_REFERRAL_ACCOUNT,
} from '@worksheets/util/settings';
import { printShortDate } from '@worksheets/util/time';
import pluralize from 'pluralize';

import { ExtractTemplatePayload } from './types';
import {
  ACCOUNT_FRIENDS_LIST_URL,
  ACCOUNT_INVENTORY_URL,
  ACCOUNT_QUESTS_URL,
  ACCOUNT_REFERRED_ACCOUNTS_URL,
  BATTLE_URL,
  DEVELOPER_URL,
  GAME_URL,
  GAMES_URL,
  RAFFLE_URL,
  RAFFLES_URL,
} from './urls';

export class PushTemplates {
  static newGame(opts: ExtractTemplatePayload<'new-game'>): PushNotifyInput {
    return {
      type: 'GAME',
      text: `New game alert! Play <a href="${GAME_URL(opts.id)}">${
        opts.title
      }</a> by <a href="${DEVELOPER_URL(opts.developer.id)}">${
        opts.developer.name
      }</a>!`,
    };
  }

  static newRaffle(
    opts: ExtractTemplatePayload<'new-raffle'>
  ): PushNotifyInput {
    return {
      type: 'RAFFLE',
      text: `New Raffle Alert! Win a <a href="${RAFFLE_URL(opts.id)}">${
        opts.item.name
      }</a>. ${opts.numWinners} lucky ${pluralize(
        'winner',
        opts.numWinners
      )} will be chosen on ${printShortDate(opts.expiresAt)}!`,
    };
  }

  static newBattle(
    opts: ExtractTemplatePayload<'new-battle'>
  ): PushNotifyInput {
    return {
      type: 'BATTLE',
      text: `A new battle has started! <a href="${BATTLE_URL(
        opts.battleId
      )}">Fight the ${opts.mobName}</a> for a chance to win ${
        opts.loot
      } items!`,
    };
  }

  static lostRaffle(
    opts: ExtractTemplatePayload<'raffle-expired'>
  ): PushNotifyInput {
    return {
      type: 'RAFFLE',
      text: `A raffle for a <a href="${RAFFLE_URL(opts.id)}">${
        opts.item.name
      }</a> has ended! <a href="${RAFFLE_URL(opts.id)}">View results</a>.`,
      userIds: opts.participants.map((p) => p.user.id),
    };
  }

  static wonRaffle(
    opts: ExtractTemplatePayload<'won-raffle'>
  ): PushNotifyInput {
    return {
      type: 'RAFFLE',
      text: `You won a ${opts.item.name} in a raffle! <a href="${ACCOUNT_INVENTORY_URL}">See your inventory</a>.`,
      userIds: [opts.user.id],
    };
  }

  static expiringItemReminder(
    opts: ExtractTemplatePayload<'expiring-item-reminder'>
  ): PushNotifyInput {
    return {
      type: 'INVENTORY',
      text: `A ${opts.item.name} item is expiring in ${EXPIRATION_TIME_THRESHOLD} days! <a href="${ACCOUNT_INVENTORY_URL}">Go to your account inventory</a>.`,
      userIds: [opts.user.id],
    };
  }

  static welcomeUser(
    opts: ExtractTemplatePayload<'welcome-user'>
  ): PushNotifyInput {
    return {
      type: 'SYSTEM',
      text: `Welcome to Charity Games! We've added <a href="${ACCOUNT_INVENTORY_URL}">${STARTING_TOKENS} tokens</a> and <a href="${ACCOUNT_INVENTORY_URL}">${STARTING_GIFT_BOXES} gift boxes</a> to your account. Spend your tokens on <a href="${RAFFLES_URL}">raffles</a> or <a href="${GAMES_URL}">play games</a> to win more!`,
      userIds: [opts.user.id],
    };
  }

  static newReferral(
    opts: ExtractTemplatePayload<'new-referral'>
  ): PushNotifyInput {
    return {
      type: 'FRIEND',
      text: `Someone has used your <a href="${ACCOUNT_REFERRED_ACCOUNTS_URL}">referral code to sign up</a>. You have received <a href="${ACCOUNT_INVENTORY_URL}">${TOKENS_PER_REFERRAL_ACCOUNT} extra tokens</a>.`,
      userIds: [opts.user.id],
    };
  }

  static newFollower(
    opts: ExtractTemplatePayload<'new-follower'>
  ): PushNotifyInput {
    return {
      userIds: [opts.user.id],
      type: 'SYSTEM',
      text: `<b>${opts.follower.username}</b> has started <a href="${ACCOUNT_FRIENDS_LIST_URL}">following you</a>!`,
    };
  }

  static questCompleted(
    opts: ExtractTemplatePayload<'quest-completed'>
  ): PushNotifyInput {
    return {
      userIds: [opts.userId],
      type: 'QUEST',
      text: `You have completed the quest <b>${
        opts.quest.name
      }</b> and received ${opts.quest.loot
        .map((l) => `${l.quantity}x ${pluralize(l.item.name, l.quantity)}`)
        .join(', ')}! <a href="${ACCOUNT_QUESTS_URL}">Find more quests</a>.`,
    };
  }

  static battleCompleted(
    opts: ExtractTemplatePayload<'battle-completed'>
  ): PushNotifyInput {
    return {
      userIds: opts.userIds,
      type: 'BATTLE',
      text: `The ${
        opts.mob.name
      } boss has been defeated and loot has been distributed! <a href="${BATTLE_URL(
        opts.mob.battleId
      )}">View results</a>.`,
    };
  }

  static battleLootAwarded(
    opts: ExtractTemplatePayload<'battle-loot-awarded'>
  ): PushNotifyInput {
    return {
      userIds: opts.userIds,
      type: 'BATTLE',
      text: `You have been awarded loot for the battle against the <a href="${BATTLE_URL(
        opts.mob.battleId
      )}">${
        opts.mob.name
      }</a>! <a href="${ACCOUNT_INVENTORY_URL}">View your inventory</a>.`,
    };
  }

  static battleMvpAwarded(
    opts: ExtractTemplatePayload<'battle-mvp-awarded'>
  ): PushNotifyInput {
    return {
      userIds: [opts.userId],
      type: 'BATTLE',
      text: `You have been awarded the MVP for the battle against the <a href="${BATTLE_URL(
        opts.mob.battleId
      )}">${
        opts.mob.name
      }</a>! <a href="${ACCOUNT_INVENTORY_URL}">View your inventory</a>.`,
    };
  }

  static foundItem(
    opts: ExtractTemplatePayload<'found-item'>
  ): PushNotifyInput {
    return {
      userIds: [opts.userId],
      type: 'INVENTORY',
      text: `You found one <a href="${ACCOUNT_INVENTORY_URL}">${
        opts.item.name
      }</a> while playing <a href="${GAME_URL(opts.game.id)}">${
        opts.game.title
      }</a>!`,
    };
  }
}

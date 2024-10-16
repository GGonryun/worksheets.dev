import { routes } from '@worksheets/routes';
import { PushNotifyInput } from '@worksheets/services/push';
import { InventoryPanels } from '@worksheets/util/enums';
import { nth } from '@worksheets/util/numbers';
import {
  STARTING_GIFT_BOXES,
  STARTING_TOKENS,
  TOKENS_PER_REFERRAL_ACCOUNT,
} from '@worksheets/util/settings';
import { grammaticalJoin } from '@worksheets/util/strings';
import { printShortDate, printTimeRemaining } from '@worksheets/util/time';
import { LEADERBOARD_FREQUENCY_LABELS } from '@worksheets/util/types';
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
  ITEM_URL,
  RAFFLE_URL,
  RAFFLES_URL,
} from './urls';

export class PushTemplates {
  static prizePurchased(
    opts: ExtractTemplatePayload<'prize-purchased'>
  ): PushNotifyInput {
    return {
      userIds: [opts.user.id],
      type: 'PRIZE',
      text: `You have unlocked the prize <a href="${opts.url}">${opts.name} ${
        opts.type === 'STEAM' ? 'Steam Key' : ''
      }</a>. Access your prize <a href="${routes.account.inventory.url({
        bookmark: InventoryPanels.ActivationCodes,
      })}">here</a>!`,
    };
  }
  static achievementUnlocked(
    opts: ExtractTemplatePayload<'achievement-unlocked'>
  ): PushNotifyInput {
    return {
      type: 'ACHIEVEMENT',
      text: `You unlocked the <a href="${GAME_URL(opts.achievement.game.id)}">${
        opts.achievement.game.title
      }</a> achievement <b>${
        opts.achievement.name
      }</b> and received ${grammaticalJoin(
        opts.achievement.loot.map(
          (l) => `${l.quantity} ${pluralize(l.item.name, l.quantity)}`
        )
      )}! <a href="${ACCOUNT_INVENTORY_URL}">View your inventory</a>.`,
      userIds: [opts.user.id],
    };
  }

  static wonLeaderboard(
    opts: ExtractTemplatePayload<'won-leaderboard'>
  ): PushNotifyInput {
    return {
      type: 'VICTORY',
      text: `Congratulations! You ranked ${opts.rank}${nth(opts.rank)} with ${
        opts.score
      } ${pluralize('point', opts.score)} in the ${
        LEADERBOARD_FREQUENCY_LABELS[opts.frequency]
      } leaderboard for <a href="${GAME_URL(opts.game.id)}">${
        opts.game.title
      }</a> and received <a href="${ACCOUNT_INVENTORY_URL}">${
        opts.payout
      } ${pluralize('tokens', opts.payout)}</a>!`,
      userIds: [opts.user.id],
    };
  }
  static shareGift(
    opts: ExtractTemplatePayload<'share-gift'>
  ): PushNotifyInput {
    return {
      type: 'FRIEND',
      text: `<a href="${ACCOUNT_FRIENDS_LIST_URL}"><b>${
        opts.from.username
      }</b></a> opened ${opts.quantity} <a href="${ITEM_URL(
        opts.item.id
      )}">${pluralize(opts.item.name, opts.quantity)}</a> and sent you ${
        opts.giving
      } ${pluralize(
        'tokens',
        opts.giving
      )}! <a href="${ACCOUNT_INVENTORY_URL}"><b>View your inventory</b></a>.`,
      userIds: [opts.friendId],
    };
  }

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
      text: `New Raffle Alert! <a href="${RAFFLE_URL(opts.id)}">${
        opts.name
      }</a> giveaway. ${opts.numWinners} lucky ${pluralize(
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
      text: `A new boss battle has started! <a href="${BATTLE_URL(
        opts.battleId
      )}">Fight the ${opts.mobName}</a> for a chance to win ${
        opts.loot
      } items!`,
    };
  }

  static lostRaffle(
    opts: ExtractTemplatePayload<'lost-raffle'>
  ): PushNotifyInput[] {
    return opts.participants.map((p) => ({
      type: 'RAFFLE',
      text: `<a href="${RAFFLE_URL(opts.id)}">Giveaway #${
        opts.id
      }</a> for a <a href="${ITEM_URL(opts.item.id)}">${
        opts.item.name
      }</a> has ended! You have been awarded a consolation prize of ${
        p.numEntries
      } ${pluralize('token', p.numEntries)}.`,
      userIds: [p.user.id],
    }));
  }

  static wonRaffle(
    opts: ExtractTemplatePayload<'won-raffle'>
  ): PushNotifyInput {
    return {
      type: 'RAFFLE',
      text: `Congratulations! You are the winner of <a href="${RAFFLE_URL(
        opts.raffle.id
      )}">giveaway #${opts.raffle.id}</a> for a <a href="${ITEM_URL(
        opts.item.id
      )}">${
        opts.item.name
      }</a>. Visit your <a href="${ACCOUNT_INVENTORY_URL}">your inventory</a>.`,
      userIds: [opts.user.id],
    };
  }

  static expiringItemReminder(
    opts: ExtractTemplatePayload<'expiring-item-reminder'>
  ): PushNotifyInput {
    return {
      type: 'INVENTORY',
      text: `A ${opts.item.name} is expiring in ${printTimeRemaining(
        opts.expiresAt
      )}! <a href="${ACCOUNT_INVENTORY_URL}">Go to your account inventory</a>.`,
      userIds: [opts.user.id],
    };
  }

  static newUser(opts: ExtractTemplatePayload<'new-user'>): PushNotifyInput {
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
        .map((l) => `${l.quantity} ${pluralize(l.item.name, l.quantity)}`)
        .join(', ')}! <a href="${ACCOUNT_QUESTS_URL}">Find more quests</a>.`,
    };
  }

  static battleCompleted(
    opts: ExtractTemplatePayload<'battle-completed'>
  ): PushNotifyInput {
    return {
      userIds: opts.userIds,
      type: 'BATTLE',
      text: `${opts.battle.mob.name} has been defeated! <a href="${BATTLE_URL(
        opts.battle.id
      )}">View results</a>.`,
    };
  }

  static battleMvpAwarded(
    opts: ExtractTemplatePayload<'battle-mvp-awarded'>
  ): PushNotifyInput {
    return {
      userIds: [opts.userId],
      type: 'BATTLE',
      text: `You are the MVP for the battle against the <a href="${BATTLE_URL(
        opts.battle.id
      )}">${
        opts.battle.mob.name
      }</a>! You have been awarded <a href="${ACCOUNT_INVENTORY_URL}">${
        opts.loot.quantity
      }x ${pluralize(opts.loot.item.name, opts.loot.quantity)}</a>.`,
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

import { PushNotifyInput } from '@worksheets/services/push';
import {
  STARTING_GIFT_BOXES,
  STARTING_TOKENS,
} from '@worksheets/util/settings';
import { printShortDate } from '@worksheets/util/time';
import { TOKENS_PER_REFERRAL_ACCOUNT } from '@worksheets/util/types';
import pluralize from 'pluralize';

import { ExtractTemplatePayload } from './types';
import {
  ACCOUNT_FRIENDS_LIST_URL,
  ACCOUNT_GIFT_BOXES_URL,
  ACCOUNT_PRIZES_URL,
  ACCOUNT_QUESTS_URL,
  ACCOUNT_REFERRED_ACCOUNTS_URL,
  DEVELOPER_URL,
  GAME_URL,
  GAMES_URL,
  PRIZE_URL,
  RAFFLE_URL,
  RAFFLES_URL,
} from './urls';

export class PushTemplates {
  static newGame(opts: ExtractTemplatePayload<'new-game'>): PushNotifyInput {
    return {
      type: 'GAME',
      text: `New game alert! Play <a href="${GAME_URL(opts.id)}">${
        opts.title
      }</a> by <a href="${DEVELOPER_URL(opts.developer.id)}>${
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
        opts.prize.name
      }</a>. ${opts.numWinners} lucky ${pluralize(
        'winner',
        opts.numWinners
      )} will be chosen on ${printShortDate(opts.expiresAt)}!`,
    };
  }

  static raffleExpired(
    opts: ExtractTemplatePayload<'raffle-expired'>
  ): PushNotifyInput {
    return {
      type: 'RAFFLE',
      text: `A raffle for a <a href="${RAFFLE_URL(opts.id)}">${
        opts.prize.name
      }</a> has ended! <a href="${RAFFLE_URL(opts.id)}">View results</a>.`,
      userIds: opts.participants.map((p) => p.userId),
    };
  }

  static wonRaffle(
    opts: ExtractTemplatePayload<'won-raffle'>
  ): PushNotifyInput {
    return {
      type: 'RAFFLE',
      text: `You won a raffle! ${prizeMessage(opts)}`,
      userIds: [opts.user.id],
    };
  }

  static wonRaffleReminder(
    opts: ExtractTemplatePayload<'won-raffle'>
  ): PushNotifyInput {
    return {
      type: 'RAFFLE',
      text: `You have an unclaimed prize! ${prizeMessage(opts)}`,
      userIds: [opts.user.id],
    };
  }

  static welcomeUser(
    opts: ExtractTemplatePayload<'welcome-user'>
  ): PushNotifyInput {
    return {
      type: 'SYSTEM',
      text: `Welcome to Charity Games! We've added <a href="${ACCOUNT_QUESTS_URL}">${STARTING_TOKENS} tokens</a> and <a href="${ACCOUNT_GIFT_BOXES_URL}">${STARTING_GIFT_BOXES} gift boxes</a> to your account. Spend your tokens on <a href="${RAFFLES_URL}">raffles</a> or <a href="${GAMES_URL}">play games</a> to win more!`,
      userIds: [opts.user.id],
    };
  }

  static newReferral(
    opts: ExtractTemplatePayload<'new-referral'>
  ): PushNotifyInput {
    return {
      type: 'FRIEND',
      text: `Someone has used your <a href="${ACCOUNT_REFERRED_ACCOUNTS_URL}">referral code to sign up</a>. You have received <a href="${ACCOUNT_QUESTS_URL}">${TOKENS_PER_REFERRAL_ACCOUNT} extra tokens</a>.`,
      userIds: [opts.user.id],
    };
  }

  static giftReceived(
    opts: ExtractTemplatePayload<'gift-received'>
  ): PushNotifyInput {
    return {
      userIds: [opts.recipient.id],
      type: 'REWARD',
      text: `<b>${opts.sender.username}</b> has sent you a gift box! Visit your <a href="${ACCOUNT_GIFT_BOXES_URL}">account</a> to claim your reward.`,
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
}

const prizeMessage = (opts: ExtractTemplatePayload<'won-raffle'>) =>
  `<a href="${ACCOUNT_PRIZES_URL}">Go to your account</a> to redeem a <a href="${PRIZE_URL(
    opts.prize.id
  )}">${opts.prize.name}</a>.`;

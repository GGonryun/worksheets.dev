import { TRPCError } from '@trpc/server';
import { Prisma, QuestType } from '@worksheets/prisma';
import { assertNever } from '@worksheets/util/errors';
import { convertJson, isPrismaJsonObject } from '@worksheets/util/prisma';
import { QuestTypeData, QuestTypeState } from '@worksheets/util/types';
import { has } from 'lodash';

export const parseState = <T extends QuestType>(
  type: T,
  state?: Prisma.JsonValue
): QuestTypeState[T] => {
  if (!state) {
    return defaultState(type);
  }

  switch (type) {
    case QuestType.PLAY_GAME:
      return parsePlayGameState(state) as QuestTypeState[T];
    case QuestType.ADD_FRIEND:
      return parseAddFriendState(state) as QuestTypeState[T];
    case QuestType.ADD_REFERRAL:
      return parseAddReferralState(state) as QuestTypeState[T];
    case QuestType.PLAY_MINUTES:
    case QuestType.REFERRAL_PLAY_MINUTES:
    case QuestType.FRIEND_PLAY_MINUTES:
      return parsePlayMinutesState(state) as QuestTypeState[T];
    case QuestType.FOLLOW_TWITTER:
    case QuestType.JOIN_DISCORD_GUILD:
    case QuestType.VISIT_WEBSITE:
    case QuestType.BATTLE_PARTICIPATION:
    case QuestType.RAFFLE_PARTICIPATION:
    case QuestType.BASIC_ACTION:
    case QuestType.WATCH_AD:
    case QuestType.FOLLOW_TWITCH:
    case QuestType.WISHLIST_STEAM_GAME:
      return state as QuestTypeState[T];
    default:
      throw assertNever(type);
  }
};

export const defaultState = <T extends QuestType>(
  type: T
): QuestTypeState[T] => {
  switch (type) {
    case QuestType.PLAY_GAME:
      return { progress: 0 } as QuestTypeState[T];
    case QuestType.PLAY_MINUTES:
    case QuestType.FRIEND_PLAY_MINUTES:
    case QuestType.REFERRAL_PLAY_MINUTES:
      return { duration: 0 } as QuestTypeState[T];
    case QuestType.FOLLOW_TWITTER:
      return { username: '' } as QuestTypeState[T];
    case QuestType.ADD_FRIEND:
      return { friends: [] } as QuestTypeState[T];
    case QuestType.ADD_REFERRAL:
      return { referrals: [] } as QuestTypeState[T];
    case QuestType.JOIN_DISCORD_GUILD:
    case QuestType.FOLLOW_TWITCH:
    case QuestType.VISIT_WEBSITE:
    case QuestType.WATCH_AD:
    case QuestType.RAFFLE_PARTICIPATION:
    case QuestType.BASIC_ACTION:
    case QuestType.BATTLE_PARTICIPATION:
    case QuestType.WISHLIST_STEAM_GAME:
      return {} as QuestTypeState[T];
    default:
      throw assertNever(type);
  }
};

export const parsePlayGameState = (
  state: unknown
): QuestTypeState['PLAY_GAME'] => {
  if (!isPrismaJsonObject(state)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'State is not an object',
    });
  }

  if (!has(state, 'progress') || typeof state['progress'] !== 'number') {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'State is missing progress field',
    });
  }

  return { progress: state['progress'] };
};

export const parseAddFriendState = (
  state: unknown
): QuestTypeState['ADD_FRIEND'] => {
  if (!isPrismaJsonObject(state)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'State is not an object',
    });
  }
  if (!has(state, 'friends')) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'State is missing friends field',
    });
  }
  const friends = state['friends'];
  if (!Array.isArray(friends)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'State is not an array',
    });
  }
  return { friends: convertJson<string[]>(friends) };
};

export const parseAddReferralState = (
  state: unknown
): QuestTypeState['ADD_REFERRAL'] => {
  if (!isPrismaJsonObject(state)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'State is not an object',
    });
  }
  if (!has(state, 'referrals')) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'State is missing referrals field',
    });
  }

  const referrals = state['referrals'];
  if (!Array.isArray(referrals)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'State is not an array',
    });
  }
  return { referrals: convertJson<string[]>(referrals) };
};

export const parsePlayMinutesState = (
  state: unknown
): QuestTypeState['PLAY_MINUTES'] => {
  if (!isPrismaJsonObject(state)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'State is not an object',
    });
  }
  if (!has(state, 'duration') || typeof state['duration'] !== 'number') {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'State is missing duration field',
    });
  }

  return { duration: state['duration'] };
};

export const parseData = <T extends QuestType>(
  data: Prisma.JsonValue
): QuestTypeData[T] => {
  if (!isPrismaJsonObject(data)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Data is not an object',
    });
  }
  // TODO: add more validation
  return data as QuestTypeData[T];
};

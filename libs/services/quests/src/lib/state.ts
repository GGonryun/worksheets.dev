import { TRPCError } from '@trpc/server';
import { Prisma } from '@worksheets/prisma';
import { assertNever } from '@worksheets/util/errors';
import {
  AddFriendQuestState,
  AddReferralQuestState,
  FollowTwitterQuestState,
  PlayGameQuestState,
  PlayMinutesQuestState,
  Quest,
  QuestType,
  RaffleParticipationQuestState,
  VisitWebsiteQuestState,
} from '@worksheets/util/types';
import { has } from 'lodash';

export const parseState = (type: QuestType, state?: Prisma.JsonValue) => {
  if (!state) {
    return defaultState(type);
  }

  switch (type) {
    case QuestType.PLAY_GAME:
      return parsePlayGameState(state);
    case QuestType.VISIT_WEBSITE:
      return parseVisitWebsiteState(state);
    case QuestType.FOLLOW_TWITTER:
      return parseFollowTwitterState(state);
    case QuestType.ADD_FRIEND:
      return parseAddFriendState(state);
    case QuestType.ADD_REFERRAL:
      return parseAddReferralState(state);
    case QuestType.PLAY_MINUTES:
    case QuestType.REFERRAL_PLAY_MINUTES:
    case QuestType.FRIEND_PLAY_MINUTES:
      return parsePlayMinutesState(state);
    case QuestType.RAFFLE_PARTICIPATION:
      return parseRaffleParticipationState(state);
    default:
      throw assertNever(type);
  }
};

export const defaultState = (type: QuestType): Quest['state'] => {
  switch (type) {
    case QuestType.PLAY_GAME:
      return { progress: 0 };
    case QuestType.PLAY_MINUTES:
    case QuestType.REFERRAL_PLAY_MINUTES:
      return { duration: 0 };
    case QuestType.VISIT_WEBSITE:
      return { visited: 0 };
    case QuestType.FOLLOW_TWITTER:
      return { username: '' };
    case QuestType.ADD_FRIEND:
      return { friends: [] };
    case QuestType.ADD_REFERRAL:
      return { referrals: [] };
    case QuestType.RAFFLE_PARTICIPATION:
      return {
        entered: 0,
      };
    case QuestType.FRIEND_PLAY_MINUTES:
      return { duration: 0 };
    default:
      throw assertNever(type);
  }
};

export const parsePlayGameState = (state: unknown): PlayGameQuestState => {
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

export const parseVisitWebsiteState = (
  state: unknown
): VisitWebsiteQuestState => {
  if (!isPrismaJsonObject(state)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'State is not an object',
    });
  }

  if (!has(state, 'visited') || typeof state['visited'] !== 'number') {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'State is missing visited field',
    });
  }

  return { visited: state['visited'] };
};

export const parseFollowTwitterState = (
  state: unknown
): FollowTwitterQuestState => {
  if (!isPrismaJsonObject(state)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'State is not an object',
    });
  }
  if (!has(state, 'username') || typeof state['username'] !== 'string') {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'State is missing username field',
    });
  }
  return { username: state['username'] };
};

export const parseAddFriendState = (state: unknown): AddFriendQuestState => {
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
): AddReferralQuestState => {
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

export const parseRaffleParticipationState = (
  state: unknown
): RaffleParticipationQuestState => {
  if (!isPrismaJsonObject(state)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'State is not an object',
    });
  }
  if (!has(state, 'entered') || typeof state['entered'] !== 'number') {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'State is missing entered field',
    });
  }

  return { entered: state['entered'] };
};

export const parsePlayMinutesState = (
  state: unknown
): PlayMinutesQuestState => {
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

export const isPrismaJsonObject = (
  value: unknown
): value is Prisma.JsonObject => {
  if (value == null || typeof value !== 'object' || Array.isArray(value))
    return false;
  return true;
};

const convertJson = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T = string | number | boolean | Record<string, any> | Array<any> | null
>(
  json: Prisma.JsonValue
): T => {
  return json as T;
};

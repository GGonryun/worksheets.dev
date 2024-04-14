import { TRPCError } from '@trpc/server';
import {
  PrismaClient,
  PrismaTransactionalClient,
  QuestStatus,
} from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { assertNever } from '@worksheets/util/errors';
import {
  AddFriendQuestId,
  AddReferralQuestId,
  definitionsByType,
  FollowTwitterQuestId,
  FriendPlayMinutesQuestId,
  PlayGameQuestId,
  PlayMinutesQuestId,
  Quest,
  QuestCategory,
  QuestFrequency,
  QuestId,
  QuestInput,
  QUESTS,
  QuestType,
  QuestTypeInput,
  QuestTypeToCategory,
  RaffleParticipationQuestId,
  ReferralPlayMinutesQuestId,
  VisitWebsiteQuestId,
} from '@worksheets/util/types';

import { parseExpiration } from './lib/expiration';
import { parseState } from './lib/state';
import { parseStatus } from './lib/status';
import {
  trackAddFriendProgress,
  trackAddReferralProgress,
  trackFinitePlayGameProgress,
  trackFollowTwitterProgress,
  trackFriendPlayMinutesProgress,
  trackInfinitePlayGameProgress,
  trackPlayMinutesProgress,
  trackRaffleParticipationProgress,
  trackReferralPlayMinutesProgress,
  trackWebsiteVisitProgress,
} from './lib/tracking';

export class QuestsService {
  #db: PrismaClient | PrismaTransactionalClient;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
  }

  async list(opts: {
    userId: string;
    statuses?: QuestStatus[];
    frequencies?: QuestFrequency[];
    categories?: QuestCategory[];
  }) {
    const progress = await this.#db.questProgress.findMany({
      where: {
        userId: opts.userId,
      },
    });

    const joined = Object.values(QUESTS).map((definition) => {
      const quest = progress.find((state) => state.questId === definition.id);
      return {
        id: definition.id,
        order: definition.order,
        frequency: definition.frequency,
        type: definition.type,
        status: quest?.status ?? 'PENDING',
      };
    });

    const filtered = joined.filter((item) => {
      const statusMatch = opts.statuses
        ? opts.statuses.includes(item.status)
        : true;
      const frequencyMatch = opts.frequencies
        ? opts.frequencies.includes(item.frequency)
        : true;
      const categoryMatch = opts.categories
        ? opts.categories.includes(QuestTypeToCategory[item.type])
        : true;
      return statusMatch && frequencyMatch && categoryMatch;
    });

    return filtered.sort((a, b) => a.order - b.order);
  }
  async find(opts: { userId: string; questId: QuestId }): Promise<Quest> {
    const definition = QUESTS[opts.questId];

    if (!definition) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Quest definition not found',
      });
    }

    const progress = await this.#db.questProgress.findFirst({
      where: {
        questId: opts.questId,
        userId: opts.userId,
      },
    });

    return {
      order: definition.order,
      id: definition.id,
      title: definition.title,
      description: definition.description,
      frequency: definition.frequency,
      reward: definition.reward,
      data: definition.data,
      type: definition.type,
      status: parseStatus(progress),
      expiresAt: parseExpiration(progress),
      state: parseState(definition.type, progress?.state),
      // We must cast to any here because the state type is not known at compile time, but we want to use type guards later to ensure the state is correct.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  }
  async trackId<T extends QuestId>(opts: {
    questId: T;
    userId: string;
    input: QuestInput<T>;
  }) {
    const inventory = new InventoryService(this.#db);
    const notifications = new NotificationsService(this.#db);

    switch (opts.questId) {
      case 'PLAY_GAME_DAILY_5':
      case 'PLAY_GAME_WEEKLY_25':
        return await trackFinitePlayGameProgress({
          db: this.#db,
          notifications,
          inventory,
          questId: opts.questId,
          userId: opts.userId,
          input: opts.input as QuestInput<PlayGameQuestId>,
        });
      case 'PLAY_GAME_INFINITE':
        return await trackInfinitePlayGameProgress({
          db: this.#db,
          notifications,
          inventory,
          questId: opts.questId,
          userId: opts.userId,
          input: opts.input as QuestInput<'PLAY_GAME_INFINITE'>,
        });
      case 'VISIT_CHARITY_GAMES':
      case 'VISIT_WATER_ORG':
        return await trackWebsiteVisitProgress({
          db: this.#db,
          notifications,
          inventory,
          questId: opts.questId,
          userId: opts.userId,
          input: opts.input as QuestInput<VisitWebsiteQuestId>,
        });
      case 'FOLLOW_CHARITY_GAMES_TWITTER':
      case 'FOLLOW_WATER_ORG_TWITTER':
        return await trackFollowTwitterProgress({
          db: this.#db,
          notifications,
          inventory,
          questId: opts.questId,
          userId: opts.userId,
          input: opts.input as QuestInput<FollowTwitterQuestId>,
        });
      case 'RAFFLE_PARTICIPATION_DAILY':
        return await trackRaffleParticipationProgress({
          db: this.#db,
          notifications,
          inventory,
          questId: opts.questId,
          userId: opts.userId,
          input: opts.input as QuestInput<RaffleParticipationQuestId>,
        });
      case 'ADD_FRIEND_INFINITE':
        return await trackAddFriendProgress({
          db: this.#db,
          notifications,
          inventory,
          questId: opts.questId,
          userId: opts.userId,
          input: opts.input as QuestInput<AddFriendQuestId>,
        });
      case 'ADD_REFERRAL_INFINITE':
        return await trackAddReferralProgress({
          db: this.#db,
          notifications,
          inventory,
          questId: opts.questId,
          userId: opts.userId,
          input: opts.input as QuestInput<AddReferralQuestId>,
        });
      case 'REFERRAL_PLAY_MINUTES_INFINITE':
        return await trackReferralPlayMinutesProgress({
          db: this.#db,
          notifications,
          inventory,
          questId: opts.questId,
          userId: opts.userId,
          input: opts.input as QuestInput<ReferralPlayMinutesQuestId>,
        });
      case 'PLAY_MINUTES_INFINITE':
        return await trackPlayMinutesProgress({
          db: this.#db,
          notifications,
          inventory,
          questId: opts.questId,
          userId: opts.userId,
          input: opts.input as QuestInput<PlayMinutesQuestId>,
        });
      case 'FRIEND_PLAY_MINUTES_INFINITE':
        return await trackFriendPlayMinutesProgress({
          db: this.#db,
          notifications,
          inventory,
          questId: opts.questId,
          userId: opts.userId,
          input: opts.input as QuestInput<FriendPlayMinutesQuestId>,
        });
      default:
        throw assertNever(opts.questId);
    }
  }
  async trackType<T extends QuestType>(opts: {
    userId: string;
    questType: T;
    input: QuestTypeInput<T>;
  }) {
    switch (opts.questType) {
      case QuestType.PLAY_GAME:
      case QuestType.PLAY_MINUTES:
      case QuestType.ADD_FRIEND:
      case QuestType.ADD_REFERRAL:
      case QuestType.RAFFLE_PARTICIPATION:
      case QuestType.REFERRAL_PLAY_MINUTES:
      case QuestType.FRIEND_PLAY_MINUTES:
        return await Promise.all(
          definitionsByType[opts.questType].map((d) =>
            this.trackId({
              userId: opts.userId,
              questId: d.id,
              input: opts.input,
            })
          )
        );
      case QuestType.VISIT_WEBSITE:
      case QuestType.FOLLOW_TWITTER:
        throw new Error(
          `The ${opts.questType} quest type does not support tracking events.`
        );

      default:
        throw assertNever(opts.questType);
    }
  }
  async destroyExpired() {
    const action = await this.#db.questProgress.deleteMany({
      where: {
        expiresAt: {
          lte: new Date(),
        },
      },
    });

    console.info(`Destroyed ${action.count} expired notifications`);
  }
}

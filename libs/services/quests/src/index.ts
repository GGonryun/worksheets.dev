import { TRPCError } from '@trpc/server';
import { QuestId, QUESTS } from '@worksheets/data/quests';
import {
  PrismaClient,
  PrismaTransactionalClient,
  QuestCategory,
  QuestFrequency,
  QuestStatus,
  QuestType,
} from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { assertNever } from '@worksheets/util/errors';
import { parseData, parseState } from '@worksheets/util/quests';
import {
  BasicQuestSchema,
  DetailedQuestSchema,
  QuestTypeInput,
} from '@worksheets/util/types';

import { parseExpiration } from './lib/expiration';
import { parseStatus } from './lib/status';
import {
  trackAddFriendProgress,
  trackAddReferralProgress,
  trackBasicActionProgress,
  trackFinitePlayGameProgress,
  trackFollowTwitterProgress,
  trackFriendPlayMinutesProgress,
  trackInfinitePlayGameProgress,
  trackPlayMinutesProgress,
  trackRaffleParticipationProgress,
  trackReferralPlayMinutesProgress,
  trackWatchAdProgress,
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
  }): Promise<BasicQuestSchema[]> {
    const progress = await this.#db.questProgress.findMany({
      where: {
        userId: opts.userId,
      },
    });

    const definitions = await this.#db.questDefinition.findMany({
      include: {
        loot: {
          include: { item: true },
        },
      },
    });

    const joined = definitions.map((definition) => {
      const quest = progress.find(
        (state) => state.questDefinitionId === definition.id
      );
      return {
        id: definition.id as QuestId,
        order: definition.order,
        frequency: definition.frequency,
        category: definition.category,
        type: definition.type,
        status: parseStatus(quest),
        loot: definition.loot,
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
        ? opts.categories.includes(item.category)
        : true;
      return statusMatch && frequencyMatch && categoryMatch;
    });

    return filtered.sort((a, b) => a.order - b.order);
  }
  async find(opts: {
    userId: string;
    questId: string;
  }): Promise<DetailedQuestSchema> {
    const definition = await this.#db.questDefinition.findFirst({
      where: {
        id: opts.questId,
      },
      include: {
        loot: {
          include: { item: true },
        },
      },
    });

    if (!definition) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Quest definition not found',
      });
    }

    const progress = await this.#db.questProgress.findFirst({
      where: {
        questDefinitionId: opts.questId,
        userId: opts.userId,
      },
    });

    return {
      id: definition.id as QuestId,
      order: definition.order,
      name: definition.name,
      description: definition.description,
      frequency: definition.frequency,
      category: definition.category,
      loot: definition.loot,
      type: definition.type,
      data: parseData(definition.data),
      status: parseStatus(progress),
      expiresAt: parseExpiration(progress),
      state: parseState(definition.type, progress?.state),
      // We must cast to any here because the state type is not known at compile time, but we want to use type guards later to ensure the state is correct.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    };
  }
  async trackId<T extends QuestType>(opts: {
    questId: QuestId;
    userId: string;
    input: QuestTypeInput[T];
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
          questType: 'PLAY_GAME',
          ...opts,
        });
      case 'PLAY_GAME_INFINITE':
        return await trackInfinitePlayGameProgress({
          db: this.#db,
          notifications,
          inventory,
          questType: 'PLAY_GAME',
          ...opts,
        });
      case 'VISIT_CHARITY_GAMES':
      case 'VISIT_WATER_ORG':
      case 'VISIT_INDIEFOLD':
      case 'VISIT_PLAY_THIS':
        return await trackWebsiteVisitProgress({
          db: this.#db,
          notifications,
          inventory,
          questType: 'VISIT_WEBSITE',
          ...opts,
        });
      case 'FOLLOW_INDIEFOLD_TWITTER':
      case 'FOLLOW_PLAY_THIS_TWITTER':
      case 'FOLLOW_CHARITY_GAMES_TWITTER':
      case 'FOLLOW_WATER_ORG_TWITTER':
        return await trackFollowTwitterProgress({
          db: this.#db,
          notifications,
          inventory,
          questType: 'FOLLOW_TWITTER',
          input: opts.input as QuestTypeInput['FOLLOW_TWITTER'],
          questId: opts.questId,
          userId: opts.userId,
        });
      case 'RAFFLE_PARTICIPATION_DAILY':
        return await trackRaffleParticipationProgress({
          db: this.#db,
          notifications,
          inventory,
          questType: 'RAFFLE_PARTICIPATION',
          ...opts,
        });
      case 'ADD_FRIEND_INFINITE':
        return await trackAddFriendProgress({
          db: this.#db,
          notifications,
          inventory,
          questType: 'ADD_FRIEND',
          input: opts.input as QuestTypeInput['ADD_FRIEND'],
          questId: opts.questId,
          userId: opts.userId,
        });
      case 'ADD_REFERRAL_INFINITE':
        return await trackAddReferralProgress({
          db: this.#db,
          notifications,
          inventory,
          questType: 'ADD_REFERRAL',
          input: opts.input as QuestTypeInput['ADD_REFERRAL'],
          questId: opts.questId,
          userId: opts.userId,
        });
      case 'REFERRAL_PLAY_MINUTES_INFINITE':
        return await trackReferralPlayMinutesProgress({
          db: this.#db,
          notifications,
          inventory,
          questType: 'REFERRAL_PLAY_MINUTES',
          input: opts.input as QuestTypeInput['REFERRAL_PLAY_MINUTES'],
          questId: opts.questId,
          userId: opts.userId,
        });
      case 'PLAY_MINUTES_INFINITE':
        return await trackPlayMinutesProgress({
          db: this.#db,
          notifications,
          inventory,
          questType: 'PLAY_MINUTES',
          input: opts.input as QuestTypeInput['PLAY_MINUTES'],
          questId: opts.questId,
          userId: opts.userId,
        });
      case 'FRIEND_PLAY_MINUTES_INFINITE':
        return await trackFriendPlayMinutesProgress({
          db: this.#db,
          notifications,
          inventory,
          questType: 'FRIEND_PLAY_MINUTES',
          input: opts.input as QuestTypeInput['FRIEND_PLAY_MINUTES'],
          questId: opts.questId,
          userId: opts.userId,
        });
      case 'DAILY_GIFT_BOXES':
      case 'DAILY_WEAPONS_CRATE':
        return await trackBasicActionProgress({
          db: this.#db,
          inventory,
          notifications,
          questType: 'BASIC_ACTION',
          ...opts,
        });
      case 'WATCH_AD_1':
      case 'WATCH_AD_2':
        return await trackWatchAdProgress({
          db: this.#db,
          inventory,
          notifications,
          questType: 'WATCH_AD',
          ...opts,
        });
      default:
        throw assertNever(opts.questId);
    }
  }
  async trackType<T extends QuestType>(opts: {
    userId: string;
    questType: T;
    input: QuestTypeInput[T];
  }) {
    const questIds = QUESTS.filter((q) => q.type === opts.questType).map(
      (q) => q.id
    );

    switch (opts.questType) {
      case QuestType.PLAY_GAME:
      case QuestType.PLAY_MINUTES:
      case QuestType.ADD_FRIEND:
      case QuestType.ADD_REFERRAL:
      case QuestType.RAFFLE_PARTICIPATION:
      case QuestType.REFERRAL_PLAY_MINUTES:
      case QuestType.FRIEND_PLAY_MINUTES:
      case QuestType.BASIC_ACTION:
        return await Promise.all(
          questIds.map((questId) =>
            this.trackId({
              questId,
              userId: opts.userId,
              input: opts.input,
            })
          )
        );
      case QuestType.WATCH_AD:
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

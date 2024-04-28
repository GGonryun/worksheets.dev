import { TRPCError } from '@trpc/server';
import { DROP_LOTTERY, ItemId } from '@worksheets/data/items';
import {
  Prisma,
  PrismaClient,
  PrismaTransactionalClient,
  QuestProgress,
  QuestType,
} from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { lottery } from '@worksheets/util/arrays';
import { parseData, parseState } from '@worksheets/util/quests';
import { PLAY_MINUTE_DROP_CHANCE } from '@worksheets/util/settings';
import { isExpired } from '@worksheets/util/time';
import {
  QuestTypeData,
  QuestTypeInput,
  QuestTypeState,
} from '@worksheets/util/types';

import { createExpirationDate } from './expiration';

type TrackProgressOpts<T extends QuestType> = {
  questId: string;
  questType: T;
  userId: string;
  input: QuestTypeInput[T];
  db: PrismaClient | PrismaTransactionalClient;
  inventory: InventoryService;
  notifications: NotificationsService;
};

export const trackFinitePlayGameProgress = async (
  opts: TrackProgressOpts<'PLAY_GAME'>
) => {
  const { progress, definition } = await getQuest<'PLAY_GAME'>(opts);

  onQuestCompletable(progress, async () => {
    if (!progress) {
      await opts.db.questProgress.create({
        data: {
          userId: opts.userId,
          questDefinitionId: opts.questId,
          status: 'ACTIVE',
          expiresAt: createExpirationDate(definition.frequency),
          state: {
            progress: 1,
          },
        },
      });

      return;
    }

    if (isExpired(progress.expiresAt)) {
      await opts.db.questProgress.update({
        where: {
          id: progress.id,
        },
        data: {
          status: 'ACTIVE',
          state: {
            progress: 1,
          },
          expiresAt: createExpirationDate(definition.frequency),
        },
      });
      return;
    }

    if (progress.state.progress < definition.data.requirement) {
      await opts.db.questProgress.update({
        where: {
          userId_questDefinitionId: {
            userId: opts.userId,
            questDefinitionId: opts.questId,
          },
        },
        data: {
          state: {
            progress: progress.state.progress + 1,
          },
        },
      });
      return;
    }

    await opts.db.questProgress.update({
      where: {
        id: progress.id,
      },
      data: {
        status: 'COMPLETED',
      },
    });
    await awardLoot(opts.inventory, opts.userId, definition.loot);
    await opts.notifications.send('quest-completed', {
      userId: opts.userId,
      quest: definition,
    });
  });
};

export const trackInfinitePlayGameProgress = async (
  opts: TrackProgressOpts<'PLAY_GAME'>
) => {
  const { progress, definition } = await getQuest(opts);

  if (!progress) {
    await opts.db.questProgress.create({
      data: {
        userId: opts.userId,
        questDefinitionId: opts.questId,
        status: 'ACTIVE',
        state: {
          progress: 1,
        },
      },
    });
  } else {
    await opts.db.questProgress.update({
      where: {
        userId_questDefinitionId: {
          userId: opts.userId,
          questDefinitionId: opts.questId,
        },
      },
      data: {
        state: {
          progress: progress.state.progress + 1,
        },
      },
    });
  }

  await awardLoot(opts.inventory, opts.userId, definition.loot);
};

export const trackWebsiteVisitProgress = async (
  opts: TrackProgressOpts<'VISIT_WEBSITE'>
) => {
  const { progress, definition } = await getQuest(opts);

  onQuestCompletable(progress, async () => {
    const status = 'COMPLETED';
    const expiresAt = createExpirationDate(definition.frequency);
    await opts.db.questProgress.upsert({
      where: {
        userId_questDefinitionId: {
          userId: opts.userId,
          questDefinitionId: opts.questId,
        },
      },
      create: {
        userId: opts.userId,
        questDefinitionId: opts.questId,
        expiresAt,
        status,
        state: {},
      },
      update: {
        expiresAt,
        status,
        state: {},
      },
    });

    await awardLoot(opts.inventory, opts.userId, definition.loot);
    await opts.notifications.send('quest-completed', {
      userId: opts.userId,
      quest: definition,
    });
  });
};

export const trackFollowTwitterProgress = async (
  opts: TrackProgressOpts<'FOLLOW_TWITTER'>
) => {
  const { userId, questId } = opts;
  const { progress, definition } = await getQuest(opts);

  onQuestCompletable(progress, async () => {
    const expiresAt = createExpirationDate(definition.frequency);
    const status = 'COMPLETED';
    await opts.db.questProgress.upsert({
      where: {
        userId_questDefinitionId: {
          userId,
          questDefinitionId: questId,
        },
      },
      create: {
        userId,
        questDefinitionId: questId,
        expiresAt,
        status,
        state: opts.input,
      },
      update: {
        expiresAt,
        status,
        state: opts.input,
      },
    });

    await awardLoot(opts.inventory, userId, definition.loot);
    await opts.notifications.send('quest-completed', {
      userId: opts.userId,
      quest: definition,
    });
  });
};

export const trackRaffleParticipationProgress = async (
  opts: TrackProgressOpts<'RAFFLE_PARTICIPATION'>
) => {
  const { userId, questId } = opts;
  const { progress, definition } = await getQuest(opts);

  onQuestCompletable(progress, async () => {
    const expiresAt = createExpirationDate(definition.frequency);
    const status = 'COMPLETED';

    await opts.db.questProgress.upsert({
      where: {
        userId_questDefinitionId: {
          userId,
          questDefinitionId: questId,
        },
      },
      create: {
        userId,
        questDefinitionId: questId,
        expiresAt,
        status,
        state: {},
      },
      update: {
        expiresAt,
        status,
        state: {},
      },
    });
    await awardLoot(opts.inventory, userId, definition.loot);
    await opts.notifications.send('quest-completed', {
      userId: opts.userId,
      quest: definition,
    });
  });
};

export const trackAddFriendProgress = async (
  opts: TrackProgressOpts<'ADD_FRIEND'>
) => {
  const { userId, questId, input } = opts;
  const { progress, definition } = await getQuest(opts);

  // if they haven't started add the first friend and reward them
  if (!progress) {
    await opts.db.questProgress.create({
      data: {
        userId,
        questDefinitionId: questId,
        status: 'ACTIVE',
        state: { friends: [input.userId] },
      },
    });

    await awardLoot(opts.inventory, userId, definition.loot);
    return;
  }

  // if they've started, check if they've added that friend already
  if (progress.state.friends.includes(input.userId)) {
    return;
  }

  // if they haven't added that friend, add them and reward them
  await opts.db.questProgress.update({
    where: {
      userId_questDefinitionId: {
        userId,
        questDefinitionId: questId,
      },
    },
    data: {
      state: {
        friends: [...progress.state.friends, input.userId],
      },
    },
  });

  await awardLoot(opts.inventory, userId, definition.loot);
};

export const trackAddReferralProgress = async (
  opts: TrackProgressOpts<'ADD_REFERRAL'>
) => {
  const { userId, questId, input } = opts;
  const { progress, definition } = await getQuest(opts);

  // if they haven't started add the first friend and reward them
  if (!progress) {
    await opts.db.questProgress.create({
      data: {
        userId,
        questDefinitionId: questId,
        status: 'ACTIVE',
        state: { referrals: [input.userId] },
      },
    });

    await awardLoot(opts.inventory, userId, definition.loot);
    return;
  }

  // if they've started, check if they've added that friend already
  if (progress.state.referrals.includes(input.userId)) {
    console.warn('User has already referred this friend before', opts);
    return;
  }

  // if they haven't added that friend, add them and reward them
  await opts.db.questProgress.update({
    where: {
      userId_questDefinitionId: {
        userId,
        questDefinitionId: questId,
      },
    },
    data: {
      state: {
        referrals: [...progress.state.referrals, input.userId],
      },
    },
  });

  await awardLoot(opts.inventory, userId, definition.loot);
};

export const trackReferralPlayMinutesProgress = async (
  opts: TrackProgressOpts<'REFERRAL_PLAY_MINUTES'>
) => {
  const { userId, questId, input } = opts;
  const { progress, definition } = await getQuest<'REFERRAL_PLAY_MINUTES'>(
    opts
  );

  const user = await opts.db.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      referredBy: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!user || !user.referredBy || !user.referredBy.id) {
    return;
  }

  if (!progress) {
    await opts.db.questProgress.create({
      data: {
        userId: user.referredBy.id,
        questDefinitionId: questId,
        status: 'ACTIVE',
        state: { duration: input.increment },
      },
    });

    return;
  } else {
    await opts.db.questProgress.update({
      where: {
        id: progress.id,
      },
      data: {
        state: {
          duration: Math.floor(progress.state.duration + input.increment),
        },
      },
    });
    const completions = calculateCompletionsFromPlayTime(
      progress.state.duration,
      input.increment,
      definition.data.requirement
    );
    if (completions > 0) {
      await awardLoot(opts.inventory, userId, definition.loot, completions);
    }
  }
};

export const trackFriendPlayMinutesProgress = async (
  opts: TrackProgressOpts<'FRIEND_PLAY_MINUTES'>
) => {
  const { userId, questId, input } = opts;
  const { progress, definition } = await getQuest(opts);

  const favorites = await opts.db.friendship.findMany({
    where: {
      userId,
      isFavorite: true,
    },
    select: {
      friendId: true,
    },
  });

  await Promise.allSettled(
    favorites.map(async (friend) => {
      if (!progress) {
        await opts.db.questProgress.create({
          data: {
            userId: friend.friendId,
            questDefinitionId: questId,
            status: 'ACTIVE',
            state: { duration: input.increment },
          },
        });

        return;
      } else {
        await opts.db.questProgress.update({
          where: {
            id: progress.id,
          },
          data: {
            state: {
              duration: Math.floor(progress.state.duration + input.increment),
            },
          },
        });

        const completions = calculateCompletionsFromPlayTime(
          progress.state.duration,
          input.increment,
          definition.data.requirement
        );

        if (completions > 0) {
          await awardLoot(opts.inventory, userId, definition.loot, completions);
        }
      }
    })
  );
};

export const trackPlayMinutesProgress = async (
  opts: TrackProgressOpts<'PLAY_MINUTES'>
) => {
  const { userId, questId, input } = opts;
  const { progress, definition } = await getQuest(opts);

  if (!progress) {
    await opts.db.questProgress.create({
      data: {
        userId,
        questDefinitionId: questId,
        status: 'ACTIVE',
        state: { duration: input.increment },
      },
    });

    return;
  } else {
    await opts.db.questProgress.update({
      where: {
        id: progress.id,
      },
      data: {
        state: {
          duration: Math.floor(progress.state.duration + input.increment),
        },
      },
    });
    const completions = calculateCompletionsFromPlayTime(
      progress.state.duration,
      input.increment,
      definition.data.requirement
    );
    if (completions > 0) {
      await awardLottery(opts, opts.input.game, completions);
      // TODO: 1% chance to earn a random droppable item after every minute played.
      await awardLoot(opts.inventory, userId, definition.loot, completions);
    }
  }
};

export const trackBasicActionProgress = async (
  opts: TrackProgressOpts<'BASIC_ACTION'>
) => {
  const { userId, questId } = opts;
  const { progress, definition } = await getQuest(opts);

  onQuestCompletable(progress, async () => {
    const expiresAt = createExpirationDate(definition.frequency);
    const status = 'COMPLETED';
    await opts.db.questProgress.upsert({
      where: {
        userId_questDefinitionId: {
          userId,
          questDefinitionId: questId,
        },
      },
      create: {
        userId,
        questDefinitionId: questId,
        expiresAt,
        status,
        state: {},
      },
      update: {
        expiresAt,
        status,
      },
    });

    await awardLoot(opts.inventory, userId, definition.loot);
    await opts.notifications.send('quest-completed', {
      userId: opts.userId,
      quest: definition,
    });
  });
};

export const trackWatchAdProgress = async (
  opts: TrackProgressOpts<'WATCH_AD'>
) => {
  const { progress, definition } = await getQuest(opts);

  onQuestCompletable(progress, async () => {
    const status = 'COMPLETED';
    const expiresAt = createExpirationDate(definition.frequency);
    if (!progress) {
      await opts.db.questProgress.create({
        data: {
          userId: opts.userId,
          questDefinitionId: opts.questId,
          status,
          expiresAt,
          state: {},
        },
      });
    } else {
      await opts.db.questProgress.update({
        where: {
          id: progress.id,
        },
        data: {
          status,
          expiresAt,
          state: {},
        },
      });
    }

    await awardLoot(opts.inventory, opts.userId, definition.loot);
    await opts.notifications.send('quest-completed', {
      userId: opts.userId,
      quest: definition,
    });
  });
};

/**
 * A completed quest that's expired can be reset and completed again.
 */
const onQuestCompletable = async (
  progress: Pick<QuestProgress, 'expiresAt' | 'status'> | null,
  fn: () => Promise<void>
) => {
  if (
    progress &&
    progress.status === 'COMPLETED' &&
    !isExpired(progress.expiresAt)
  )
    return;

  await fn();
};

const getQuest = async <T extends QuestType>(opts: {
  db: PrismaClient | PrismaTransactionalClient;
  questId: string;
  questType: T;
  userId: string;
}): Promise<{
  progress: ProgressedQuest<T> | null;
  definition: DefinedQuest<T>;
}> => {
  return {
    progress: await getProgress<T>(opts),
    definition: await getDefinition<T>(opts),
  };
};

const getProgress = async <T extends QuestType>(opts: {
  db: PrismaClient | PrismaTransactionalClient;
  questId: string;
  questType: T;
  userId: string;
}): Promise<ProgressedQuest<T> | null> => {
  const progress = await opts.db.questProgress.findFirst({
    where: {
      questDefinitionId: opts.questId,
      userId: opts.userId,
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      expiresAt: true,
      status: true,
      state: true,
      questDefinitionId: true,
    },
  });
  if (!progress) return null;

  return { ...progress, state: parseState<T>(opts.questType, progress?.state) };
};

const getDefinition = async <T extends QuestType>(opts: {
  db: PrismaClient | PrismaTransactionalClient;
  questId: string;
}): Promise<DefinedQuest<T>> => {
  const definition = await opts.db.questDefinition.findFirst({
    where: {
      id: opts.questId,
    },
    include: {
      loot: {
        include: {
          item: true,
        },
      },
    },
  });
  if (!definition)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Quest definition not found',
    });

  const data: QuestTypeData[T] = parseData<T>(definition.data);
  return { ...definition, data };
};

const awardLottery = async <T extends QuestType>(
  opts: TrackProgressOpts<T>,
  game: { id: string; title: string },
  completions?: number
) => {
  for (let i = 0; i < (completions ?? 0); i++) {
    const chance = Math.random();
    // there's a chance to earn a random droppable item after every minute played.
    if (chance > PLAY_MINUTE_DROP_CHANCE) {
      return;
    }

    const itemId = lottery(DROP_LOTTERY);
    const item = await opts.db.item.findFirst({
      where: {
        id: itemId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!item) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Item with id ${itemId} not found`,
      });
    }

    await opts.inventory.increment(opts.userId, item.id as ItemId, 1);
    await opts.notifications.send('found-item', {
      userId: opts.userId,
      item,
      game,
    });
  }
};

const awardLoot = async (
  inventory: InventoryService,
  userId: string,
  loot: Pick<DefinedQuest['loot'][number], 'itemId' | 'quantity'>[],
  multiplier = 1
) => {
  for (const l of loot) {
    await inventory.increment(
      userId,
      l.itemId as ItemId,
      l.quantity * multiplier
    );
  }
};

const calculateCompletionsFromPlayTime = (
  duration: number,
  increment: number,
  timer: number
) => {
  const newDuration = duration + increment;
  const oldDuration = duration;
  const newCompletions = Math.floor(newDuration / timer);
  const oldCompletions = Math.floor(oldDuration / timer);
  return newCompletions - oldCompletions;
};

type DefinedQuest<T extends QuestType = QuestType> = Omit<
  Prisma.QuestDefinitionGetPayload<{
    include: {
      loot: {
        include: {
          item: true;
        };
      };
    };
  }>,
  'data'
> & { data: QuestTypeData[T] };

type ProgressedQuest<T extends QuestType = QuestType> = Omit<
  Prisma.QuestProgressGetPayload<{
    select: {
      id: true;
      createdAt: true;
      updatedAt: true;
      expiresAt: true;
      status: true;
      state: true;
      questDefinitionId: true;
    };
  }>,
  'state'
> & { state: QuestTypeState[T] };

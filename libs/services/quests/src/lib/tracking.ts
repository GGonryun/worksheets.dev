import { TRPCError } from '@trpc/server';
import { PrismaClient, PrismaTransactionalClient } from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { isExpired, now } from '@worksheets/util/time';
import {
  AddFriendQuestId,
  AddReferralQuestId,
  FollowTwitterQuestId,
  FriendPlayMinutesQuestId,
  PlayGameQuestId,
  PlayMinutesQuestId,
  QuestId,
  QuestInput,
  QuestProgress,
  QUESTS,
  Quests,
  RaffleParticipationQuestId,
  ReferralPlayMinutesQuestId,
  VisitWebsiteQuestId,
} from '@worksheets/util/types';

import { createExpirationDate } from './expiration';
import {
  parseAddFriendState,
  parseAddReferralState,
  parsePlayGameState,
  parsePlayMinutesState,
  parseRaffleParticipationState,
  parseVisitWebsiteState,
} from './state';

type TrackProgressOpts<T extends QuestId> = {
  questId: T;
  userId: string;
  input: QuestInput<T>;
  db: PrismaClient | PrismaTransactionalClient;
  inventory: InventoryService;
  notifications: NotificationsService;
};

export const trackFinitePlayGameProgress = async (
  opts: TrackProgressOpts<PlayGameQuestId>
) => {
  const { progress, definition } = await getQuest(opts);
  if (!progress) {
    await opts.db.questProgress.create({
      data: {
        userId: opts.userId,
        questId: opts.questId,
        status: 'ACTIVE',
        expiresAt: createExpirationDate(definition.frequency),
        state: {
          progress: 1,
        },
      },
    });

    return;
  } else {
    const state = parsePlayGameState(progress.state);
    if (progress.status === 'COMPLETED') {
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
      } else {
        console.info('Quest is not active', opts);
        return;
      }
    } else {
      if (state.progress >= definition.data.requirement) {
        await opts.db.questProgress.update({
          where: {
            id: progress.id,
          },
          data: {
            status: 'COMPLETED',
          },
        });
        await opts.inventory.increment(opts.userId, '1', definition.reward);
        await opts.notifications.send('quest-completed', {
          userId: opts.userId,
          quest: definition,
        });
        return;
      } else {
        await opts.db.questProgress.update({
          where: {
            userId_questId: {
              userId: opts.userId,
              questId: opts.questId,
            },
          },
          data: {
            state: {
              progress: state.progress + 1,
            },
          },
        });
      }
    }
  }
};

export const trackInfinitePlayGameProgress = async (
  opts: TrackProgressOpts<PlayGameQuestId>
) => {
  const { progress, definition } = await getQuest(opts);

  if (!progress) {
    await opts.db.questProgress.create({
      data: {
        userId: opts.userId,
        questId: opts.questId,
        status: 'ACTIVE',
        state: {
          progress: 1,
        },
      },
    });

    return;
  } else {
    const state = parsePlayGameState(progress.state);
    await opts.db.questProgress.update({
      where: {
        userId_questId: {
          userId: opts.userId,
          questId: opts.questId,
        },
      },
      data: {
        state: {
          progress: state.progress + 1,
        },
      },
    });
  }

  await opts.inventory.increment(opts.userId, '1', definition.reward);
};

export const trackWebsiteVisitProgress = async (
  opts: TrackProgressOpts<VisitWebsiteQuestId>
) => {
  const { progress, definition } = await getQuest(opts);

  onQuestCompletable(progress, async () => {
    const state = parseVisitWebsiteState({
      visited: now().getTime(),
    });
    const status = 'COMPLETED';
    const expiresAt = createExpirationDate(definition.frequency);
    await opts.db.questProgress.upsert({
      where: {
        userId_questId: {
          userId: opts.userId,
          questId: opts.questId,
        },
      },
      create: {
        userId: opts.userId,
        questId: opts.questId,
        expiresAt,
        status,
        state,
      },
      update: {
        expiresAt,
        status,
        state,
      },
    });

    await opts.inventory.increment(opts.userId, '1', definition.reward);
    await opts.notifications.send('quest-completed', {
      userId: opts.userId,
      quest: definition,
    });
  });
};

export const trackFollowTwitterProgress = async (
  opts: TrackProgressOpts<FollowTwitterQuestId>
) => {
  const { userId, questId } = opts;
  const { progress, definition } = await getQuest(opts);

  onQuestCompletable(progress, async () => {
    const expiresAt = createExpirationDate(definition.frequency);
    const status = 'COMPLETED';
    await opts.db.questProgress.upsert({
      where: {
        userId_questId: {
          userId,
          questId,
        },
      },
      create: {
        userId,
        questId,
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

    await opts.inventory.increment(opts.userId, '1', definition.reward);
    await opts.notifications.send('quest-completed', {
      userId: opts.userId,
      quest: definition,
    });
  });
};

export const trackRaffleParticipationProgress = async (
  opts: TrackProgressOpts<RaffleParticipationQuestId>
) => {
  const { userId, questId } = opts;
  const { progress, definition } = await getQuest(opts);

  onQuestCompletable(progress, async () => {
    const state = parseRaffleParticipationState({
      entered: now().getTime(),
    });
    const expiresAt = createExpirationDate(definition.frequency);
    const status = 'COMPLETED';

    await opts.db.questProgress.upsert({
      where: {
        userId_questId: {
          userId,
          questId,
        },
      },
      create: {
        userId,
        questId,
        expiresAt,
        status,
        state,
      },
      update: {
        expiresAt,
        status,
        state,
      },
    });
    await opts.inventory.increment(opts.userId, '1', definition.reward);
    await opts.notifications.send('quest-completed', {
      userId: opts.userId,
      quest: definition,
    });
  });
};

export const trackAddFriendProgress = async (
  opts: TrackProgressOpts<AddFriendQuestId>
) => {
  const { userId, questId, input } = opts;
  const { progress, definition } = await getQuest(opts);

  // if they haven't started add the first friend and reward them
  if (!progress) {
    await opts.db.questProgress.create({
      data: {
        userId,
        questId,
        status: 'ACTIVE',
        state: { friends: [input.userId] },
      },
    });

    await opts.inventory.increment(opts.userId, '1', definition.reward);
    return;
  }

  // if they've started, check if they've added that friend already
  const state = parseAddFriendState(progress.state);
  if (state.friends.includes(input.userId)) {
    return;
  }

  // if they haven't added that friend, add them and reward them
  await opts.db.questProgress.update({
    where: {
      userId_questId: {
        userId,
        questId,
      },
    },
    data: {
      state: {
        friends: [...state.friends, input.userId],
      },
    },
  });

  await opts.inventory.increment(opts.userId, '1', definition.reward);
};

export const trackAddReferralProgress = async (
  opts: TrackProgressOpts<AddReferralQuestId>
) => {
  const { userId, questId, input } = opts;
  const { progress, definition } = await getQuest(opts);

  // if they haven't started add the first friend and reward them
  if (!progress) {
    await opts.db.questProgress.create({
      data: {
        userId,
        questId,
        status: 'ACTIVE',
        state: { referrals: [input.userId] },
      },
    });

    await opts.inventory.increment(opts.userId, '1', definition.reward);
    return;
  }

  // if they've started, check if they've added that friend already
  const state = parseAddReferralState(progress.state);
  if (state.referrals.includes(input.userId)) {
    console.warn('User has already referred this friend before', opts);
    return;
  }

  // if they haven't added that friend, add them and reward them
  await opts.db.questProgress.update({
    where: {
      userId_questId: {
        userId,
        questId,
      },
    },
    data: {
      state: {
        referrals: [...state.referrals, input.userId],
      },
    },
  });

  await opts.inventory.increment(opts.userId, '1', definition.reward);
};

export const trackReferralPlayMinutesProgress = async (
  opts: TrackProgressOpts<ReferralPlayMinutesQuestId>
) => {
  const { userId, questId, input } = opts;
  const definition = getDefinition(opts.questId);

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

  const progress = await opts.db.questProgress.findFirst({
    where: {
      userId: user.referredBy.id,
      questId,
    },
  });

  if (!progress) {
    await opts.db.questProgress.create({
      data: {
        userId: user.referredBy.id,
        questId,
        status: 'ACTIVE',
        state: { duration: input.increment },
      },
    });

    return;
  } else {
    const state = parsePlayMinutesState(progress.state);
    await opts.db.questProgress.update({
      where: {
        id: progress.id,
      },
      data: {
        state: {
          duration: Math.floor(state.duration + input.increment),
        },
      },
    });
    const completions = calculateCompletionsFromPlayTime(
      state.duration,
      input.increment,
      definition.data.requirement
    );
    if (completions > 0) {
      await opts.inventory.increment(
        opts.userId,
        '1',
        definition.reward * completions
      );
    }
  }
};

export const trackFriendPlayMinutesProgress = async (
  opts: TrackProgressOpts<FriendPlayMinutesQuestId>
) => {
  const { userId, questId, input } = opts;
  const definition = getDefinition(questId);

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
      const progress = await opts.db.questProgress.findFirst({
        where: {
          userId: friend.friendId,
          questId,
        },
      });

      if (!progress) {
        await opts.db.questProgress.create({
          data: {
            userId: friend.friendId,
            questId,
            status: 'ACTIVE',
            state: { duration: input.increment },
          },
        });

        return;
      } else {
        const state = parsePlayMinutesState(progress.state);

        await opts.db.questProgress.update({
          where: {
            id: progress.id,
          },
          data: {
            state: {
              duration: Math.floor(state.duration + input.increment),
            },
          },
        });

        const completions = calculateCompletionsFromPlayTime(
          state.duration,
          input.increment,
          definition.data.requirement
        );

        if (completions > 0) {
          await opts.inventory.increment(
            opts.userId,
            '1',
            definition.reward * completions
          );
        }
      }
    })
  );
};

export const trackPlayMinutesProgress = async (
  opts: TrackProgressOpts<PlayMinutesQuestId>
) => {
  const { userId, questId, input } = opts;
  const { progress, definition } = await getQuest(opts);

  if (!progress) {
    await opts.db.questProgress.create({
      data: {
        userId,
        questId,
        status: 'ACTIVE',
        state: { duration: input.increment },
      },
    });

    return;
  } else {
    const state = parsePlayMinutesState(progress.state);
    await opts.db.questProgress.update({
      where: {
        id: progress.id,
      },
      data: {
        state: {
          duration: Math.floor(state.duration + input.increment),
        },
      },
    });
    const completions = calculateCompletionsFromPlayTime(
      state.duration,
      input.increment,
      definition.data.requirement
    );
    if (completions > 0) {
      await opts.inventory.increment(
        opts.userId,
        '1',
        definition.reward * completions
      );
    }
  }
};

const onQuestCompletable = async (
  quest: Pick<QuestProgress, 'expiresAt' | 'status'> | null,
  fn: () => Promise<void>
) => {
  if (quest && quest.status === 'COMPLETED' && !isExpired(quest.expiresAt))
    return;

  await fn();
};

// TODO: it might be possible to automatically coerce the return type to the correct quest type.
const getQuest = async <T extends QuestId>({
  db,
  questId,
  userId,
}: {
  db: PrismaClient | PrismaTransactionalClient;
  questId: T;
  userId: string;
}): Promise<{
  progress: QuestProgress | null;
  definition: Quests[T];
}> => {
  return {
    progress: await db.questProgress.findFirst({
      where: {
        userId,
        questId,
      },
    }),
    definition: getDefinition(questId),
  };
};

const getDefinition = <T extends QuestId>(questId: T): Quests[T] => {
  const definition = QUESTS[questId];
  if (!definition)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Quest definition not found',
    });
  return definition;
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

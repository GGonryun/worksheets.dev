import { TRPCError } from '@trpc/server';
import { ItemId } from '@worksheets/data/items';
import {
  Prisma,
  PrismaClient,
  PrismaTransactionalClient,
  TaskStatus,
  TaskType,
} from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { RafflesService } from '@worksheets/services/raffles';
import {
  ActionSchema,
  calculateCompletions,
  parseRepetitions,
  parseStatus,
  QuestSchema,
  setExpirationDate,
} from '@worksheets/util/tasks';
import { isExpired } from '@worksheets/util/time';

export class TasksService {
  #db: PrismaClient | PrismaTransactionalClient;
  #inventory: InventoryService;
  #raffle: RafflesService;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
    this.#inventory = new InventoryService(db);
    this.#raffle = new RafflesService(db);
  }

  async listActions(opts: {
    raffleId: number;
    userId: string;
  }): Promise<ActionSchema[]> {
    const actions = await this.#db.raffleAction.findMany({
      where: {
        raffleId: opts.raffleId,
      },
      include: {
        task: true,
        progress: {
          where: {
            userId: opts.userId,
          },
        },
      },
    });

    const joined = actions.map((action) => {
      const p = action.progress?.at(0);
      return {
        actionId: action.id,
        order: action.order,
        name: action.name ?? action.task.name,
        description: action.description ?? action.task.description,
        taskId: action.taskId,
        category: action.task.category,
        frequency: action.task.frequency,
        type: action.task.type,
        data: action.task.data,
        gameId: action.task.gameId ?? null,
        repetitions: parseRepetitions(action.task.frequency, p),
        maxRepetitions: action.task.maxRepetitions,
        status: parseStatus(action.task.frequency, p),
        expiresAt: p?.expiresAt?.getTime() ?? -1,
        reward: action.reward,
      };
    });

    return joined
      .sort((a, b) => a.order - b.order)
      .sort((a, b) => {
        if (a.status === 'COMPLETED' && b.status !== 'COMPLETED') {
          // return whichever expires sooner
          return 1;
        } else if (a.status !== 'COMPLETED' && b.status === 'COMPLETED') {
          return -1;
        } else if (a.status === 'COMPLETED' && b.status === 'COMPLETED') {
          // sort by expiration date
          return b.expiresAt - a.expiresAt;
        } else {
          return 0;
        }
      });
  }

  async listQuests(opts: { userId: string }): Promise<QuestSchema[]> {
    const quests = await this.#db.platformQuest.findMany({
      include: {
        loot: {
          include: { item: true },
        },
        task: true,
        progress: {
          where: {
            userId: opts.userId,
          },
        },
      },
    });

    const joined = quests.map((quest) => {
      const p = quest.progress?.at(0);
      return {
        questId: quest.id,
        order: quest.order,
        name: quest.name ?? quest.task.name,
        description: quest.description ?? quest.task.description,
        taskId: quest.taskId,
        category: quest.task.category,
        frequency: quest.task.frequency,
        type: quest.task.type,
        gameId: quest.task.gameId ?? null,
        data: quest.task.data,
        repetitions: parseRepetitions(quest.task.frequency, p),
        maxRepetitions: quest.task.maxRepetitions,
        // Quests should only have one progress record, so we can safely take the first one if it exists.
        status: parseStatus(quest.task.frequency, p),
        // -1 is a sentinel value for no expiration
        expiresAt: p?.expiresAt?.getTime() ?? -1,
        loot: quest.loot,
      };
    });

    return joined
      .sort((a, b) => a.order - b.order)
      .sort((a, b) => {
        if (a.status === 'COMPLETED' && b.status !== 'COMPLETED') {
          // return whichever expires sooner
          return 1;
        } else if (a.status !== 'COMPLETED' && b.status === 'COMPLETED') {
          return -1;
        } else if (a.status === 'COMPLETED' && b.status === 'COMPLETED') {
          // sort by expiration date
          return a.expiresAt - b.expiresAt;
        } else {
          return 0;
        }
      });
  }

  async trackAction(opts: {
    actionId: string;
    userId: string;
    repetitions: number;
  }) {
    console.info(`Tracking action`, opts);
    const action = await this.#db.raffleAction.findFirst({
      where: {
        id: opts.actionId,
      },
      include: {
        task: true,
        progress: {
          where: {
            userId: opts.userId,
          },
        },
      },
    });
    if (!action) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Raffle action not found`,
        cause: `Action with id ${opts.actionId} does not exist in the database`,
      });
    }

    return await this.#trackAction({
      action,
      userId: opts.userId,
      repetitions: opts.repetitions,
    });
  }

  async #trackAction({
    action,
    userId,
    repetitions,
  }: {
    userId: string;
    repetitions: number;
    action: Prisma.RaffleActionGetPayload<{
      include: {
        task: true;
        progress: {
          where: {
            userId: string;
          };
        };
      };
    }>;
  }) {
    const progress = await this.#calculateProgress({
      task: action.task,
      // each quest should have at most one progress record per user.
      progress: action?.progress?.at(0),
      where: {
        userId: userId,
        actionId: action.id,
      },
      repetitions: repetitions,
    });

    console.debug(`Checking progress`, progress);
    if (progress && progress.completions > 0) {
      const reward = action.reward * progress.completions;
      console.debug(`Rewarding ${reward} entries`);
      await this.#rewardEntries({
        userId,
        raffleId: action.raffleId,
        reward,
      });
      return reward;
    }

    return 0;
  }

  async trackGameActions(opts: {
    type: Extract<TaskType, 'PLAY_GAME' | 'PLAY_MINUTES'>;
    gameId: string;
    userId: string;
    repetitions: number;
  }) {
    const { gameId, type, userId, repetitions } = opts;
    console.info(`Tracking game actions`, opts);
    // find every task that is associated with the game
    const actions = await this.#db.raffleAction.findMany({
      where: {
        // task is PLAY_GAME and gameId is either the game or null
        task: {
          type,
          OR: [
            {
              gameId: gameId,
            },
            {
              gameId: null,
            },
          ],
        },
        // and either the raffle is already published or it is active
        raffle: {
          OR: [
            {
              publishAt: {
                lte: new Date(),
              },
            },
            {
              status: 'ACTIVE',
            },
          ],
        },
      },
      include: {
        task: true,
        progress: {
          where: {
            userId,
          },
        },
      },
    });

    console.info(
      `Found ${actions.length} actions`,
      actions.map((a) => ({
        id: a.id,
        raffleId: a.raffleId,
        taskId: a.task.id,
        gameId: a.task.gameId,
      }))
    );
    Promise.all([
      actions.map((action) =>
        this.#trackAction({
          action,
          userId,
          repetitions,
        })
      ),
    ]);
  }

  async trackQuest(opts: {
    questId: string;
    userId: string;
    repetitions: number;
  }) {
    console.info(`Tracking quest`, opts);
    const quest = await this.#db.platformQuest.findFirst({
      where: {
        id: opts.questId,
      },
      include: {
        loot: {
          include: { item: true },
        },
        task: true,
        progress: {
          where: {
            userId: opts.userId,
          },
        },
      },
    });

    if (!quest) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Platform quest not found`,
        cause: `Quest with id ${opts.questId} does not exist in the database`,
      });
    }

    return await this.#trackQuest({
      ...opts,
      quest,
    });
  }
  async #trackQuest(opts: {
    quest: Prisma.PlatformQuestGetPayload<{
      include: {
        task: true;
        progress: true;
        loot: { include: { item: true } };
      };
    }>;
    userId: string;
    repetitions: number;
  }) {
    const { quest, userId, repetitions } = opts;
    const progress = await this.#calculateProgress({
      task: quest.task,
      // each quest should have at most one progress record per user.
      progress: quest?.progress?.at(0),
      where: {
        userId,
        questId: quest.id,
      },
      repetitions,
    });

    if (!progress) {
      console.info(`Quest with id ${quest.id} is already completed`);
      return;
    }

    // if the status is not being updated to completed, then we cannot award loot or send notifications.
    if (progress.status === 'COMPLETED') {
      await this.#sendNotification(userId, quest);
    }

    if (progress.completions > 0) {
      await this.#awardLoot(userId, quest.loot, progress.completions);
    }
  }

  async trackManyQuests({
    userId,
    questIds,
    repetitions,
  }: {
    userId: string;
    questIds: string[];
    repetitions: number;
  }) {
    for (const questId of questIds) {
      await this.trackQuest({
        questId,
        userId,
        repetitions,
      });
    }
  }

  async trackGameQuests(opts: {
    userId: string;
    gameId: string;
    type: Extract<TaskType, 'PLAY_GAME' | 'PLAY_MINUTES'>;
    repetitions: number;
  }) {
    console.info(`Tracking game quests`, opts);
    const { type, gameId, userId, repetitions } = opts;
    const quests = await this.#db.platformQuest.findMany({
      where: {
        // task is PLAY_GAME and gameId is either the game or null
        task: {
          type,
          OR: [
            {
              gameId: gameId,
            },
            {
              gameId: null,
            },
          ],
        },
      },
      include: {
        task: true,
        loot: {
          include: { item: true },
        },
        progress: {
          where: {
            userId,
          },
        },
      },
    });

    console.info(
      `Found ${quests.length} quests`,
      quests.map((q) => ({
        id: q.id,
        taskId: q.task.id,
        gameId: q.task.gameId,
      }))
    );

    Promise.all([
      quests.map((quest) =>
        this.#trackQuest({
          quest,
          userId,
          repetitions,
        })
      ),
    ]);
  }

  async #calculateProgress({
    task,
    progress,
    where,
    repetitions,
  }: {
    task: Prisma.TaskGetPayload<true>;
    progress: Prisma.TaskProgressGetPayload<true> | undefined;
    where:
      | { userId: string; actionId: string }
      | { userId: string; questId: string };
    repetitions: number;
  }) {
    if (progress && progress.status === 'COMPLETED') {
      // reset the progress if the quest is expired.
      // starting from a blank slate makes it easier to calculate modifications
      if (isExpired(progress.expiresAt)) {
        await this.#db.taskProgress.delete({
          where: joinClause(where),
        });

        progress = undefined;
      } else {
        // skip processing completed tasks
        return undefined;
      }
    }

    const currentRepetitions = progress?.repetitions ?? 0;

    const newRepetitions = currentRepetitions + repetitions;
    const metRequirement = newRepetitions >= task.maxRepetitions;
    const newStatus = metRequirement ? TaskStatus.COMPLETED : TaskStatus.ACTIVE;

    const expiresAt = setExpirationDate(task, progress);

    await this.#db.taskProgress.upsert({
      where: joinClause(where),
      create: {
        ...where,
        expiresAt,
        status: newStatus,
        repetitions,
      },
      update: {
        expiresAt,
        status: newStatus,
        repetitions: {
          increment: repetitions,
        },
      },
    });

    const completions = calculateCompletions(
      currentRepetitions,
      repetitions,
      task.maxRepetitions,
      task.requiredRepetitions
    );

    return {
      status: newStatus,
      completions,
    };
  }

  async #sendNotification(
    userId: string,
    quest: Prisma.PlatformQuestGetPayload<{
      include: { task: true; loot: { include: { item: true } } };
    }>
  ) {
    const notifications = new NotificationsService(this.#db);

    await notifications.send('quest-completed', {
      userId: userId,
      quest: {
        name: quest.task.name,
        loot: quest.loot,
      },
    });
  }

  async #awardLoot(
    userId: string,
    loot: Prisma.LootGetPayload<true>[],
    multiplier: number
  ) {
    await Promise.all(
      loot.map((l) =>
        this.#inventory.increment(
          userId,
          l.itemId as ItemId,
          l.quantity * multiplier
        )
      )
    );
  }

  async #rewardEntries({
    userId,
    raffleId,
    reward,
  }: {
    userId: string;
    raffleId: number;
    reward: number;
  }) {
    await this.#raffle.addEntries({
      userId,
      raffleId,
      entries: reward,
      bonus: true,
    });
  }
}

const joinClause = (
  where:
    | { userId: string; actionId: string }
    | { userId: string; questId: string }
) => {
  if ('actionId' in where) {
    return {
      userId_actionId: {
        userId: where.userId,
        actionId: where.actionId,
      },
    };
  } else {
    return {
      userId_questId: {
        userId: where.userId,
        questId: where.questId,
      },
    };
  }
};

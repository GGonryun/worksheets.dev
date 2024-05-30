import { TRPCError } from '@trpc/server';
import { DROP_LOTTERY, ItemId, ITEMS } from '@worksheets/data/items';
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
import { randomArrayElement, shuffle } from '@worksheets/util/arrays';
import { calculatePercentage, isLucky } from '@worksheets/util/numbers';
import { PLAY_MINUTE_DROP_CHANCE } from '@worksheets/util/settings';
import {
  ActionSchema,
  aggregateErrors,
  calculateCompletions,
  parseRepetitions,
  parseStatus,
  parseTaskPollData,
  parseTaskPollState,
  QuestSchema,
  setExpirationDate,
  TaskInputSchema,
  TaskPollResult,
  validateTask,
} from '@worksheets/util/tasks';
import { isExpired } from '@worksheets/util/time';

import { validateRequirements } from './util';

export class TasksService {
  #db: PrismaClient | PrismaTransactionalClient;
  #inventory: InventoryService;
  #notifications: NotificationsService;
  #raffle: RafflesService;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
    this.#inventory = new InventoryService(db);
    this.#raffle = new RafflesService(db);
    this.#notifications = new NotificationsService(db);
  }

  async getPollResults({
    taskId,
  }: {
    taskId: string;
  }): Promise<TaskPollResult[]> {
    const [task, progress] = await Promise.all([
      this.#db.task.findFirst({
        where: {
          id: taskId,
        },
      }),
      this.#db.taskProgress.findMany({
        where: {
          OR: [
            {
              quest: {
                taskId,
              },
            },
            {
              action: {
                taskId,
              },
            },
          ],
        },
        select: {
          state: true,
        },
      }),
    ]);

    // In order to compute a poll result:
    const poll = parseTaskPollData(task?.data);
    // answers are keys to the poll.
    // 1. we need to grab all the task progress for this specific task.
    const states = aggregateErrors(
      progress.map((p) => () => parseTaskPollState(poll, p.state))
    );
    const total = states.length;
    // 2. we need to count the number of times each option was selected.
    const counts = states.reduce((acc, state) => {
      acc[state.answer] = (acc[state.answer] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    // 3. we need to return an array of options with the label, key, and count.
    return poll.options.map((option) => ({
      key: option.key,
      label: option.label,
      count: counts[option.key] ?? 0,
      percent: calculatePercentage((counts[option.key] ?? 0) / total, 1),
    }));
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

    const requirements = actions.filter((action) => action.required);
    const complete = requirements.every((action) => {
      const p = action.progress?.at(0);
      return parseStatus(action.task.frequency, p) === 'COMPLETED';
    });

    const joined = actions.map((action) => {
      const p = action.progress?.at(0);
      return {
        actionId: action.id,
        order: action.order,
        name: action.name ?? action.task.name,
        required: action.required,
        locked: !action.required && !complete,
        description: action.description ?? action.task.description,
        taskId: action.taskId,
        category: action.task.category,
        frequency: action.task.frequency,
        type: action.task.type,
        data: action.task.data,
        gameId: action.task.gameId ?? null,
        createdAt: p?.createdAt?.getTime() ?? -1,
        state: p?.state ?? null,
        repetitions: parseRepetitions(p),
        maxRepetitions: action.task.maxRepetitions,
        status: parseStatus(action.task.frequency, p),
        expiresAt: p?.expiresAt?.getTime() ?? -1,
        reward: action.reward,
      };
    });

    return joined.sort((a, b) => a.order - b.order);
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
        state: p?.state ?? null,
        repetitions: parseRepetitions(p),
        createdAt: p?.createdAt?.getTime() ?? -1,
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

  async trackAction(
    opts: {
      actionId: string;
      userId: string;
    } & TaskInputSchema
  ) {
    console.info(`Tracking action`, opts);
    const action = await this.#db.raffleAction.findFirst({
      where: {
        id: opts.actionId,
      },
      include: {
        task: true,
        raffle: {
          include: {
            actions: {
              where: {
                required: true,
              },
              include: {
                task: true,
                progress: {
                  where: {
                    userId: opts.userId,
                  },
                },
              },
            },
          },
        },
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

    validateRequirements(action);

    return await this.#trackAction({
      action,
      ...opts,
    });
  }

  async #trackAction({
    action,
    userId,
    repetitions,
    state,
  }: {
    userId: string;
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
  } & TaskInputSchema) {
    const progress = await this.#calculateProgress({
      task: action.task,
      // each quest should have at most one progress record per user.
      progress: action?.progress?.at(0),
      where: {
        userId: userId,
        actionId: action.id,
      },
      repetitions,
      state,
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

  async trackQuest(
    opts: {
      questId: string;
      userId: string;
    } & TaskInputSchema
  ) {
    console.info(`Tracking quest`, opts);
    const quest = await this.#db.platformQuest.findFirst({
      where: {
        id: opts.questId,
      },
      include: {
        loot: {
          include: { item: true },
        },
        task: {
          include: {
            game: true,
          },
        },
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

  async #trackQuest(
    opts: {
      quest: Prisma.PlatformQuestGetPayload<{
        include: {
          task: true;
          progress: true;
          loot: { include: { item: true } };
        };
      }>;
      userId: string;
      game?: Prisma.GameGetPayload<true>;
    } & TaskInputSchema
  ) {
    const { quest, userId, repetitions, state, game } = opts;
    const progress = await this.#calculateProgress({
      task: quest.task,
      // each quest should have at most one progress record per user.
      progress: quest?.progress?.at(0),
      where: {
        userId,
        questId: quest.id,
      },
      repetitions,
      state,
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
      // TODO: make this scalable.
      await this.#bonusLoot(userId, quest.task, game);
    }
  }

  async #bonusLoot(
    userId: string,
    task: Prisma.TaskGetPayload<true>,
    game?: Prisma.GameGetPayload<true>
  ) {
    const { id } = task;
    if (id === 'PLAY_MINUTES_INFINITE') {
      if (!isLucky(PLAY_MINUTE_DROP_CHANCE)) {
        return;
      }

      const lottery = Object.entries(DROP_LOTTERY).flatMap(
        ([itemId, quantity]) => {
          return Array.from({ length: quantity }, () => itemId);
        }
      );

      const itemId = randomArrayElement(shuffle(lottery));
      console.info('Awarding bonus loot for infinite play minutes', {
        itemId,
        userId,
      });
      await this.#inventory.increment(userId, itemId as ItemId, 1);
      const item = ITEMS.find((i) => i.id === itemId);
      if (game && item) {
        const payload = {
          userId,
          item,
          game,
        };
        console.info('Sending notification for bonus loot', payload);
        await this.#notifications.send('found-item', payload);
      } else {
        console.info('Could not find item or game for bonus loot', {
          itemId,
          userId,
          item,
          game,
        });
      }
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
    const game = await this.#db.game.findFirstOrThrow({
      where: {
        id: gameId,
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
          game,
        })
      ),
    ]);
  }

  async #calculateProgress({
    task,
    progress,
    where,
    repetitions,
    state,
  }: {
    task: Prisma.TaskGetPayload<true>;
    progress: Prisma.TaskProgressGetPayload<true> | undefined;
    where:
      | { userId: string; actionId: string }
      | { userId: string; questId: string };
  } & TaskInputSchema) {
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

    validateTask({ type: task.type, data: task.data, state });

    await this.#db.taskProgress.upsert({
      where: joinClause(where),
      create: {
        ...where,
        expiresAt,
        status: newStatus,
        repetitions,
        state,
      },
      update: {
        expiresAt,
        status: newStatus,
        state,
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

import { TRPCError } from '@trpc/server';
import { ItemId } from '@worksheets/data/items';
import {
  Prisma,
  PrismaClient,
  PrismaTransactionalClient,
  TaskFrequency,
  TaskStatus,
  TaskType,
} from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { RafflesService } from '@worksheets/services/raffles';
import { convertReferralCode } from '@worksheets/services/referral';
import { calculatePercentage } from '@worksheets/util/numbers';
import {
  ActionSchema,
  aggregateErrors,
  calculateCompletions,
  parseExpiration,
  parseTaskPollData,
  parseTaskPollState,
  QuestSchema,
  TaskInputSchema,
  TaskPollResult,
  validateTaskInput,
} from '@worksheets/util/tasks';
import { TaskProgress } from '@worksheets/util/types';
import { pick } from 'lodash';

import { validateRequirements } from './util';

export class TasksService {
  #db: PrismaClient | PrismaTransactionalClient;
  #inventory: InventoryService;
  #raffle: RafflesService;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
    this.#inventory = new InventoryService(db);
    this.#raffle = new RafflesService(db);
  }

  async destroyExpiredTasks(frequency: TaskFrequency) {
    const result = await this.#db.taskProgress.deleteMany({
      where: {
        OR: [
          {
            quest: {
              task: {
                frequency,
              },
            },
          },
          {
            action: {
              task: {
                frequency,
              },
            },
          },
        ],
      },
    });

    console.info(
      `Destroyed ${result.count} expired ${frequency} notifications`
    );
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
    const complete = requirements.every(
      (action) => action.progress?.at(0)?.status === 'COMPLETED'
    );

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
        raffleId: action.raffleId,
        gameId: action.task.gameId ?? null,
        createdAt: p?.createdAt?.getTime() ?? null,
        state: p?.state ?? null,
        repetitions: p?.repetitions ?? 0,
        maxRepetitions: action.task.maxRepetitions,
        status: p?.status ?? 'PENDING',
        reward: action.reward,
        expiresAt: parseExpiration(action.task.frequency)?.getTime() ?? null,
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
      // Quests should only have one progress record, so we can safely take
      // the first one if it exists.
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
        raffleId: null,
        state: p?.state ?? null,
        repetitions: p?.repetitions ?? 0,
        createdAt: p?.createdAt?.getTime() ?? null,
        maxRepetitions: quest.task.maxRepetitions,
        status: p?.status ?? 'PENDING',
        expiresAt: parseExpiration(quest.task.frequency)?.getTime() ?? null,
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
          if (a.expiresAt && b.expiresAt) {
            return a.expiresAt - b.expiresAt;
            // completed infinite quests go to the bottom
          } else if (a.expiresAt) {
            return -1;
          } else {
            return 1;
          }
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

    const reward = await this.#trackAction({
      action,
      ...opts,
    });

    return { reward, raffleId: action.raffleId };
  }

  /**
   * @returns undefined, or the number of entries rewarded.
   * when undefined, the action was not tracked most likely because the requirements were not met.
   * when 0, the action was tracked but not completed.
   * when > 0, the action was tracked and completed, and the user was rewarded some number of entries.
   */
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
        raffle: {
          include: {
            actions: {
              where: {
                required: true;
              };
              include: {
                task: true;
                progress: true;
              };
            };
          };
        };
        progress: {
          where: {
            userId: string;
          };
        };
      };
    }>;
  } & TaskInputSchema) {
    if (!validateRequirements(action)) {
      return undefined;
    }

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

    console.debug(
      `Checking progress`,
      pick(progress ?? {}, ['id', 'status', 'completions'])
    );
    if (progress && progress.completions > 0) {
      const reward = action.reward * progress.completions;
      console.debug(`Rewarding ${reward} entries`);
      await this.#raffle.addEntries({
        userId,
        raffleId: action.raffleId,
        entries: reward,
        bonus: true,
      });
      return reward;
    }

    return 0;
  }

  async trackActions(opts: {
    userId: string;
    repetitions: number;
    where: Prisma.RaffleActionWhereInput;
    state?: unknown;
  }) {
    const { state, where, userId, repetitions } = opts;
    console.info(`Tracking actions`, opts);

    // find every task that is associated with the game
    const actions = await this.#db.raffleAction.findMany({
      where,
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
                    userId,
                  },
                },
              },
            },
          },
        },
        progress: {
          where: {
            userId,
          },
        },
      },
    });

    console.info(
      `Found ${actions.length} actions`,
      actions.map((a) => a.id)
    );

    for (const action of actions) {
      await this.#trackAction({
        action,
        repetitions,
        userId,
        state,
      });
    }
  }

  async trackReferralAction(opts: {
    userId: string;
    raffleId: number;
    referralCode: string;
  }) {
    console.info(`Tracking referral action`, opts);
    // make sure the referrer code is valid
    const referrer = await convertReferralCode({
      db: this.#db,
      code: opts.referralCode,
    });

    // if no referral code is found, then we can skip tracking.
    if (!referrer) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Referrer does not exist',
      });
    }

    // users cannot refer themselves, this can happen if a user visits their own referral link.
    if (referrer.user.id === opts.userId) {
      console.info(
        `Referrer and user are the same. Skipping referral action tracking`,
        opts
      );
      return;
    }

    // find the referral action associated with the action being performed.
    // there should never be more than one referral action associated with a raffle.
    const action = await this.#db.raffleAction.findFirst({
      where: {
        task: {
          type: TaskType.REFERRAL_TASK,
        },
        raffle: {
          id: opts.raffleId,
          publishAt: {
            lte: new Date(),
          },
          expiresAt: {
            gte: new Date(),
          },
        },
      },
      include: {
        task: true,
        raffle: {
          include: {
            referralActions: {
              where: {
                referredId: opts.userId,
                raffleId: opts.raffleId,
              },
            },
            actions: {
              where: {
                required: true,
              },
              include: {
                task: true,
                progress: {
                  where: {
                    userId: referrer.user.id,
                  },
                },
              },
            },
          },
        },
        progress: {
          where: {
            userId: referrer.user.id,
          },
        },
      },
    });

    // if there is no relevant referral action, then we can skip tracking.
    if (!action) {
      console.info(`No referral action found for this raffle`, opts);
      return;
    }

    // if the referrer has already completed the referral action, then we can skip tracking.
    if (action.raffle.referralActions.length > 0) {
      console.info(
        `Referrer has already completed referral action for this raffle`,
        opts
      );
      return;
    }

    // otherwise, the referral is fresh and we can track it.
    const rewarded = await this.#trackAction({
      action,
      repetitions: 1,
      userId: referrer.user.id,
    });

    // if the referrer was rewarded, then we can create a referral action record.
    // an undefined reward means the action did not meet the requirements so it was not tracked.
    // a reward of 0 means the action was tracked but not completed, these still count as referrals.
    if (rewarded == null) {
      console.info(`Referral action was skipped, no tracking occurred`, opts);
      return;
    }

    await this.#db.referralAction.create({
      data: {
        referredId: opts.userId,
        referrerId: referrer.user.id,
        raffleId: opts.raffleId,
      },
    });
    console.info(`Referral action was tracked`, opts);
  }

  async trackGameActions(opts: {
    type: Extract<TaskType, 'PLAY_GAME' | 'PLAY_MINUTES'>;
    gameId: string;
    userId: string;
    repetitions: number;
  }) {
    console.info(`Tracking game actions`, opts);
    await this.trackActions({
      where: {
        task: {
          type: opts.type,
          OR: [
            {
              gameId: opts.gameId,
            },
            {
              gameId: null,
            },
          ],
        },
        raffle: {
          publishAt: {
            lte: new Date(),
          },
          expiresAt: {
            gte: new Date(),
          },
        },
      },
      repetitions: opts.repetitions,
      userId: opts.userId,
    });
  }

  async trackQuest(
    opts: {
      questId: string;
      userId: string;
    } & TaskInputSchema
  ): Promise<TaskProgress | undefined> {
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
  ): Promise<TaskProgress | undefined> {
    const { quest, userId, repetitions, state } = opts;
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
      console.info(`Quest with id ${quest.id} was not tracked`);
      return;
    }

    // if the status is not being updated to completed, then we cannot award loot or send notifications.
    if (progress.status === 'COMPLETED') {
      await this.#sendNotification(userId, quest);
    }

    if (progress.completions > 0) {
      await this.#awardLoot(userId, quest.loot, progress.completions);
    }

    return progress;
  }

  async trackQuests(opts: {
    userId: string;
    repetitions: number;
    where: Prisma.PlatformQuestWhereInput;
    state?: unknown;
  }): Promise<TaskProgress[]> {
    const { state, where, userId, repetitions } = opts;
    console.info(`Tracking quests`, opts);

    const quests = await this.#db.platformQuest.findMany({
      where,
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

    console.info(
      `Found ${quests.length} quests`,
      quests.map((q) => q.id)
    );

    const progress: TaskProgress[] = [];
    // TODO: using Promise.all sometimes breaks transactions, so we need to await each one separately.
    for (const quest of quests) {
      const p = await this.#trackQuest({
        quest,
        repetitions,
        userId,
        state,
      });

      if (p) progress.push(p);
    }

    return progress;
  }

  async trackGameQuests(opts: {
    userId: string;
    gameId: string;
    type: Extract<TaskType, 'PLAY_GAME' | 'PLAY_MINUTES'>;
    repetitions: number;
  }): Promise<TaskProgress[]> {
    console.info(`Tracking game quests`, opts);
    const { type, gameId, userId, repetitions } = opts;
    return await this.trackQuests({
      userId,
      repetitions,
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
    });
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
  } & TaskInputSchema): Promise<TaskProgress | undefined> {
    if (progress && progress.status === 'COMPLETED') {
      // skip processing completed tasks
      return undefined;
    }

    const currentRepetitions = progress?.repetitions ?? 0;

    const newRepetitions = currentRepetitions + repetitions;
    const metRequirement = newRepetitions >= task.maxRepetitions;
    const newStatus = metRequirement ? TaskStatus.COMPLETED : TaskStatus.ACTIVE;

    const { skip, state: newState } = validateTaskInput({
      task,
      progress,
      state,
    });

    if (skip) {
      console.info(`Skipping task because validation failed`, {
        state,
        id: task.id,
        where,
      });
      return undefined;
    }

    const updated = await this.#db.taskProgress.upsert({
      where: joinClause(where),
      create: {
        ...where,
        status: newStatus,
        state: newState,
        repetitions,
      },
      update: {
        status: newStatus,
        state: newState,
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
      ...updated,
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
        name: quest.name ?? quest.task.name,
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

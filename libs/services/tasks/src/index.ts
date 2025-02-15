import { TRPCError } from '@trpc/server';
import {
  Prisma,
  PrismaClient,
  PrismaTransactionalClient,
  TaskFrequency,
  TaskStatus,
  TaskType,
} from '@worksheets/prisma';
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
  TaskInputSchema,
  TaskPollResult,
  validateTaskInput,
} from '@worksheets/util/tasks';
import { TaskProgress } from '@worksheets/util/types';
import { pick } from 'lodash';

import { validateRequirements } from './util';

export class TasksService {
  #db: PrismaClient | PrismaTransactionalClient;
  #raffle: RafflesService;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
    this.#raffle = new RafflesService(db);
  }

  async destroyExpiredTasks(frequency: TaskFrequency) {
    const result = await this.#db.taskProgress.deleteMany({
      where: {
        action: {
          task: {
            frequency,
          },
        },
      },
    });

    console.info(`Destroyed ${result.count} expired ${frequency} tasks`);
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
          action: {
            taskId,
          },
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
    console.info(`Tracking ${opts.userId} user actions`);

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
    type: Extract<
      TaskType,
      'PLAY_GAME' | 'PLAY_MINUTES' | 'SUBMIT_LEADERBOARD_SCORE'
    >;
    gameId: string;
    userId: string;
    repetitions: number;
    state?: unknown;
  }) {
    console.info(
      `Tracking user ${opts.userId} ${opts.type} game ${opts.gameId} actions with ${opts.repetitions} repetitions`
    );

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
      state: opts.state,
      repetitions: opts.repetitions,
      userId: opts.userId,
    });
  }

  async trackLeaderboardAction(opts: {
    gameId: string;
    userId: string;
    score: number;
  }) {
    console.info(
      `Tracking user ${opts.userId} leaderboard score for game ${opts.gameId} with score ${opts.score}`
    );

    await this.trackActions({
      where: {
        task: {
          type: 'SUBMIT_LEADERBOARD_SCORE',
          gameId: opts.gameId,
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
      state: { score: opts.score },
      repetitions: 1,
      userId: opts.userId,
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
    where: { userId: string; actionId: string };
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
      where: {
        userId_actionId: {
          userId: where.userId,
          actionId: where.actionId,
        },
      },
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
}

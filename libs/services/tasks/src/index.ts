import { TRPCError } from '@trpc/server';
import { ItemId } from '@worksheets/data/items';
import {
  Prisma,
  PrismaClient,
  PrismaTransactionalClient,
  TaskStatus,
} from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { RafflesService } from '@worksheets/services/raffles';
import {
  ActionSchema,
  calculateCompletions,
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
        name: action.task.name,
        description: action.task.description,
        taskId: action.taskId,
        category: action.task.category,
        frequency: action.task.frequency,
        type: action.task.type,
        data: action.task.data,
        repetitions: p?.repetitions ?? 0,
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
        data: quest.task.data,
        repetitions: p?.repetitions ?? 0,
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

    const progress = await this.#calculateProgress({
      task: action.task,
      // each quest should have at most one progress record per user.
      progress: action?.progress?.at(0),
      where: {
        userId: opts.userId,
        actionId: opts.actionId,
      },
      repetitions: opts.repetitions,
    });

    console.debug(`Checking progress`, progress);
    if (progress && progress.completions > 0) {
      const reward = action.reward * progress.completions;
      console.debug(`Rewarding ${reward} entries`);
      await this.#rewardEntries({
        userId: opts.userId,
        raffleId: action.raffleId,
        reward,
      });
      return reward;
    }

    return 0;
  }

  async trackQuest(opts: {
    questId: string;
    userId: string;
    repetitions: number;
  }) {
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

    const progress = await this.#calculateProgress({
      task: quest.task,
      // each quest should have at most one progress record per user.
      progress: quest?.progress?.at(0),
      where: {
        userId: opts.userId,
        questId: opts.questId,
      },
      repetitions: opts.repetitions,
    });

    if (!progress) {
      console.info(`Quest with id ${opts.questId} is already completed`);
      return;
    }

    // if the status is not being updated to completed, then we cannot award loot or send notifications.
    if (progress.status === 'COMPLETED') {
      await this.#sendNotification(opts.userId, quest);
    }

    if (progress.completions > 0) {
      await this.#awardLoot(opts.userId, quest.loot, progress.completions);
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

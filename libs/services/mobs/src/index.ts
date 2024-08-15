import { TRPCError } from '@trpc/server';
import { ItemId } from '@worksheets/data/items';
import { MOBS } from '@worksheets/data/mobs';
import {
  MvpReason,
  PrismaClient,
  PrismaTransactionalClient,
} from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import {
  arrayFromNumber,
  randomArrayElement,
  weightedPick,
} from '@worksheets/util/arrays';
import { startBackgroundJob } from '@worksheets/util/jobs';
import { STRIKES_PER_ATTACK } from '@worksheets/util/settings';
import { grammaticalJoin } from '@worksheets/util/strings';
import {
  BattleFiltersSchema,
  BattleParticipationSchema,
  BattleSchema,
  calculateCombatDamage,
  countItems,
  LootSchema,
  MOB_ELEMENT_RESISTANCES,
  MVP_EXTENDED_REASON_LABEL,
} from '@worksheets/util/types';
import pluralize from 'pluralize';

import { BasicParticipationProps, ExpiredBattleProps } from './props';
import { mobOrder } from './util';

export type StrikeInput = {
  user: {
    username: string;
    id: string;
  };
  battleId: number;
  items: Record<string, number>;
};

export type ProcessedExpiredBattleOutput = {
  battle: ExpiredBattleProps;
  exp: Record<string, number>;
  mvp: { reason: MvpReason; participant: BasicParticipationProps };
  winners: BasicParticipationProps[];
  losers: BasicParticipationProps[];
};

export class MobsService {
  #db: PrismaClient | PrismaTransactionalClient;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
  }

  async spawnMonster() {
    const activeBattles = await this.#db.battle.findMany({
      where: {
        status: 'ACTIVE',
        health: {
          gt: 0,
        },
      },
    });

    // only pick a unique mob that is not currently in an active battle.
    const monster = randomArrayElement(
      MOBS.filter((m) => !activeBattles.map((a) => a.mobId).includes(m.id))
    );

    const battle = await this.#db.battle.create({
      data: {
        mobId: monster.id,
        status: 'ACTIVE',
        health: monster.maxHp,
      },
    });

    return {
      battleId: battle.id,
      mobName: monster.name,
      type: monster.type,
      loot: monster.loot.reduce((a, l) => a + l.quantity, 0),
    };
  }

  async find(battleId: number): Promise<BattleSchema> {
    const battle = await this.#db.battle.findFirst({
      where: {
        id: battleId,
      },
      include: {
        mob: {
          include: {
            loot: {
              include: {
                item: true,
              },
            },
          },
        },
      },
    });

    if (!battle) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Battle not found',
      });
    }

    return battle;
  }

  async list(filters?: BattleFiltersSchema): Promise<BattleSchema[]> {
    const battles = await this.#db.battle.findMany({
      where: {
        status: {
          in: filters?.status,
        },
        mob: {
          id: filters?.monsterId,
          name: {
            contains: filters?.search,
            mode: 'insensitive',
          },
        },
      },
      orderBy: filters ? mobOrder(filters) : undefined,
      include: {
        mob: {
          include: {
            loot: {
              include: {
                item: true,
              },
            },
          },
        },
      },
    });

    return battles;
  }

  async participation(battleId: number): Promise<BattleParticipationSchema[]> {
    const participation = await this.#db.battleParticipation.findMany({
      where: {
        battleId,
      },
      orderBy: {
        damage: 'desc',
      },
      select: {
        id: true,
        damage: true,
        strikes: true,
        mvp: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return participation.map((p) => ({
      id: p.id,
      user: p.user,
      damage: p.damage,
      strikes: p.strikes,
      mvp: p.mvp,
    }));
  }

  async logs(battleId: number) {
    return this.#db.battleLogs.findMany({
      where: {
        battleId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async strike(opts: StrikeInput) {
    const { user, battleId, items } = opts;
    console.info('User is striking a mob', opts);
    const userId = user.id;

    const itemCount = countItems(items);
    const strikes = STRIKES_PER_ATTACK * itemCount;
    if (itemCount < 1) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'You must use at least one item to attack',
      });
    }

    const battle = await this.#db.battle.findFirst({
      where: {
        id: battleId,
        status: 'ACTIVE',
      },
      select: {
        health: true,
        mob: {
          include: {
            loot: {
              include: {
                item: true,
              },
            },
          },
        },
      },
    });

    if (!battle) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Battle not found',
      });
    }

    // check if the mob already has 0 hp.
    if (battle.health <= 0) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Mob already defeated',
      });
    }

    const rawDamage = calculateCombatDamage(
      MOB_ELEMENT_RESISTANCES[battle.mob.element],
      items
    );

    const damage = Math.min(battle.health, rawDamage);
    if (damage <= 0) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'You must use at least one weapon to attack',
      });
    }

    const nonMvpLoot = battle.mob.loot.filter((l) => !l.mvp);
    const loots = calculateLoot(nonMvpLoot, battle.mob.defense, damage);

    console.info('Consuming weapons', { items });
    for (const [itemId, quantity] of Object.entries(items)) {
      console.info('Updating inventory', { itemId, quantity });

      const result = await this.#db.inventory.update({
        where: {
          itemId_userId: {
            userId,
            itemId,
          },
        },
        data: {
          quantity: {
            decrement: quantity,
          },
        },
      });

      if (result.quantity < 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Not enough items to use',
        });
      }
    }

    console.info('Awarding loot', { loots });
    const inventory = new InventoryService(this.#db);
    for (const loot of loots) {
      await inventory.increment(userId, loot.item.id as ItemId, loot.quantity);
    }

    const combatExperience = damage * battle.mob.baseExp;
    console.info('Awarding experience', {
      damage,
      baseExp: battle.mob.baseExp,
      combatExperience,
    });
    await this.#db.user.update({
      where: {
        id: userId,
      },
      data: {
        experience: {
          increment: combatExperience,
        },
      },
    });

    console.info('Calculating damage', { items, damage });
    await this.#db.battleParticipation.upsert({
      where: {
        userId_battleId: {
          userId,
          battleId,
        },
      },
      create: {
        battleId,
        userId,
        damage,
        strikes,
        struckAt: new Date(),
      },
      update: {
        damage: {
          increment: damage,
        },
        strikes: {
          increment: strikes,
        },
        struckAt: new Date(),
      },
    });

    const lootMessage =
      loots.length > 0
        ? ` and found ${grammaticalJoin(
            loots.map(
              (l) => `${l.quantity} ${pluralize(l.item.name, l.quantity)}`
            )
          )}`
        : '';
    const rewardMessage = `attacked the ${battle.mob.name} for ${damage} damage${lootMessage}!`;
    const userMessage = `${user.username} ${rewardMessage}`;
    console.info('Logging strike', { userMessage });
    await this.#db.battleLogs.create({
      data: {
        battleId,
        message: userMessage,
      },
    });

    console.info('Updating mob health', { damage });
    await this.#db.battle.update({
      where: {
        id: battleId,
      },
      data: {
        health: {
          decrement: damage,
        },
      },
    });

    console.info('Processing battle participation', { userId, damage });
    startBackgroundJob('battle/participation', {
      userId,
      damage,
    });

    if (battle.health - damage <= 0) {
      console.info('Battle is complete', { battleId });
      startBackgroundJob('battle/completed', {
        battleId,
      });
    }

    return `You ${rewardMessage}`;
  }

  async processCompletedBattle(battleId: number) {
    const battle = await this.#db.battle.findFirst({
      where: {
        id: battleId,
        status: 'ACTIVE',
        health: {
          lte: 0,
        },
      },
      include: {
        mob: {
          include: {
            loot: {
              include: {
                item: true,
              },
            },
          },
        },
        participation: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!battle) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Battle not found',
      });
    }

    if (battle.status !== 'ACTIVE') {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Battle is not active',
      });
    }

    if (battle.health > 0) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Battle is not complete.',
      });
    }

    // 1. mark the battle as complete.
    await this.#db.battle.update({
      where: {
        id: battle.id,
      },
      data: {
        status: 'COMPLETE',
      },
    });

    // 2. pick an mvp.
    const mvp = determineMvp(battle.participation);
    await this.#db.battleParticipation.update({
      where: {
        userId_battleId: {
          userId: mvp.participant.user.id,
          battleId: battle.id,
        },
      },
      data: {
        mvp: mvp.reason,
      },
    });

    // 3. award the mvp loot.
    const mvpLoot = battle.mob.loot.filter((l) => l.mvp);
    const loot = weightedPick(
      mvpLoot,
      mvpLoot.map((l) => l.chance)
    );
    const inventory = new InventoryService(this.#db);
    await inventory.increment(
      mvp.participant.user.id,
      loot.itemId as ItemId,
      loot.quantity
    );

    // 4. save the battle record (but now no one can see who won loot)
    await this.#db.battleLogs.createMany({
      data: [
        {
          battleId: battle.id,
          message: `The battle against ${battle.mob.name} has ended!`,
        },
        {
          battleId: battle.id,
          message: `The MVP is ${mvp.participant.user.username} for ${
            MVP_EXTENDED_REASON_LABEL[mvp.reason]
          }! They have been awarded ${loot.quantity} ${pluralize(
            loot.item.name,
            loot.quantity
          )}.`,
        },
      ],
    });

    // 5. spawn a new monster.
    const spawned = await this.spawnMonster();

    return {
      mvp,
      battle,
      loot,
      spawned,
    };
  }
}

// TODO: support other modes of MVP selection.
const determineMvp = (
  participants: BasicParticipationProps[]
): ProcessedExpiredBattleOutput['mvp'] => {
  // the mvp user is the user who did the most damage
  const sortedByDamage = [...participants].sort((a, b) => b.damage - a.damage);
  const mostDamage = sortedByDamage[0];

  return { reason: MvpReason.MOST_DAMAGE, participant: mostDamage };
};

const calculateLoot = (
  options: LootSchema[],
  defense: number,
  damage: number
) => {
  const itemDrops = Math.floor(damage / defense);
  console.log('Searching for loot', { itemDrops });
  const loots = arrayFromNumber(itemDrops).reduce((i) => {
    const loot = weightedPick(
      options,
      options.map((l) => l.chance)
    );
    return [...i, loot];
  }, [] as LootSchema[]);
  // group loots by quantities.
  const groupedLoot = loots.reduce((a, loot) => {
    const existing = a.find((i) => i.item.id === loot.item.id);
    if (existing) {
      existing.quantity += loot.quantity;
    } else {
      a.push({ ...loot });
    }
    return a;
  }, [] as LootSchema[]);

  return groupedLoot;
};

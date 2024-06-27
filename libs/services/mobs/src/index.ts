import { TRPCError } from '@trpc/server';
import { ItemId } from '@worksheets/data/items';
import { MOBS } from '@worksheets/data/mobs';
import {
  MvpReason,
  Prisma,
  PrismaClient,
  PrismaTransactionalClient,
} from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { randomArrayElement, shuffle } from '@worksheets/util/arrays';
import { isLucky } from '@worksheets/util/numbers';
import { ENTRY_PER_DAMAGE } from '@worksheets/util/settings';
import {
  BattleFiltersSchema,
  BattleParticipationSchema,
  BattleSchema,
} from '@worksheets/util/types';
import { compact } from 'lodash';

import { BasicParticipationProps, ExpiredBattleProps } from './props';
import { mobOrder } from './util';

export type StrikeInput = {
  userId: string;
  battleId: number;
  damage: number;
};

export type ProcessedExpiredBattleOutput = {
  battle: ExpiredBattleProps;
  // user ids -> exp points
  exp: Record<string, number>;
  mvp: { reason: MvpReason; participant: BasicParticipationProps };
  winners: BasicParticipationProps[];
  losers: BasicParticipationProps[];
};

export class MobsService {
  #db: PrismaClient | PrismaTransactionalClient;
  #maxBattles = 10;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
  }

  async spawnMonster() {
    const activeBattles = await this.#db.battle.count({
      where: {
        status: 'ACTIVE',
        health: {
          gt: 0,
        },
      },
    });

    if (activeBattles > this.#maxBattles) {
      console.info(`Too many active battles, not spawning a new monster.`);

      return undefined;
    }

    const monster = randomArrayElement(MOBS);

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

  async record(battleId: number) {
    const result = await this.#db.battleRecord.findFirst({
      where: {
        battleId,
      },
    });

    console.info('Battle result found', result);

    if (!result) {
      return null;
    }

    return {
      battleId: result.battleId,
      results: result.results as Record<string, Record<string, number>>,
      mvpId: result.mvpId,
      mvpReason: result.mvpReason,
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

  async findExpiredBattles() {
    return await this.#db.battle.findMany({
      take: 2, // TODO: This prevents us from processing too many battles at once. We should probably make this configurable.
      where: {
        status: 'ACTIVE',
        health: {
          lte: 0,
        },
      },
      include: {
        mob: {
          include: {
            loot: true,
          },
        },
        participation: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async processExpiredBattle(
    battle: Prisma.BattleGetPayload<{
      include: {
        mob: {
          include: {
            loot: true;
          };
        };
        participation: {
          include: {
            user: true;
          };
        };
      };
    }>
  ): Promise<ProcessedExpiredBattleOutput> {
    if (battle.status !== 'ACTIVE') {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Battle is not active',
      });
    }

    const inventory = new InventoryService(this.#db);
    // get all participants.
    const participants = battle.participation;
    console.info(
      `Processing battle ${battle.id} with ${participants.length} participants`
    );

    // calculate drops =
    const drops = calculateDrops(battle.mob.loot);
    console.info(
      `Calculated battle drops`,
      drops.map(({ itemId, mvp, quantity }) => ({ itemId, mvp, quantity }))
    );

    // determine the mvp user.
    const mvp = determineMvp(participants);
    console.info(`Determined MVP`, mvp);
    const winners = determineDistribution(mvp, participants, drops);
    console.info(`Determined winners`, winners);

    // finish the battle
    await this.#db.battle.update({
      where: {
        id: battle.id,
      },
      data: {
        status: 'COMPLETE',
      },
    });

    // distribute loot
    for (const [participationId, items] of Object.entries(winners)) {
      console.info(`Awarding loot to participant ${participationId}`, items);
      const participant = participants.find(
        (p) => p.id === parseInt(participationId)
      );

      if (!participant) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Participant not found',
          cause: `Participant with id ${participationId} not found in battle ${battle.id}, but we tried to award them loot.`,
        });
      }

      for (const [itemId, quantity] of Object.entries(items)) {
        console.info(`Awarding ${quantity} of item ${itemId} to participant`);
        await inventory.increment(
          participant.user.id,
          itemId as ItemId,
          quantity
        );
      }
    }

    await this.#db.battleRecord.create({
      data: {
        battleId: battle.id,
        results: winners,
        mvpId: mvp.participant.id,
        mvpReason: mvp.reason,
      },
    });

    return {
      battle,
      mvp,
      exp: determineExp(participants, mvp.participant.id, battle.mob),
      winners: compact(
        Object.keys(winners)
          .map((pid) => parseInt(pid))
          .filter((pid) => pid !== mvp.participant.id)
          .map((pid) => participants.find((p) => p.id === pid))
      ),
      losers: participants.filter(
        (p) => p.id !== mvp.participant.id && !winners[p.id]
      ),
    };
  }
}

const determineMvp = (
  participants: BasicParticipationProps[]
): ProcessedExpiredBattleOutput['mvp'] => {
  // the mvp user is either the user who:
  // - hit the mob the most
  const sortedByStrikes = [...participants].sort(
    (a, b) => b.strikes - a.strikes
  );
  const mostStrikes = sortedByStrikes[0];
  // - did the most damage
  const sortedByDamage = [...participants].sort((a, b) => b.damage - a.damage);
  const mostDamage = sortedByDamage[0];
  // - hit the mob last.
  const sortedByLastHit = [...participants].sort(
    (a, b) => b.struckAt.getTime() - a.struckAt.getTime()
  );
  const lastHit = sortedByLastHit[0];

  // TODO: extrapolate this somewhere else so we can audit it and share with the help article.
  // Most damage and last hit get 2/5 chance, most strikes gets 1/5 chance.
  const mvp = shuffle([
    MvpReason.LAST_HIT,
    MvpReason.LAST_HIT,
    MvpReason.MOST_DAMAGE,
    MvpReason.MOST_DAMAGE,
    MvpReason.MOST_STRIKES,
  ])[0];

  switch (mvp) {
    case MvpReason.LAST_HIT:
      return { reason: MvpReason.LAST_HIT, participant: lastHit };
    case MvpReason.MOST_DAMAGE:
      return { reason: MvpReason.MOST_DAMAGE, participant: mostDamage };
    case MvpReason.MOST_STRIKES:
      return { reason: MvpReason.MOST_STRIKES, participant: mostStrikes };
  }
};

const determineDistribution = (
  mvp: ProcessedExpiredBattleOutput['mvp'],
  participants: Prisma.BattleParticipationGetPayload<true>[],
  loots: Prisma.LootGetPayload<true>[]
  // participationIds -> <itemId -> quantity>
): Record<number, Record<string, number>> => {
  // make a flat map of all the possible loot drops.
  const allLoots = loots.flatMap((l) =>
    Array.from({ length: l.quantity }, () => ({ ...l, quantity: 1 }))
  );
  const winners: Record<number, Record<string, number>> = {};

  const group = participants.flatMap((p) =>
    Array.from({ length: Math.floor(p.damage / ENTRY_PER_DAMAGE) }, () => p)
  );

  // every participant gets at least one guaranteed entry.
  participants.forEach((p) => group.push(p));

  const shuffled = shuffle(group);
  for (const loot of allLoots) {
    const winner = loot.mvp
      ? mvp.participant
      : shuffled[Math.floor(Math.random() * shuffled.length)];

    if (!winners[winner.id]) {
      winners[winner.id] = {};
    }
    if (!winners[winner.id][loot.itemId]) {
      winners[winner.id][loot.itemId] = 0;
    }
    winners[winner.id][loot.itemId] += 1;
  }

  return winners;
};

const calculateDrops = (loot: Prisma.LootGetPayload<true>[]) => {
  return loot
    .map((l) => {
      const quantity = calculateQuantity(l.quantity, l.chance);
      return { ...l, quantity };
    })
    .filter((l) => l.quantity > 0);
};

const calculateQuantity = (max: number, chance: number) => {
  let quantity = 0;
  for (let i = 0; i < max; i++) {
    if (!isLucky(chance)) {
      continue;
    }
    quantity++;
  }
  return quantity;
};

const determineExp = (
  participants: Prisma.BattleParticipationGetPayload<true>[],
  mvpId: number,
  mob: { maxHp: number; baseExp: number; mvpExp: number }
) => {
  // each participant gets a % of exp equivalent to the damage they did.
  const record: Record<string, number> = {};
  for (const participant of participants) {
    const proportion = participant.damage / mob.maxHp;
    record[participant.userId] = Math.floor(proportion * mob.baseExp);
    if (participant.id === mvpId) {
      record[participant.userId] += mob.mvpExp;
    }
  }
  return record;
};

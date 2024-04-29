import { TRPCError } from '@trpc/server';
import { ItemId } from '@worksheets/data/items';
import {
  MvpReason,
  PrismaClient,
  PrismaTransactionalClient,
} from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { shuffle } from '@worksheets/util/arrays';
import { ENTRY_PER_DAMAGE } from '@worksheets/util/settings';
import {
  BattleFiltersSchema,
  BattleParticipationSchema,
  BattleSchema,
} from '@worksheets/util/types';

import {
  BASIC_PARTICIPATION_PROPS,
  BasicParticipationProps,
  EXPIRED_BATTLE_PROPS,
  ExpiredBattleProps,
} from './props';
import { mobOrder } from './util';

export type StrikeInput = {
  userId: string;
  battleId: number;
  damage: number;
};

export type ProcessedExpiredBattleOutput = {
  battle: ExpiredBattleProps;
  mvp: BasicParticipationProps;
  winners: BasicParticipationProps[];
  losers: BasicParticipationProps[];
};

export class MobsService {
  #db: PrismaClient | PrismaTransactionalClient;
  constructor(db: PrismaClient | PrismaTransactionalClient) {
    this.#db = db;
  }

  async publishAll() {
    const pending = await this.#db.battle.findMany({
      where: {
        status: 'PENDING',
        publishAt: {
          lte: new Date(),
        },
      },
      select: {
        id: true,
        mob: {
          select: {
            name: true,
            loot: {
              select: {
                itemId: true,
                quantity: true,
              },
            },
          },
        },
      },
    });

    if (pending.length === 0) {
      return [];
    }

    await this.#db.battle.updateMany({
      where: {
        id: {
          in: pending.map((b) => b.id),
        },
      },
      data: {
        status: 'ACTIVE',
      },
    });

    return pending.map((battle) => ({
      battleId: battle.id,
      mobName: battle.mob.name,
      loot: battle.mob.loot.reduce((a, l) => a + l.quantity, 0),
    }));
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
        isMvp: true,
        loot: {
          select: {
            chance: true,
            mvp: true,
            quantity: true,
            item: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
                type: true,
                description: true,
                sell: true,
              },
            },
          },
        },
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
      isMvp: p.isMvp,
      loot: p.loot,
    }));
  }

  async strike({ userId, battleId, damage }: StrikeInput): Promise<void> {
    const battle = await this.#db.battle.findFirst({
      where: {
        id: battleId,
        status: 'ACTIVE',
      },
      select: {
        damage: true,
        mob: {
          select: {
            id: true,
            maxHp: true,
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
    if (battle.damage >= battle.mob.maxHp) {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Mob already defeated',
      });
    }

    const maxDamage = Math.min(battle.mob.maxHp - battle.damage, damage);

    await this.#db.battle.update({
      where: {
        id: battleId,
      },
      data: {
        damage: battle.damage + maxDamage,
      },
    });

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
        strikes: 1,
        struckAt: new Date(),
      },
      update: {
        damage: {
          increment: maxDamage,
        },
        strikes: {
          increment: 1,
        },
        struckAt: new Date(),
      },
    });
  }

  // TODO: battle processing is inefficient.
  async processExpiredBattles(): Promise<ProcessedExpiredBattleOutput[]> {
    const activeBattles = await this.#db.battle.findMany({
      where: {
        status: 'ACTIVE',
      },
      select: EXPIRED_BATTLE_PROPS,
    });
    // find any battles that are "active" but the mob has 0 hp left.
    const expired = activeBattles.filter(
      (battle) => battle.damage >= battle.mob.maxHp
    );

    const results: ProcessedExpiredBattleOutput[] = [];
    for (const battle of expired) {
      const result = await this.#processExpiredBattle(battle);
      results.push(result);
    }

    return results;
  }

  async #processExpiredBattle(
    battle: ExpiredBattleProps
  ): Promise<ProcessedExpiredBattleOutput> {
    const inventory = new InventoryService(this.#db);
    // get all participants.
    const participants = await this.#db.battleParticipation.findMany({
      where: {
        battleId: battle.id,
      },
      select: BASIC_PARTICIPATION_PROPS,
    });

    // separate loot
    const mvpLoot = battle.mob.loot.filter((l) => l.mvp);
    const basicLoot = battle.mob.loot.filter((l) => !l.mvp);

    // determine the mvp user.
    const mvp = await this.#awardMvpLoot(mvpLoot, participants, inventory);

    // distributing remaining items.
    const winners = await this.#awardBasicLoot(
      basicLoot,
      participants,
      inventory
    );

    const losers = participants.filter(
      (p) => p.id !== mvp.id && !winners.some((w) => w.id === p.id)
    );

    if (battle.status !== 'ACTIVE') {
      throw new TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Battle is not active',
      });
    }

    await this.#db.battle.update({
      where: {
        id: battle.id,
      },
      data: {
        status: 'COMPLETE',
      },
    });

    return { battle, mvp, winners, losers };
  }

  async #awardMvpLoot(
    mvpLoot: ExpiredBattleProps['mob']['loot'],
    participants: BasicParticipationProps[],
    inventory: InventoryService
  ): Promise<BasicParticipationProps> {
    const mvp = await this.#determineMvp(participants);

    // award the mvp user with mvp loot.
    for (const loot of mvpLoot) {
      const quantity = calculateQuantity(loot.quantity, loot.chance);
      // if the quantity is 0, we don't award the item.
      if (!quantity) continue;

      await inventory.increment(
        mvp.participant.user.id,
        loot.itemId as ItemId,
        quantity
      );

      await this.#db.loot.create({
        data: {
          battleParticipationId: mvp.participant.id,
          chance: loot.chance,
          quantity,
          itemId: loot.itemId,
          mvp: true,
        },
      });
    }
    await this.#db.battleParticipation.update({
      where: {
        id: mvp.participant.id,
      },
      data: {
        isMvp: mvp.reason,
      },
    });

    return mvp.participant;
  }

  async #determineMvp(
    participants: BasicParticipationProps[]
  ): Promise<{ reason: MvpReason; participant: BasicParticipationProps }> {
    // the mvp user is either the user who:
    // - hit the mob the most
    const sortedByStrikes = [...participants].sort(
      (a, b) => b.strikes - a.strikes
    );
    const mostStrikes = sortedByStrikes[0];
    // - did the most damage
    const sortedByDamage = [...participants].sort(
      (a, b) => b.damage - a.damage
    );
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
  }

  async #awardBasicLoot(
    basicLoot: ExpiredBattleProps['mob']['loot'],
    participants: BasicParticipationProps[],
    inventory: InventoryService
  ): Promise<BasicParticipationProps[]> {
    const winners: Set<BasicParticipationProps> = new Set();
    // TODO: this brute force approach is not efficient. We should refactor this to be more efficient.
    // At worst every unique participant will get a loot. At best only one participant will get
    // a loot. In the best case scenario we still trigger a call to the database for every item won.
    // We can optimize this by grouping the loot by quantity won and then updating the database in
    // bulk.
    for (const loot of basicLoot) {
      // pick a random winner.
      for (let i = 0; i < loot.quantity; i++) {
        const luck = Math.random();
        if (luck > loot.chance) {
          continue;
        }

        const winner = await this.#determineWinner(participants);
        await inventory.increment(winner.user.id, loot.itemId as ItemId, 1);
        await this.#db.loot.upsert({
          where: {
            itemId_battleParticipationId: {
              battleParticipationId: winner.id,
              itemId: loot.itemId,
            },
          },
          update: {
            quantity: {
              increment: 1,
            },
          },
          create: {
            battleParticipationId: winner.id,
            chance: loot.chance,
            quantity: 1,
            itemId: loot.itemId,
          },
        });
        winners.add(winner);
      }
    }
    return Array.from(winners);
  }

  async #determineWinner(participants: BasicParticipationProps[]) {
    // every participant gets at least one guaranteed entry.
    const group = participants.flatMap((p) =>
      Array.from({ length: Math.round(p.damage / ENTRY_PER_DAMAGE) }, () => p)
    );
    participants.forEach((p) => group.push(p));
    return shuffle(group)[0];
  }
}

const calculateQuantity = (max: number, chance: number) => {
  let quantity = 0;
  for (let i = 0; i < max; i++) {
    const luck = Math.random();
    if (luck > chance) {
      continue;
    }
    quantity++;
  }
  return quantity;
};

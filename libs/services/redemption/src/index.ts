import { TRPCError } from '@trpc/server';
import { PrismaClient, PrizeType } from '@worksheets/prisma';
import { InventoryService } from '@worksheets/services/inventory';
import { assertNever } from '@worksheets/util/errors';

export type RedeemOptions = {
  userId: string;
  code: string;
};

export class RedemptionService {
  #db: PrismaClient;
  #inventory: InventoryService;
  constructor(db: PrismaClient) {
    this.#db = db;
    this.#inventory = new InventoryService(db);
  }

  redeemable(type: PrizeType) {
    switch (type) {
      case 'STEAM_KEY':
        return false;
      case 'LOOT':
        return true;
      default:
        throw assertNever(type);
    }
  }

  async redeem(opts: RedeemOptions) {
    const redemption = await this.#db.redemptionCode.findFirst({
      where: {
        id: opts.code,
      },
    });

    if (!redemption) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Redemption code does not exist',
      });
    }

    if (redemption.redeemedAt) {
      return false;
    }

    await this.#db.redemptionCode.update({
      where: {
        id: opts.code,
      },
      data: {
        redeemedAt: new Date(),
        ownerId: opts.userId,
      },
    });

    await this.#inventory.collect({
      userId: opts.userId,
      prizeId: redemption.prizeId,
    });

    return true;
  }
}

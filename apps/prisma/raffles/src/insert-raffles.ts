import { raffles, SeedableRaffle } from '@worksheets/data/raffles';
import { prisma } from '@worksheets/prisma';
import { getSeedingChanges, seedingProperties } from '@worksheets/util/seeding';
import { isExpired } from '@worksheets/util/time';

export const insertRaffles = async () => {
  const storedRaffles = await prisma.raffle.findMany({
    select: seedingProperties,
  });
  const { creating, updating } = getSeedingChanges(raffles, storedRaffles);

  await Promise.all([
    ...creating.map(createRaffle),
    ...updating.map(updateRaffle),
  ]);

  if (creating.length === 0 && updating.length === 0) {
    console.info(`No changes to raffles`);
  } else {
    console.info(`Inserted raffles`, {
      updated: updating.length,
      created: creating.length,
    });
  }
};

const createRaffle = async (raffle: SeedableRaffle) => {
  await prisma.$transaction(async (tx) => {
    const status = isExpired(raffle.expiresAt)
      ? 'COMPLETE'
      : isExpired(raffle.publishAt)
      ? 'ACTIVE'
      : 'PENDING';
    await tx.raffle.create({
      data: {
        id: raffle.id,
        version: raffle.version,
        status: status,
        expiresAt: raffle.expiresAt,
        publishAt: raffle.publishAt,
        numWinners: raffle.numWinners,
        item: {
          connect: {
            id: raffle.itemId,
          },
        },
        sponsor: {
          connect: {
            id: raffle.sponsorId,
          },
        },
      },
    });
  });
};

const updateRaffle = async (raffle: SeedableRaffle) => {
  const get = await prisma.raffle.findFirst({
    where: {
      id: raffle.id,
    },
  });

  if (!get || get.status !== 'ACTIVE') {
    throw new Error(`Raffle ${raffle.id} is not active and cannot be updated`);
  }

  await prisma.raffle.update({
    where: {
      id: raffle.id,
    },
    data: {
      version: raffle.version,
      expiresAt: raffle.expiresAt,
      numWinners: raffle.numWinners,
      itemId: raffle.itemId,
      sponsorId: raffle.sponsorId,
    },
  });
};

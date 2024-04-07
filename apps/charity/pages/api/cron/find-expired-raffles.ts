import { Prisma, prisma } from '@worksheets/prisma';
import { NotificationsService } from '@worksheets/services/notifications';
import { createCronJob } from '@worksheets/util/cron';

const EXPIRED_RAFFLE_PROPS = {
  id: true as const,
  expiresAt: true as const,
  numWinners: true as const,
  status: true as const,
  prize: {
    select: {
      id: true as const,
      name: true as const,
    },
  },
  participants: {
    select: {
      id: true as const,
      userId: true as const,
      numEntries: true as const,
    },
  },
};

type ExpiredRaffle = Prisma.RaffleGetPayload<{
  select: typeof EXPIRED_RAFFLE_PROPS;
}>;

type UnclaimedCode = Prisma.ActivationCodeGetPayload<{
  select: {
    id: true;
    winner: {
      select: {
        id: true;
      };
    };
  };
}>;

type RaffleWinner = {
  participationId: number;
  userId: string;
  codeId: string;
};

export default createCronJob(async () => {
  const expiredRaffles = await prisma.raffle.findMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
      status: {
        in: ['ACTIVE', 'REASSIGN'],
      },
    },
    select: EXPIRED_RAFFLE_PROPS,
  });

  console.info(`Found ${expiredRaffles.length} expired raffles.`);
  await Promise.all(expiredRaffles.map(processExpiredRaffle));
  console.info(`Finished processing ${expiredRaffles.length} expired raffles.`);
});

const notifications = new NotificationsService();

const processExpiredRaffle = async (raffle: ExpiredRaffle) => {
  try {
    await assignWinners(raffle);
    await notifications.send('raffle-expired', raffle);
  } catch (error) {
    console.error(`Failed to process raffle ${raffle.id}`, error);
  }
};

const assignWinners = async (raffle: ExpiredRaffle) => {
  if (raffle.participants.length === 0) {
    throw new Error('Raffle has no participants');
  }

  await prisma.$transaction(
    async (tx) => {
      const [unusedCodes, usedCodes] = await Promise.all([
        tx.activationCode.findMany({
          where: {
            raffleId: raffle.id,
            winner: null, // only select codes that have not been assigned a winner
          },
          select: {
            id: true,
            winner: {
              select: {
                id: true,
              },
            },
          },
        }),
        tx.activationCode.count({
          where: {
            raffleId: raffle.id,
            winner: {
              isNot: null,
            },
          },
        }),
      ]);

      const assignmentsRemaining = raffle.numWinners - usedCodes;

      // edge case: too many assignments made.
      if (assignmentsRemaining < 0) {
        throw Error(`Raffle has too many winners assigned`);
      }

      if (assignmentsRemaining > 0) {
        // edge case: insufficient assignments.
        if (
          unusedCodes.length < 1 ||
          assignmentsRemaining > unusedCodes.length
        ) {
          throw Error(`Raffle does not have enough codes to assign winners`);
        }

        const winners = await pickWinners(
          assignmentsRemaining,
          // the same user could win more than once.
          raffle.participants,
          unusedCodes
        );

        const raffleWinners = await Promise.all(
          winners.map((winner) => {
            return tx.raffleWinner.create({
              data: {
                raffleId: raffle.id,
                userId: winner.userId,
                participationId: winner.participationId,
                codeId: winner.codeId,
                prizeId: raffle.prize.id,
              },
              select: {
                id: true,
              },
            });
          })
        );

        await tx.claimAlert.createMany({
          data: raffleWinners.map((winner) => ({
            winnerId: winner.id,
          })),
        });
      }

      await tx.raffle.update({
        where: {
          id: raffle.id,
        },
        data: {
          status: 'WAITING',
        },
      });
    },
    {
      maxWait: 5000, // default: 2000
      timeout: 10000, // default: 5000
    }
  );
};

const pickWinners = async (
  numWinners: number,
  participants: ExpiredRaffle['participants'],
  codes: UnclaimedCode[]
): Promise<RaffleWinner[]> => {
  // create an in memory array of entries representing each participant
  const entries: ExpiredRaffle['participants'] = participants.flatMap(
    (participant) => Array(participant.numEntries).fill(participant)
  );

  // shuffle the entries and pick the winners
  const shuffled = entries.sort(() => Math.random() - 0.5);

  if (codes.length < numWinners) {
    throw new Error('There are not enough codes to assign to each winner');
  }

  // return the winners
  return shuffled.slice(0, numWinners).map((participant, i) => ({
    userId: participant.userId,
    participationId: participant.id,
    codeId: codes[i].id,
  }));
};

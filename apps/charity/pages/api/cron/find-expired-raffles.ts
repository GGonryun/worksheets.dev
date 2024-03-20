import { Prisma, prisma } from '@worksheets/prisma';
import { sendDiscordMessage } from '@worksheets/services/discord';
import { DISCORD_WEBHOOK_URL } from '@worksheets/services/environment';
import { TwitterService } from '@worksheets/services/twitter';
import { routes } from '@worksheets/ui/routes';
import { createCronJob } from '@worksheets/util/cron';
import { printShortDateTime } from '@worksheets/util/time';
import pluralize from 'pluralize';

const twitter = new TwitterService();

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

const processExpiredRaffle = async (raffle: ExpiredRaffle) => {
  try {
    await assignWinners(raffle);
    // TODO: notify on public channel.
    await notifyOnDiscord(raffle);
    await notifyOnTwitter(raffle);
  } catch (error) {
    // TODO: notify on admin channel.
    await notifyOnDiscord(raffle, error as Error);
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

const notifyOnDiscord = async (raffle: ExpiredRaffle, error?: Error) => {
  await sendDiscordMessage({
    content: error
      ? `We failed to process an expired raffle!`
      : `A raffle has expired and winners have been chosen successfully.`,
    embeds: [
      {
        title: `Raffle ID: ${raffle.id}`,
        url: routes.admin.raffle.url({
          params: {
            raffleId: raffle.id,
          },
        }),
        description: `This raffle ended at ${printShortDateTime(
          raffle.expiresAt
        )}.`,
        fields: error
          ? [
              {
                name: 'Error Message',
                value: error.message,
              },
            ]
          : [],
      },
    ],
    webhookUrl: DISCORD_WEBHOOK_URL,
  });
};

const notifyOnTwitter = async (raffle: ExpiredRaffle) => {
  await twitter.tweet(
    `🎉 A raffle for ${raffle.prize.name} has ended! 🎉\n\n${
      raffle.numWinners
    } ${pluralize('winner', raffle.numWinners)} was chosen out of ${
      raffle.participants.length
    } ${pluralize(
      'participant',
      raffle.participants.length
    )}. View results: ${routes.raffle.url({
      params: {
        raffleId: raffle.id,
      },
    })}`
  );
};

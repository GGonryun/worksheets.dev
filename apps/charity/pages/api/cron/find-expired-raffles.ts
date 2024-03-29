import { Prisma, prisma } from '@worksheets/prisma';
import { sendDiscordMessage } from '@worksheets/services/discord';
import {
  CRON_SECRET,
  DISCORD_WEBHOOK_URL,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
} from '@worksheets/services/environment';
import { postTweet } from '@worksheets/services/twitter';
import { routes } from '@worksheets/ui/routes';
import { printShortDateTime } from '@worksheets/util/time';
import { NextApiRequest, NextApiResponse } from 'next';

const EXPIRED_RAFFLE_PROPS = {
  id: true as const,
  expiresAt: true as const,
  numWinners: true as const,
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
      numTickets: true as const,
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

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const authHeader = request.headers['authorization'];

  // allow insecure requests in development
  if (IS_PRODUCTION) {
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return response.status(401).json({ success: false });
    }
  }

  const expiredRaffles = await prisma.raffle.findMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
      status: 'ACTIVE',
    },
    select: EXPIRED_RAFFLE_PROPS,
  });

  console.info(`Found ${expiredRaffles.length} expired raffles.`);
  await Promise.all(expiredRaffles.map(processExpiredRaffle));
  console.info(`Finished processing expired raffles.`);

  response.status(200).json({ success: true });
}

const processExpiredRaffle = async (raffle: ExpiredRaffle) => {
  try {
    await assignWinners(raffle);
    await notifyOnDiscord(raffle);
    await notifyOnTwitter(raffle);
  } catch (error) {
    await notifyOnDiscord(raffle, error as Error);
  }
};

const assignWinners = async (raffle: ExpiredRaffle) => {
  if (raffle.participants.length === 0) {
    throw new Error('Raffle has no participants');
  }

  await prisma.$transaction(
    async (tx) => {
      const codes = await prisma.activationCode.findMany({
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
      });

      if (codes.length < 1 || raffle.numWinners > codes.length) {
        throw new Error('Not enough codes to assign winners');
      }

      if (codes.some((code) => code.winner)) {
        throw new Error('Some codes already have winners');
      }

      const winners = await pickWinners(1, raffle.participants, codes);

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

      await prisma.raffle.update({
        where: {
          id: raffle.id,
        },
        data: {
          status: 'COMPLETE',
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
  // create an in memory array of tickets representing each participant
  const tickets = participants.flatMap((participant) =>
    Array(participant.numTickets).fill(participant)
  );

  // shuffle the tickets and pick the winners
  const shuffled = tickets.sort(() => Math.random() - 0.5);

  // return the winners
  return shuffled.slice(0, numWinners).map((participant, i) => ({
    userId: participant.userId,
    participationId: participant.id,
    codeId: codes[i].id,
  }));
};

const notifyOnDiscord = async (raffle: ExpiredRaffle, error?: Error) => {
  try {
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
  } catch (error) {
    console.warn('Failed to send discord message', error);
  }
};

const notifyOnTwitter = async (raffle: ExpiredRaffle) => {
  if (IS_DEVELOPMENT) {
    console.info('Skipping tweet in development');
    return;
  }

  try {
    await postTweet(
      `🎉 The raffle for ${
        raffle.prize.name
      } has ended! 🎉\n\nCheck out the winners here: ${routes.raffle.url({
        params: {
          raffleId: raffle.id,
        },
      })}`
    );
  } catch (error) {
    console.warn('Failed to send tweet', error);
  }
};

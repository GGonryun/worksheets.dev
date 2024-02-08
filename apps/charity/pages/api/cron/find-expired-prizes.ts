import { Prisma } from '@prisma/client';
import { sendDiscordMessage } from '@worksheets/services/discord';
import {
  CRON_SECRET,
  DISCORD_WEBHOOK_URL,
  IS_PRODUCTION,
} from '@worksheets/services/environment';
import { printShortDateTime } from '@worksheets/util/time';
import { NextApiRequest, NextApiResponse } from 'next';

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
      tickets: {
        none: {
          winner: {
            id: {},
          },
        },
      },
    },
    select: {
      id: true,
      expiresAt: true,
      numWinners: true,
      tickets: {
        select: {
          id: true,
          winner: true,
        },
      },
      prize: {
        select: {
          name: true,
        },
      },
    },
  });

  if (expiredRaffles.length === 0) {
    console.info('No expired raffles found.');
    return response.status(200).json({ success: true });
  } else {
    console.info('Expired Raffles found:', expiredRaffles);
    await sendMessage(expiredRaffles);
    console.info('Discord message sent.');
  }

  response.status(200).json({ success: true });
}

const sendMessage = async (
  raffles: Prisma.RaffleGetPayload<{
    select: {
      id: true;
      expiresAt: true;
      numWinners: true;
      tickets: {
        select: {
          id: true;
          winner: true;
        };
      };
    };
  }>[]
) => {
  // send a message to the discord channel with the winners and the prizes.
  await sendDiscordMessage({
    content: `The following prizes as of ${printShortDateTime(
      Date.now()
    )} have expired and have not been assigned winners:`,
    embeds: raffles.map((raffle) => ({
      title: `Raffle #${raffle.id} Expired`,
      url: `https://charity.games/raffles/${raffle.id}`,
      color: 16734296,
      description: `This raffle ended at ${printShortDateTime(
        raffle.expiresAt
      )} and there was a total of ${
        raffle.tickets.length
      } raffle tickets purchased. ${
        raffle.numWinners
      } winners must be assigned. Below is a list of suggested winners and runner-ups. Extra tickets were picked to ensure enough winners are available for selection.`,
      fields: [
        {
          name: 'Winners and Runner-ups',
          value: raffle.tickets
            .sort(() => Math.random() - 0.5)
            .slice(0, raffle.numWinners * 3)
            .map((winner, i) => `${i + 1}. Ticket ID: ${winner.id}`)
            .join('\n'),
        },
        {
          name: 'Warning',
          value:
            'The suggested winners are not final. Please verify the winner eligibility before assigning the prize. An administrator will need to assign a winner to the prize manually.',
        },
      ],
    })),
    webhookUrl: DISCORD_WEBHOOK_URL,
  });
};

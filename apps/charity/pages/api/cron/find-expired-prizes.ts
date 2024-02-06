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

  const expiredPrizes = await prisma.rafflePrize.findMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
      tickets: {
        none: {
          isWinner: true,
        },
      },
    },
    include: {
      tickets: true,
    },
  });

  // send a message to the discord channel with the winners and the prizes.
  await sendDiscordMessage({
    content: `The following prizes as of ${printShortDateTime(
      Date.now()
    )} have expired and have not been assigned winners:`,
    embeds: expiredPrizes.map((prize) => ({
      title: `${prize.name} - ${prize.id}`,
      url: `https://charity.games/prizes/${prize.id}`,
      color: 16734296,
      description: `This raffle ended at ${printShortDateTime(
        prize.expiresAt
      )} and there was a total of ${
        prize.tickets.length
      } raffle tickets purchased. ${
        prize.numWinners
      } winners must be assigned. Below is a list of suggested winners and runner-ups. Extra tickets were picked to ensure enough winners are available for selection.`,
      fields: [
        {
          name: 'Winners and Runner-ups',
          value: prize.tickets
            .sort(() => Math.random() - 0.5)
            .slice(0, prize.numWinners)
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

  response.status(200).json({ success: true });
}

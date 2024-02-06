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

  const unclaimedTickets = await prisma.raffleTicket.findMany({
    where: {
      // ticket has been assigned as a winner.
      isWinner: true,
      // ticket has not expired yet
      claimBefore: {
        gte: new Date(),
      },
      // ticket has not been claimed yet.
      claimedAt: null,
      // at least 24 hours have passed since we last notified the winner.
      lastNotifiedAt: {
        lte: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
    },
    include: {
      prize: {
        select: {
          name: true,
        },
      },
    },
  });

  await sendDiscordMessage({
    content: `24 hours have passed since the raffle ended and the winner has not claimed their prize. Please send a reminder to the winner to claim their prize.`,
    embeds: unclaimedTickets.map((ticket) => ({
      title: `Ticket ID: ${ticket.id}`,
      url: `https://charity.games/prizes/${ticket.prizeId}`,
      description: `This raffle ticket was purchased for the prize "${
        ticket.prize.name
      }" and has not been claimed. The ticket will expire at ${printShortDateTime(
        ticket.claimBefore ?? new Date()
      )}. The user was last notified at ${printShortDateTime(
        ticket.lastNotifiedAt ?? new Date()
      )}.\n\nPlease send a reminder to the winner to claim their prize.`,
    })),
    webhookUrl: DISCORD_WEBHOOK_URL,
  });

  response.status(200).json({ success: true });
}

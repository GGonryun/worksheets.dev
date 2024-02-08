import { WinningTicket } from '@prisma/client';
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

  const unclaimedTickets = await prisma.winningTicket.findMany({
    where: {
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
  });

  if (unclaimedTickets.length === 0) {
    console.info('No unclaimed tickets found.');
  } else {
    console.info('Unclaimed tickets found:', unclaimedTickets);
    await sendMessage(unclaimedTickets);
    console.info('Discord message sent.');
  }

  response.status(200).json({ success: true });
}

const sendMessage = async (winners: WinningTicket[]) => {
  await sendDiscordMessage({
    content: `A raffle winner has not claimed their prize. Please send a reminder to the winner to claim their prize.`,
    embeds: winners.map((ticket) => ({
      title: `Ticket ID: ${ticket.id}`,
      url: `https://charity.games/admin/tickets/${ticket.id}`,
      description: `The ticket will expire at ${printShortDateTime(
        ticket.claimBefore ?? new Date()
      )}. The user was last notified at ${printShortDateTime(
        ticket.lastNotifiedAt ?? new Date()
      )}.\n\nPlease send a reminder to the winner to claim their prize.`,
    })),
    webhookUrl: DISCORD_WEBHOOK_URL,
  });
};

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

  const expiredUnclaimedTickets = await prisma.winningTicket.findMany({
    where: {
      claimBefore: {
        lte: new Date(),
      },
      claimedAt: null,
    },
  });

  if (expiredUnclaimedTickets.length === 0) {
    console.info('No expired unclaimed tickets found.');
  } else {
    console.info('Expired unclaimed tickets found:', expiredUnclaimedTickets);
    await sendMessage(expiredUnclaimedTickets);
    console.info('Discord message sent.');
  }

  response.status(200).json({ success: true });
}

export const sendMessage = async (winners: WinningTicket[]) => {
  // send a message to the discord channel with the unclaimed tickets.
  await sendDiscordMessage({
    content: `The following winning tickets have not been claimed as of ${printShortDateTime(
      Date.now()
    )}:`,
    embeds: winners.map((winner) => ({
      title: `Winning Ticket ID: ${winner.id}`,
      url: `https://charity.games/admin/tickets/${winner.ticketId}`,
      description: `The ticket expired at ${printShortDateTime(
        winner.claimBefore
      )}.\n\nPlease select a new winner or runner-up for this prize. This can be done by deleting this WinningTicket entity and letting the system select a new winner automatically.\n\nVisit the admin panel to manage this ticket.`,
    })),
    webhookUrl: DISCORD_WEBHOOK_URL,
  });
};

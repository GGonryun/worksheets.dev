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

  const expiredUnclaimedTickets = await prisma.raffleTicket.findMany({
    where: {
      claimBefore: {
        lte: new Date(),
      },
      claimedAt: null,
    },
    include: {
      prize: {
        select: {
          name: true,
        },
      },
    },
  });

  // send a message to the discord channel with the unclaimed tickets.
  await sendDiscordMessage({
    content: `The following raffle tickets as of ${printShortDateTime(
      Date.now()
    )} have expired and have not been claimed:`,
    embeds: expiredUnclaimedTickets.map((ticket) => ({
      title: `Ticket ID: ${ticket.id}`,
      url: `https://charity.games/prizes/${ticket.prizeId}`,
      description: `This raffle ticket was purchased for the prize "${
        ticket.prize.name
      }" and has not been claimed. The ticket expired at ${printShortDateTime(
        ticket.claimBefore ?? new Date()
      )}.\n\nPlease select a new winner or runner-up for this prize. This can be done by removing the 'isWinner' flag from the current winner and letting the system select a new winner automatically.`,
    })),
    webhookUrl: DISCORD_WEBHOOK_URL,
  });

  response.status(200).json({ success: true });
}

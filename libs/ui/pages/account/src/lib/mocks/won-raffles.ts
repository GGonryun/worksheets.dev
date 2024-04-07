import { hoursAgo, hoursFromNow } from '@worksheets/util/time';
import { WonRaffleDetails } from '@worksheets/util/types';

export const mockWonRaffles: WonRaffleDetails[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: `${i}-prize`,
    prizeId: `${i}-prize`,
    winnerId: `${i}-winner`,
    raffleId: i,
    ticketId: `${i}-ticket`,
    expiresAt: hoursFromNow(5 * i).getTime(),
    name: `Prize ${i}`,
    imageUrl: 'https://via.placeholder.com/150',
    endedAt: hoursAgo(5 * i).getTime(),
    claimBy: hoursFromNow(5 * i).getTime(),
    claimedAt: i % 3 === 0 ? hoursAgo(5 * i).getTime() : undefined,
    type: 'STEAM_KEY',
  })
);

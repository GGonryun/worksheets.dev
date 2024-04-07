import { hoursFromNow } from '@worksheets/util/time';
import { EnteredRaffleSchema } from '@worksheets/util/types';

export const mockEnteredRaffles: EnteredRaffleSchema[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: i,
    name: `Prize ${i}`,
    imageUrl: 'https://via.placeholder.com/150',
    type: 'STEAM_KEY',
    status: i % 4 === 0 ? 'COMPLETE' : 'ACTIVE',
    entries: 32,
    prizeId: `${i}-prize`,
    expiresAt: hoursFromNow(5 * i).getTime(),
  })
);

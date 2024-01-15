import {
  daysAgo,
  hoursAgo,
  minutesAgo,
  monthsAgo,
  weeksAgo,
} from '@worksheets/util/time';

import { Referral } from '../types';

export const mockReferrals: Referral[] = [
  {
    id: '1',
    username: 'test',
    createdAt: minutesAgo(23145).getTime(),
    gamesRemaining: 10,
    tokensEarned: 234,
  },
  {
    id: '2',
    username: 'high-score-girl',
    createdAt: hoursAgo(31567).getTime(),
    gamesRemaining: 3,
    tokensEarned: 5155,
  },
  {
    id: '3',
    username: 'sailor-moon',
    gamesRemaining: 4,
    createdAt: daysAgo(53).getTime(),
    tokensEarned: 235,
  },
  {
    id: '4',
    username: 'nice-guy-123',
    createdAt: weeksAgo(2).getTime(),
    gamesRemaining: 2,
    tokensEarned: 1,
  },
  {
    id: '5',
    username: 'super-mario',
    createdAt: monthsAgo(3).getTime(),
    gamesRemaining: 0,
    tokensEarned: 23,
  },
];

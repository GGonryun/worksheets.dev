import {
  daysAgo,
  hoursAgo,
  minutesAgo,
  monthsAgo,
  weeksAgo,
} from '@worksheets/util/time';
import { Referral } from '@worksheets/util/types';

export const mockReferrals: Referral[] = [
  {
    id: '1',
    username: 'test',
    createdAt: minutesAgo(23145).getTime(),
  },
  {
    id: '2',
    username: 'high-score-girl',
    createdAt: hoursAgo(31567).getTime(),
  },
  {
    id: '3',
    username: 'sailor-moon',
    createdAt: daysAgo(53).getTime(),
  },
  {
    id: '4',
    username: 'nice-guy-123',
    createdAt: weeksAgo(2).getTime(),
  },
  {
    id: '5',
    username: 'super-mario',
    createdAt: monthsAgo(3).getTime(),
  },
];

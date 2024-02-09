import {
  daysAgo,
  hoursAgo,
  minutesAgo,
  monthsAgo,
  weeksAgo,
} from '@worksheets/util/time';
import { Friend } from '@worksheets/util/types';

export const mockFriends: Friend[] = [
  {
    id: '1',
    username: 'mighty-mouse',
    lastSeen: minutesAgo(1).getTime(),
    isFavorite: true,
    giftSentAt: null,
  },
  {
    id: '2',
    username: 'joey-jo-jo-junior-shabadoo-iii-esquire',
    lastSeen: hoursAgo(21).getTime(),
    isFavorite: true,
    giftSentAt: Date.now(),
  },
  {
    id: '3',
    username: 'test-user',
    lastSeen: daysAgo(5).getTime(),
    isFavorite: false,
    giftSentAt: null,
  },
  {
    id: '4',
    username: 'kyle-the-bard',
    lastSeen: weeksAgo(2).getTime(),
    isFavorite: false,
    giftSentAt: Date.now(),
  },
  {
    id: '5',
    username: 'shrek',
    lastSeen: monthsAgo(1).getTime(),
    isFavorite: false,
    giftSentAt: null,
  },
];

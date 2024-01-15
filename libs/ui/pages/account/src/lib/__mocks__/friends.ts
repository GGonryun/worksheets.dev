import {
  daysAgo,
  hoursAgo,
  minutesAgo,
  monthsAgo,
  weeksAgo,
} from '@worksheets/util/time';

import { Friend } from '../types';

export const mockFriends: Friend[] = [
  {
    id: '1',
    username: 'mighty-mouse',
    lastSeen: minutesAgo(1).getTime(),
    gamesPlayed: 128,
    isFavorite: true,
    hasSentGiftToday: false,
  },
  {
    id: '2',
    username: 'joey-jo-jo-junior-shabadoo-iii-esquire',
    lastSeen: hoursAgo(21).getTime(),
    gamesPlayed: 128,
    isFavorite: true,
    hasSentGiftToday: true,
  },
  {
    id: '3',
    username: 'test-user',
    lastSeen: daysAgo(5).getTime(),
    gamesPlayed: 0,
    isFavorite: false,
    hasSentGiftToday: false,
  },
  {
    id: '4',
    username: 'kyle-the-bard',
    lastSeen: weeksAgo(2).getTime(),
    gamesPlayed: 1615,
    isFavorite: false,
    hasSentGiftToday: true,
  },
  {
    id: '5',
    username: 'shrek',
    lastSeen: monthsAgo(1).getTime(),
    gamesPlayed: 61346,
    isFavorite: false,
    hasSentGiftToday: false,
  },
];

import { Friend } from '@worksheets/util/types';

export const sortByLastSeen = (a: Friend, b: Friend) => {
  // sort by last seen date
  return a.lastSeen - b.lastSeen;
};

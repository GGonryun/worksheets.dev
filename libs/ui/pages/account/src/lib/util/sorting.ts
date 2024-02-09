import { Friend } from '@worksheets/util/types';

export const sortByGiftSentAt = (a: Friend, b: Friend) => {
  // sort by last sent gift date
  if (a.giftSentAt && b.giftSentAt) {
    return a.giftSentAt - b.giftSentAt;
  }
  // if gift hasn't been sent, show at the top
  if (a.giftSentAt) {
    return 1;
  }
  if (b.giftSentAt) {
    return -1;
  }
  // sort by username
  return a.username.localeCompare(b.username);
};

export const sortByLastSeen = (a: Friend, b: Friend) => {
  // sort by last seen date
  return a.lastSeen - b.lastSeen;
};

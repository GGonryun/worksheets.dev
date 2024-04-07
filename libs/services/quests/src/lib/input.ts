import { parseKey } from '@worksheets/util/misc';

export const parseAddFriendInput = (input: unknown) => {
  return { friendId: parseKey<string>(input, 'friendId', 'string') };
};

export const parseAddReferralInput = (input: unknown) => {
  return { referralId: parseKey<string>(input, 'referralId', 'string') };
};

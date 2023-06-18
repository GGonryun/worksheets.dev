import { newPrivateHandler, skeleton } from '@worksheets/util/next';

export const API_IDENTIFY = '/api/identify';

const post = newPrivateHandler({})(async ({ user }) => {
  console.log(
    'a user has identified themselves',
    user.uid,
    user.email,
    user.email_verified
  );
});

export default skeleton({ post });

import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { NextApiRequest } from 'next';
import { auth } from '@worksheets/firebase/server';
import { CodedFailure } from '@worksheets/util/errors';

export async function verifyIdToken(
  req: NextApiRequest
): Promise<DecodedIdToken> {
  const { authorization } = req.headers;
  const token = await parseToken(authorization);
  const user = await verify(token);
  return user;
}

export async function parseToken(authorization?: string): Promise<string> {
  if (!authorization) {
    throw new UserVerificationFailure({
      code: 'missing-token',
      message: 'authorization header cannot be empty',
    });
  }

  const pieces = authorization.split(' ');
  if (!pieces || pieces.length !== 2 || pieces[0] !== `Bearer`) {
    throw new UserVerificationFailure({
      code: 'invalid-format',
      message: 'authorization format is invalid expected: `Bearer <token>`',
    });
  }

  return pieces[1];
}

export async function verify(idToken: string): Promise<DecodedIdToken> {
  try {
    const user = await auth().verifyIdToken(idToken);
    if (user) {
      return user;
    }
    throw new UserVerificationFailure({
      code: 'not-found',
      message: 'user was not found after verification',
    });
  } catch (error) {
    throw new UserVerificationFailure({ code: 'unexpected', cause: error });
  }
}

type UserVerificationFailures =
  | 'unexpected'
  | 'invalid-format'
  | 'missing-token'
  | 'not-found';
export class UserVerificationFailure extends CodedFailure<UserVerificationFailures> {}

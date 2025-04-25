import { WEEKS } from '@worksheets/util/time';
import { serialize } from 'cookie';
import { NextApiResponse } from 'next';

const serializeTeamId = (teamId: string) => {
  return serialize('teamId', teamId, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 1 * WEEKS,
  });
};

export const cookies = {
  set: (res: NextApiResponse) => {
    const setHeader = (value: string | number | readonly string[]) => {
      return res.setHeader('Set-Cookie', value);
    };

    return {
      teamId: (teamId: string) => {
        setHeader(serializeTeamId(teamId));
      },
    };
  },
};

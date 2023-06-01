import { HandlerFailure } from '@worksheets/util/next';
import { NextApiRequest } from 'next';

export function getWorksheetPath(req: NextApiRequest): [string, string] {
  const path = req.query.path;
  if (!path || typeof path === 'string' || !path.length) {
    throw new HandlerFailure({
      code: 'invalid-argument',
      message: "query parameter 'path' is required",
      data: req.query,
    });
  }

  const worksheetId = path[0];
  if (path.length === 1) {
    return [worksheetId, ''];
  }

  if (path.length === 2) {
    const userId = path[1];
    return [worksheetId, userId];
  }

  throw new HandlerFailure({
    code: 'invalid-argument',
    message: "query parameter 'path' has incorrect number of arguments",
    data: { path },
  });
}

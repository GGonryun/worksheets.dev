import { skeleton } from '@worksheets/util/next';
import { post } from './post';
import { get } from './get';

export {
  GetWorksheetsRequest,
  GetWorksheetsResponse,
  GetWorksheetResponse,
  Worksheet,
} from './get';
export { PostWorksheetRequest, PostWorksheetResponse } from './post';

export const worksheetsHandler = skeleton({ get, post });

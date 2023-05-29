import { skeleton } from '@worksheets/util/next';
import { post } from './post';
import { get } from './get';

export type {
  GetWorksheetsRequest,
  GetWorksheetsResponse,
  GetWorksheetResponse,
  Worksheet,
} from './get';
export type { PostWorksheetRequest, PostWorksheetResponse } from './post';

export const worksheetsHandler = skeleton({ get, post });

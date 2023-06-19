import { skeleton } from '@worksheets/util/next';
import { post } from './post';
import { get } from './get';
import { del } from './delete';
import { put } from './put';

export type {
  GetWorksheetsRequest,
  GetWorksheetsResponse,
  GetWorksheetResponse,
  Worksheet,
} from './get';
export type { PostWorksheetRequest, PostWorksheetResponse } from './post';
export type { PutWorksheetRequest, PutWorksheetResponse } from './put';

export const worksheetsHandler = skeleton({ get, post, del, put });

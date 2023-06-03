import { skeleton } from '@worksheets/util/next';
import { post } from './post';
import { get } from './get';

export type { PostSettingsResponse } from './post';
export type { GetSettingsResponse } from './get';

export const settingsHandler = skeleton({ get, post });

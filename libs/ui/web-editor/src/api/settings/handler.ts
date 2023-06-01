import { skeleton } from '@worksheets/util/next';
import { post } from './post';
import { get } from './get';

export const settingsHandler = skeleton({ get, post });

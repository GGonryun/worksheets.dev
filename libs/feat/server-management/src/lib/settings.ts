import {
  ServerSettingEntity,
  newServerSettingsDatabase,
} from '@worksheets/data-access/server-settings';
import { TRPCError } from '@trpc/server';
import { isNumber } from 'lodash';
import { ServerOperationLimitEntity } from '@worksheets/data-access/server-limits';
import { durationToMilliseconds } from '@worksheets/util/time';
const db = newServerSettingsDatabase();

type minutes = number;
type LimitOperationType = ServerOperationLimitEntity['id'];
type SettingsKey = ServerSettingEntity['id'];

const REPLENISH_QUANTITY: Record<LimitOperationType, number> = {
  'trpc-requests': 100,
  'api-requests': 100,
  executions: 10,
  processingTime: durationToMilliseconds({ minutes: 5 }),
};

// minutes before replenishing this quantity.
const REPLENISH_TIMER: Record<LimitOperationType, minutes> = {
  'trpc-requests': 1,
  'api-requests': 5,
  executions: 1,
  processingTime: 3,
};

const INITIAL_SETTINGS: Record<SettingsKey, string> = {
  version: '0.0.1',
  'replenish-server-resource-alert-threshold-error': '0.10',
  'replenish-server-resource-alert-threshold-warning': '0.20',
  'replenish-server-resource-alert-threshold-info': '0.40',
  'replenish-rate-limit-alert-threshold-error': '0.05',
  'replenish-rate-limit-alert-threshold-warning': '0.10',
  'replenish-rate-limit-alert-threshold-info': '0.20',
  'max-collected-metric-per-key': '5',
  'replenish-server-quantities': JSON.stringify(REPLENISH_QUANTITY),
  'replenish-server-intervals': JSON.stringify(REPLENISH_TIMER),
};

const get = async (id: SettingsKey) => {
  let s;

  if (await db.has(id)) {
    s = await db.get(id);
  } else {
    if (INITIAL_SETTINGS[id] === undefined) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Setting ${id} is not defined`,
      });
    }

    s = await db.updateOrInsert({ id, value: INITIAL_SETTINGS[id] });
  }

  return s.value;
};

const getAsNumber = async (id: SettingsKey) => {
  const value = await get(id);
  const num = Number(value);

  if (!isNumber(num)) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Setting ${id} is not a number`,
    });
  }
  return num;
};

// use to access a key in a setting that is stored as an object.
export const access = async <T>(id: SettingsKey, key: keyof T) => {
  const value = await get(id);
  const parsed = JSON.parse(value) as T;
  return parsed[key];
};

// does the value at key exceed the quantity?
export const exceeds = async (id: SettingsKey, quantity: number) => {
  return (await getAsNumber(id)) < quantity;
};

// is the value at key below the quantity?
export const below = async (id: SettingsKey, quantity: number) => {
  return (await getAsNumber(id)) > quantity;
};

export const settings = {
  get,
  number: (id: SettingsKey) => get(id).then(Number),
  access,
  exceeds,
  below,
};

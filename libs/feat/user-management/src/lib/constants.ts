import {
  UserLimitsEntity,
  UserQuotasEntity,
} from '@worksheets/data-access/user-agent';
import { durationToMilliseconds } from '@worksheets/util/time';

export const API_TOKEN_PREFIX = 'ws::';
export const MACHINE_TOKEN_PREFIX = 'ms::';
export const INITIAL_FLAGS = ['user' as const];
export const INITIAL_LIMITS: Omit<UserLimitsEntity, 'id'> = {
  maxApiTokens: 3,
  maxWorksheets: 6,
  logRetention: 24,
  executionHistoryRetention: 24,
  maxConnections: 4,
  maxQueuedExecutions: 10,
  maxRunningExecutions: 5,
};

export const INITIAL_QUOTAS: Omit<UserQuotasEntity, 'id' | 'createdAt'> = {
  enabled: true,
  overclocked: false,
  tokenUses: {
    current: 100,
    resetTo: 100,
  },
  executions: {
    current: 200,
    resetTo: 200,
  },
  methodCalls: {
    current: 200,
    resetTo: 200,
  },
  processingTime: {
    current: durationToMilliseconds({ minutes: 5 }),
    resetTo: durationToMilliseconds({ minutes: 5 }),
  },
};

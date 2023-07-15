import { UserLimitsEntity, UserQuotasEntity } from '@worksheets/schemas-user';

export const API_TOKEN_PREFIX = 'ws::';
export const MACHINE_TOKEN_PREFIX = 'ms::';
export const INITIAL_FLAGS = ['user' as const];
export const INITIAL_LIMITS: Omit<UserLimitsEntity, 'id'> = {
  maxApiTokens: 3,
};

export const INITIAL_QUOTAS: Omit<UserQuotasEntity, 'id' | 'createdAt'> = {
  enabled: true,
  overclocked: false,
  executions: {
    current: 100,
    resetTo: 100,
  },
};

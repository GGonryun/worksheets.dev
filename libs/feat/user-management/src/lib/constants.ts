export const API_TOKEN_PREFIX = 'ws::';
export const MACHINE_TOKEN_PREFIX = 'ms::';
export const INITIAL_FLAGS = ['user' as const];
export const INITIAL_LIMITS = {
  maxApiTokens: 3,
  maxActiveTasks: 4,
  maxWorksheets: 5,
};

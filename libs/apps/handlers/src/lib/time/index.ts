import { ApplicationMethodHandlers } from '@worksheets/apps-registry';

export const time: ApplicationMethodHandlers<'time'> = {
  now: async () => Date.now(),
};

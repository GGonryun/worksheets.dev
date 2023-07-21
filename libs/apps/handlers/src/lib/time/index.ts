import { ApplicationExecutors } from '../framework';

export const time: ApplicationExecutors<'time'> = {
  now: async () => Date.now(),
};

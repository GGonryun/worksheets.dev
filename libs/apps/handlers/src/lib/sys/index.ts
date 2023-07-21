import { ApplicationExecutors } from '../framework';

export const sys: ApplicationExecutors<'sys'> = {
  log: async ({ input }) => {
    console.log(input);
    return null;
  },
};

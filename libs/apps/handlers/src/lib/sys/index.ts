import { ApplicationMethodHandlers } from '@worksheets/apps-registry';

export const sys: ApplicationMethodHandlers<'sys'> = {
  log: async ({ input }) => {
    console.log(input);
    return null;
  },
};

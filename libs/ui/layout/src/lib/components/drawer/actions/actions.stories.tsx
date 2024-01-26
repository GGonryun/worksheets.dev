import type { Meta } from '@storybook/react';

import { Actions } from './actions';

const Story: Meta<typeof Actions> = {
  component: Actions,
  decorators: [],
};
export default Story;

export const Primary = {
  args: {
    open: true,
  },
};

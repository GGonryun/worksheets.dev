import type { Meta } from '@storybook/react';

import { DrawerActions } from './drawer-actions';

const Story: Meta<typeof DrawerActions> = {
  component: DrawerActions,
  title: 'Layout/DrawerActions',
  decorators: [],
};
export default Story;

export const Primary = {
  args: {
    open: true,
  },
};

import type { Meta } from '@storybook/react';
import { AppStore } from './app-store';

const Story: Meta<typeof AppStore> = {
  component: AppStore,
  title: 'Icons/AppStore',
};
export default Story;

export const Primary = {
  args: {
    fontSize: 'large',
  },
};

export const Large = {
  args: {
    sx: {
      height: 200,
      width: 200,
    },
  },
};

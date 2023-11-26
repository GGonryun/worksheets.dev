import type { Meta } from '@storybook/react';
import { PlayStore } from './play-store';

const Story: Meta<typeof PlayStore> = {
  component: PlayStore,
  title: 'Icons/PlayStore',
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

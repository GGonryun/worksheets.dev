import type { Meta } from '@storybook/react';
import { ColoredGoogle } from './google';

const Story: Meta<typeof ColoredGoogle> = {
  component: ColoredGoogle,
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

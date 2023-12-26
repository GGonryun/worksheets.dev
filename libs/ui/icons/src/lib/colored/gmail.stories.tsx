import type { Meta } from '@storybook/react';
import { ColoredGmail } from './gmail';

const Story: Meta<typeof ColoredGmail> = {
  component: ColoredGmail,
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

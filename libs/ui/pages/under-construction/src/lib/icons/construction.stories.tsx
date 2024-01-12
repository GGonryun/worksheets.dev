import type { Meta } from '@storybook/react';

import { Construction } from './construction';

const Story: Meta<typeof Construction> = {
  component: Construction,
  title: 'Icons/Construction',
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

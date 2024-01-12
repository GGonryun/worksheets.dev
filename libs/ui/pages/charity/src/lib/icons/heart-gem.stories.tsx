import type { Meta } from '@storybook/react';

import { HeartGem } from './heart-gem';

const Story: Meta<typeof HeartGem> = {
  component: HeartGem,
  title: 'Icons/HeartGem',
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

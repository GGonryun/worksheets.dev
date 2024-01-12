import type { Meta } from '@storybook/react';

import { BlueDiamond } from './blue-diamond';

const Story: Meta<typeof BlueDiamond> = {
  component: BlueDiamond,
  title: 'Icons/BlueDiamond',
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

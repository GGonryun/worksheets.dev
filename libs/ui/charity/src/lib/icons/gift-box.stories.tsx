import type { Meta } from '@storybook/react';
import { GiftBox } from './gift-box';

const Story: Meta<typeof GiftBox> = {
  component: GiftBox,
  title: 'Icons/GiftBox',
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

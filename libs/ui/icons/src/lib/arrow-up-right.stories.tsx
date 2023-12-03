import type { Meta } from '@storybook/react';
import { ArrowUpRight } from './arrow-up-right';

const Story: Meta<typeof ArrowUpRight> = {
  component: ArrowUpRight,
  title: 'Icons/ArrowUpRight',
};
export default Story;

export const Primary = {
  args: {
    fontSize: 'large',
  },
};

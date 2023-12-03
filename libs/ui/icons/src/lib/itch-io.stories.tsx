import type { Meta } from '@storybook/react';
import { ItchIo } from './itch-io';

const Story: Meta<typeof ItchIo> = {
  component: ItchIo,
  title: 'Icons/ItchIo',
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

import type { Meta } from '@storybook/react';
import { CharityBox } from './charity-box';

const Story: Meta<typeof CharityBox> = {
  component: CharityBox,
  title: 'Icons/Charity/Box',
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

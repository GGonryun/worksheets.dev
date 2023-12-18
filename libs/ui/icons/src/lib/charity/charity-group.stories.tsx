import type { Meta } from '@storybook/react';
import { CharityGroup } from './charity-group';

const Story: Meta<typeof CharityGroup> = {
  component: CharityGroup,
  title: 'Icons/Charity/Group',
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

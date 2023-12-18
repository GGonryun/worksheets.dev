import type { Meta } from '@storybook/react';
import { CharityWater } from './charity-water';

const Story: Meta<typeof CharityWater> = {
  component: CharityWater,
  title: 'Icons/Charity/Water',
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

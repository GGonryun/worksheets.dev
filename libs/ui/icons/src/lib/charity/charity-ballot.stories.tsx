import type { Meta } from '@storybook/react';
import { CharityBallot } from './charity-ballot';

const Story: Meta<typeof CharityBallot> = {
  component: CharityBallot,
  title: 'Icons/Charity/Ballot',
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

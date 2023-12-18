import type { Meta } from '@storybook/react';
import { ContributionScreen } from './contribution-screen';

const Story: Meta<typeof ContributionScreen> = {
  component: ContributionScreen,
  title: 'Content/ContributionScreen',
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {},
};

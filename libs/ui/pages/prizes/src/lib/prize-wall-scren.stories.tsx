import { Meta } from '@storybook/react';

import { PrizeWallScreen } from './prize-wall-screen';

type Story = Meta<typeof PrizeWallScreen>;
const Default: Story = {
  component: PrizeWallScreen,
  args: {},
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

export default Default;

export const Primary = {
  args: {},
};

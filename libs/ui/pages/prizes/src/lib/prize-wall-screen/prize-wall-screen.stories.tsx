import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/wallpaper';

import { PrizeWallScreen } from '.';
import {
  EMPTY_VALUES,
  PREFILLED_VALUES,
  RaffleScreenContextProvider,
} from './context';

type Story = Meta<typeof PrizeWallScreen>;
const Default: Story = {
  component: PrizeWallScreen,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
};

export default Default;

export const Empty: Story = {
  args: {},
  decorators: [
    (Story) => (
      <RaffleScreenContextProvider value={EMPTY_VALUES(action)}>
        <Story />
      </RaffleScreenContextProvider>
    ),
  ],
};

export const Filled: Story = {
  args: {},
  decorators: [
    (Story) => (
      <RaffleScreenContextProvider value={PREFILLED_VALUES(action)}>
        <Story />
      </RaffleScreenContextProvider>
    ),
  ],
};

import Paper from '@mui/material/Paper';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { mockEnteredRaffles, mockWonRaffles } from '../../mocks';
import { PrizesPanel } from './prizes-panel';

type Story = Meta<typeof PrizesPanel>;

const Default: Story = {
  component: PrizesPanel,
  args: {
    onClaim: action('onClaim'),
  },
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Paper sx={{ m: 3, p: 3 }}>
          <Story />
        </Paper>
      </StoryWallpaper>
    ),
  ],
};

export default Default;

export const Empty: Story = {
  args: {
    prizes: [],
    previous: [],
  },
};

export const Primary: Story = {
  args: {
    previous: mockEnteredRaffles,
    prizes: mockWonRaffles,
  },
};

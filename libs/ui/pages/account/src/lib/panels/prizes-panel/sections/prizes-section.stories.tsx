import { Box, Paper } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { mockWonRaffles } from '../../../mocks';
import { PrizesSection } from './prizes-section';

type Story = Meta<typeof PrizesSection>;

export default {
  component: PrizesSection,
  args: {
    onClaim: action('onClaim'),
  },
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Paper component={Box} p={{ xs: 2, sm: 4 }}>
          <Story />
        </Paper>
      </StoryWallpaper>
    ),
  ],
} satisfies Story;

export const Empty: Story = {
  args: {
    prizes: [],
  },
};

export const Primary: Story = {
  args: {
    prizes: mockWonRaffles,
  },
};

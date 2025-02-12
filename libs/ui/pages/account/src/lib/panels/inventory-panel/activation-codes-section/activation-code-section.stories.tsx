import { Box, Paper } from '@mui/material';
import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { ActivationCodesSection } from './activation-code-section';
type Story = Meta<typeof ActivationCodesSection>;

export default {
  component: ActivationCodesSection,
  args: {},
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
    codes: [],
  },
};

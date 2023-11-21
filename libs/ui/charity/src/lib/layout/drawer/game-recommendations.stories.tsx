import type { Meta } from '@storybook/react';

import { GameRecommendations } from './game-recommendations';
import { Box, lighten } from '@mui/material';

const Story: Meta<typeof GameRecommendations> = {
  component: GameRecommendations,
  title: 'Layout/Drawer/GameRecommendations',
  decorators: [
    (Story) => (
      <Box
        sx={{
          backgroundColor: (theme) => lighten(theme.palette.error.light, 0.7),
        }}
      >
        <Story />
      </Box>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {},
};

export const WithoutCategories = {
  args: {
    hideCategories: true,
  },
};

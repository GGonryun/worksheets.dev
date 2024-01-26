import { Box } from '@mui/material';
import type { Meta } from '@storybook/react';

import { GameRecommendations } from './game-recommendations';

const Story: Meta<typeof GameRecommendations> = {
  component: GameRecommendations,
  decorators: [
    (Story) => (
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
        }}
      >
        <Story />
      </Box>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    recommendations: {
      popular: [],
      new: [],
      categories: [],
    },
  },
};

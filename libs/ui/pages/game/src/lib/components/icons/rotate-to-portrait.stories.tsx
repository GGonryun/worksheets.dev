import { Box } from '@mui/material';
import type { Meta } from '@storybook/react';

import { RotateToPortrait } from './rotate-to-portrait';

const Story: Meta<typeof RotateToPortrait> = {
  component: RotateToPortrait,
  decorators: [
    (Story) => (
      <Box
        sx={{
          backgroundColor: 'black',
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

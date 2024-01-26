import { Box } from '@mui/material';
import type { Meta } from '@storybook/react';

import { RotateToLandscape } from './rotate-to-landscape';

const Story: Meta<typeof RotateToLandscape> = {
  component: RotateToLandscape,
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

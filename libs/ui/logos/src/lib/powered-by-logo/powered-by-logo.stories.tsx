import { Box } from '@mui/material';
import { Meta } from '@storybook/react';

import { PoweredByLogo } from './powered-by-logo';

type Story = Meta<typeof PoweredByLogo>;
const Default: Story = {
  component: PoweredByLogo,
  args: {},
  decorators: [
    (Story) => (
      <Box
        sx={{
          padding: 3,
          backgroundColor: (theme) =>
            theme.palette.background['transparent-blue'],
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

export default Default;

export const Primary: Story = {
  args: {},
};

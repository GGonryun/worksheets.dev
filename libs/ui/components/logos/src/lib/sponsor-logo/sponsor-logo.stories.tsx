import { Box } from '@mui/material';
import { Meta } from '@storybook/react';

import { SponsorLogo } from './sponsor-logo';

type Story = Meta<typeof SponsorLogo>;
const Default: Story = {
  component: SponsorLogo,
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
  args: {
    text: 'Charity Games',
  },
};

export const Longer: Story = {
  args: {
    text: 'Paradox Interactive',
  },
};

export const OneLine: Story = {
  args: {
    text: 'Sidecade',
  },
};

import type { Meta } from '@storybook/react';
import { SubdomainBox } from './subdomain-box';
import { ThemeProvider, Typography } from '@mui/material';
import { theme } from '../theme';

const Story: Meta<typeof SubdomainBox> = {
  component: SubdomainBox,
  title: 'Cards/SubdomainBox',
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Typography width={250}>
          <Story />
        </Typography>
      </ThemeProvider>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    children: "I'm a subdomain box!",
  },
};

export const TooLong = {
  args: {
    children:
      "I'm a subdomain box! I'm a subdomain box! I'm a subdomain box! I'm a subdomain box!",
  },
};

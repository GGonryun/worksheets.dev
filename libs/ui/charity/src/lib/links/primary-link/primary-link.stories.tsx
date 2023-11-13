import type { Meta } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import { PrimaryLink } from './primary-link';
import { theme } from '../../theme';

const Story: Meta<typeof PrimaryLink> = {
  component: PrimaryLink,
  title: 'Links/PrimaryLink',
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    children: 'This is a primary link',
  },
};

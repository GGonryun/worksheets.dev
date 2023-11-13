import type { Meta } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import { SecondaryLink } from './secondary-link';
import { theme } from '../../theme';

const Story: Meta<typeof SecondaryLink> = {
  component: SecondaryLink,
  title: 'Links/SecondaryLink',
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
    children: 'This is a secondary link',
  },
};

import type { Meta } from '@storybook/react';
import { IconBox } from './icon-box';
import { ThemeProvider } from '@mui/material';
import { theme } from '../theme';
import { Favorite } from '@mui/icons-material';

const Story: Meta<typeof IconBox> = {
  component: IconBox,
  title: 'Cards/IconBox',
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
    href: '/',
    Icon: Favorite,
    text: 'Favorite',
    color: 'love',
  },
};

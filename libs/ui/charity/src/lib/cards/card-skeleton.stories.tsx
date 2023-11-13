import type { Meta } from '@storybook/react';
import { CardSkeleton } from './card-skeleton';
import { Box, ThemeProvider } from '@mui/material';
import { theme } from '../theme';

const Story: Meta<typeof CardSkeleton> = {
  component: CardSkeleton,
  title: 'Cards/CardSkeleton',
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
    url: '/',
    image:
      'https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png',
    children: <Box>Card Content</Box>,
  },
};

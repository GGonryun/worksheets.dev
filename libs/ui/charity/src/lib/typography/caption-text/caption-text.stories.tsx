import type { Meta } from '@storybook/react';
import { CaptionText } from './caption-text';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme';

const Story: Meta<typeof CaptionText> = {
  component: CaptionText,
  title: 'Typography/CaptionText',
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
    children: 'This is caption text',
  },
};

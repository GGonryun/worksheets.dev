import type { Meta } from '@storybook/react';
import { HeaderText } from '../header-text';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../theme';

const Story: Meta<typeof HeaderText> = {
  component: HeaderText,
  title: 'Typography/HeaderText',
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
    children: 'This is header text',
  },
};

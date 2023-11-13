import type { Meta } from '@storybook/react';
import { SubmissionButton } from './submission-button';
import { ThemeProvider } from '@mui/material';
import { theme } from '../theme';

const Story: Meta<typeof SubmissionButton> = {
  component: SubmissionButton,
  title: 'Buttons/SubmissionButton',
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
    children: 'Submission Button',
  },
};

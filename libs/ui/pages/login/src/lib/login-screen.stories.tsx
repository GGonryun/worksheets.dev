import { Box } from '@mui/material';
import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { LoginScreen } from './login-screen';

const Story: Meta<typeof LoginScreen> = {
  component: LoginScreen,
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Box height="100vh">
          <Story />
        </Box>
      </StoryWallpaper>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {},
};

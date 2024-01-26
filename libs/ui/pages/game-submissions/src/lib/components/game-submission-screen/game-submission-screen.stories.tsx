import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import {
  DEFAULT_VALUES,
  GameSubmissionFormContextProvider,
} from '../form-context';
import { GameSubmissionScreen } from './game-submission-screen';

type Story = Meta<typeof GameSubmissionScreen>;

const Default: Story = {
  component: GameSubmissionScreen,
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
    (Story) => (
      <GameSubmissionFormContextProvider value={DEFAULT_VALUES(action)}>
        <Story />
      </GameSubmissionFormContextProvider>
    ),
  ],
};
export default Default;

export const Primary = {
  args: {
    invalidProfile: false,
  },
};

export const InvalidProfile = {
  args: {
    invalidProfile: true,
  },
};

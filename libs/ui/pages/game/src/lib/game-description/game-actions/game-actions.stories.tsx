import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { GameActions } from './game-actions';

const Story: Meta<typeof GameActions> = {
  component: GameActions,
};
export default Story;

export const Primary = {
  args: {
    onReport: action('onReport'),
    onShare: action('onShare'),
  },
};

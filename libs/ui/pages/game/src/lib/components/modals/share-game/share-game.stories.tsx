import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { sampleGame } from '../../mocks';
import { ShareGameModal } from './share-game';

const Story: Meta<typeof ShareGameModal> = {
  component: ShareGameModal,
  args: {
    open: true,
    onClose: action('onClose'),
    game: sampleGame,
  },
};
export default Story;

export const Primary = {
  args: {},
};

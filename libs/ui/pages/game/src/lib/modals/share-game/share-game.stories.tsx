import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import { ShareGameModal } from './share-game';
import { sampleGame } from '../../mocks';

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

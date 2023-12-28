import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import { TopPlayersModal } from './top-players-modal';
import { sampleTopPlayers } from '../mocks';

const Story: Meta<typeof TopPlayersModal> = {
  component: TopPlayersModal,
  args: {
    open: true,
    onClose: action('onClose'),
  },
};
export default Story;

export const Primary = {
  args: {
    players: sampleTopPlayers,
  },
};

export const Empty = {
  args: {
    players: [],
  },
};

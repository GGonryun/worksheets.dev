import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { EnterRaffleModal } from './enter-raffle-modal';

type Story = Meta<typeof EnterRaffleModal>;

const Default: Story = {
  component: EnterRaffleModal,
  args: {
    onClose: action('onClose'),
    onEnter: action('onEnter'),
  },
};
export default Default;

export const Primary: Story = {
  args: {
    open: true,
    tokensOwned: 1000,
  },
};

export const InsufficientTokens: Story = {
  args: {
    open: true,
    tokensOwned: 1,
  },
};

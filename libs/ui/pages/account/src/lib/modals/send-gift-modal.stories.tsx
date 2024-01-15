import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { SendGiftModal } from './send-gift-modal';

type Story = Meta<typeof SendGiftModal>;

const Default: Story = {
  component: SendGiftModal,
  args: {
    onClose: action('onClose'),
    onRemove: action('onRemove'),
  },
};
export default Default;

export const Primary: Story = {
  args: {
    open: true,
  },
};

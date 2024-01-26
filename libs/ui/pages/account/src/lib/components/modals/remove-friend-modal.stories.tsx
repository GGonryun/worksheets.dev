import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { RemoveFriendModal } from './remove-friend-modal';

type Story = Meta<typeof RemoveFriendModal>;

const Default: Story = {
  component: RemoveFriendModal,
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

import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { AddFriendModal } from './add-friend-modal';

type Story = Meta<typeof AddFriendModal>;

const Default: Story = {
  component: AddFriendModal,
  args: {
    onClose: action('onClose'),
    onAdd: action('onAdd'),
  },
};
export default Default;

export const Primary: Story = {
  args: {
    open: true,
    friendUsername: 'my-friend',
  },
};

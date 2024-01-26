import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { DeleteAccountModal } from './delete-account-modal';

type Story = Meta<typeof DeleteAccountModal>;

const Default: Story = {
  component: DeleteAccountModal,
  args: {
    open: true,
    onClose: action('onClose'),
    onDelete: action('onDelete'),
  },
};
export default Default;

export const Primary: Story = {
  args: {},
};

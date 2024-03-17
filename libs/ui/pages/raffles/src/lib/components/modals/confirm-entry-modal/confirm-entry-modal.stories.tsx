import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { ConfirmEntryModal } from './confirm-entry-modal';

type Story = Meta<typeof ConfirmEntryModal>;

const Default: Story = {
  component: ConfirmEntryModal,
  args: {
    onClose: action('onClose'),
    onConfirm: action('onConfirm'),
  },
};
export default Default;

export const Single: Story = {
  args: {
    open: true,
  },
};

export const Many: Story = {
  args: {
    open: true,
  },
};

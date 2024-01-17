import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { ClearStorageModal } from './clear-storage-modal';

type Story = Meta<typeof ClearStorageModal>;

const Default: Story = {
  component: ClearStorageModal,
  args: {
    open: true,
    onClose: action('onClose'),
    onClear: action('onClear'),
  },
};
export default Default;

export const Primary: Story = {
  args: {},
};

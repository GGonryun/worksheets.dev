import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { ClaimGiftModal } from './claim-gift-modal';

type Story = Meta<typeof ClaimGiftModal>;

const Default: Story = {
  component: ClaimGiftModal,
  args: {
    onClose: action('onClose'),
  },
};
export default Default;

export const Primary: Story = {
  args: {
    open: true,
    amount: 637,
  },
};

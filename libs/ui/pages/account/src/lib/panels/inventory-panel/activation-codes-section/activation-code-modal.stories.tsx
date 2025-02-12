import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { RedemptionCodeModal } from './redemption-code-modal';

type Story = Meta<typeof RedemptionCodeModal>;

const Default: Story = {
  component: RedemptionCodeModal,
  args: {
    onClose: action('onClose'),
  },
};
export default Default;

export const Primary: Story = {
  args: {
    open: true,
    prize: {
      id: '123',
      name: 'Prize Name',
      imageUrl: 'https://via.placeholder.com/150',
    },
    code: '123456-131847-0384-3248',
  },
};

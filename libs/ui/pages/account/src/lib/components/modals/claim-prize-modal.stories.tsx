import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import { minutesAgo, minutesFromNow } from '@worksheets/util/time';

import { ClaimPrizeModal } from './claim-prize-modal';

type Story = Meta<typeof ClaimPrizeModal>;

const Default: Story = {
  component: ClaimPrizeModal,
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
      expiredAt: minutesAgo(500).getTime(),
      claimBy: minutesFromNow(500).getTime(),
      claimedAt: undefined,
    },
  },
};

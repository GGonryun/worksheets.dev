import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { ShareRaffleModal } from './share-raffle-modal';

const Story: Meta<typeof ShareRaffleModal> = {
  component: ShareRaffleModal,
  args: {
    open: true,
    onClose: action('onClose'),
    id: '123',
    name: 'Test Prize',
  },
};
export default Story;

export const Primary = {
  args: {},
};

import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { SharePrizeModal } from './share-prize-modal';

const Story: Meta<typeof SharePrizeModal> = {
  component: SharePrizeModal,
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

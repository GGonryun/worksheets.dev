import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { CannotVoteModal } from './cannot-vote-modal';

const Story: Meta<typeof CannotVoteModal> = {
  component: CannotVoteModal,
  args: {
    open: true,
    onClose: action('onClose'),
    href: '#',
  },
};
export default Story;

export const Primary = {};

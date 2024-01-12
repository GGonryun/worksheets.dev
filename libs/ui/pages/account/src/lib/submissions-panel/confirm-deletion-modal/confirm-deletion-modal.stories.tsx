import { GameSubmissionStatus } from '@prisma/client';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { ConfirmDeletionModal } from './confirm-deletion-modal';

type Story = Meta<typeof ConfirmDeletionModal>;

const Default: Story = {
  component: ConfirmDeletionModal,
  args: {
    submission: {
      id: '4',
      slug: null,
      title: 'Word Smith',
      status: GameSubmissionStatus.PENDING,
      thumbnail: '/games/word-smith/icon.jpg',
      tooltip: 'This game is currently pending approval.',
    },
    onConfirm: action('onConfirm'),
    onCancel: action('onCancel'),
  },
};
export default Default;

export const Primary: Story = {
  args: {},
};

import { Box } from '@mui/material';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { BaseModal } from './base-modal';

const Story: Meta<typeof BaseModal> = {
  component: BaseModal,
};
export default Story;

export const Primary = {
  args: {
    open: true,
    onClose: action('onClose'),
    children: <Box p={3}>This is a basic modal</Box>,
  },
};

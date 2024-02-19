import { Alert } from '@mui/material';
import type { Meta } from '@storybook/react';
import { routes } from '@worksheets/ui/routes';

import { LoginToEarnTokensSnackbarMessage } from './login-to-earn-tokens';

const meta: Meta<typeof LoginToEarnTokensSnackbarMessage> = {
  component: LoginToEarnTokensSnackbarMessage,

  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          padding: 16,
        }}
      >
        <Alert severity="info" variant="filled">
          <Story />
        </Alert>
      </div>
    ),
  ],
};
export default meta;

export const Primary = {
  args: {
    href: routes.login.path(),
  },
};

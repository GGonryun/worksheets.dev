import Paper from '@mui/material/Paper';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import {
  BasicInformationFormContextProvider,
  DEFAULT_VALUES,
  ERROR_VALUES,
  PREFILLED_VALUES,
} from './context';
import { SettingsPanel } from './settings-panel';

type Story = Meta<typeof SettingsPanel>;

const Default: Story = {
  component: SettingsPanel,
  args: {
    onClearLocalStorage: action('onClearLocalStorage'),
    onDeleteAccount: action('onDeleteAccount'),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
          padding: '2rem',
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Story />
        </Paper>
      </div>
    ),
  ],
};
export default Default;

export const Empty: Story = {
  args: {},
  decorators: [
    (Story) => (
      <BasicInformationFormContextProvider value={DEFAULT_VALUES(action)}>
        <Story />
      </BasicInformationFormContextProvider>
    ),
  ],
};

export const WithErrors: Story = {
  args: {},
  decorators: [
    (Story) => (
      <BasicInformationFormContextProvider value={ERROR_VALUES(action)}>
        <Story />
      </BasicInformationFormContextProvider>
    ),
  ],
};

export const WithValues: Story = {
  args: {},
  decorators: [
    (Story) => (
      <BasicInformationFormContextProvider
        value={{
          ...PREFILLED_VALUES(action),
        }}
      >
        <Story />
      </BasicInformationFormContextProvider>
    ),
  ],
};

export const WithUpdates: Story = {
  args: {},
  decorators: [
    (Story) => (
      <BasicInformationFormContextProvider
        value={{
          ...PREFILLED_VALUES(action),
          isUpdated: () => true,
        }}
      >
        <Story />
      </BasicInformationFormContextProvider>
    ),
  ],
};

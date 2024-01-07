import type { Meta } from '@storybook/react';
import { GameSubmissionScreen } from './game-submission-screen';
import { FormContextProvider } from './submit-game-form/context';
import { defaultValues } from '../__mocks__';

type Story = Meta<typeof GameSubmissionScreen>;

const Default: Story = {
  component: GameSubmissionScreen,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
        }}
      >
        <Story />
      </div>
    ),
    (Story) => (
      <FormContextProvider value={defaultValues}>
        <Story />
      </FormContextProvider>
    ),
  ],
};
export default Default;

export const Primary = {
  args: {
    invalidProfile: false,
  },
};

export const InvalidProfile = {
  args: {
    invalidProfile: true,
  },
};

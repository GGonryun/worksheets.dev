import type { Meta } from '@storybook/react';
import { SubmitGameForm } from './submit-game-form';

const Story: Meta<typeof SubmitGameForm> = {
  component: SubmitGameForm,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100%',
          padding: '16px',
        }}
      >
        <div
          style={{
            padding: '16px',
            backgroundColor: 'white',
            height: '100%',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {
    errors: {},
  },
};

export const BasicErrors = {
  args: {
    errors: {
      'game-id': 'That Game ID is already taken. Please choose another.',
    },
  },
};

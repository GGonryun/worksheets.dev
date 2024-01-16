import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { ErrorComponent } from './error-component';

const Story: Meta<typeof ErrorComponent> = {
  component: ErrorComponent,
  args: {
    onRetry: action('onRetry'),
  },
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
  ],
};
export default Story;

export const Empty = {
  args: {},
};

export const Primary = {
  args: {
    message:
      'This is an error message. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export const NoRetry = {
  args: {
    onRetry: undefined,
  },
};

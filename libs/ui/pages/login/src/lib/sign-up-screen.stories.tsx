import type { Meta } from '@storybook/react';
import { SignUpScreen } from './sign-up-screen';

const Story: Meta<typeof SignUpScreen> = {
  component: SignUpScreen,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {},
};

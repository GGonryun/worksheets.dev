import type { Meta } from '@storybook/react';
import { LoginScreen } from './login-screen';

const Story: Meta<typeof LoginScreen> = {
  component: LoginScreen,
  title: 'Content/LoginScreen',
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

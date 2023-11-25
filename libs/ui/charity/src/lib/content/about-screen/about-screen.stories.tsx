import type { Meta } from '@storybook/react';
import { AboutScreen } from './about-screen';

const Story: Meta<typeof AboutScreen> = {
  component: AboutScreen,
  title: 'Content/AboutScreen',
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

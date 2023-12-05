import type { Meta } from '@storybook/react';
import { AccountScreen } from './account-screen';

const Story: Meta<typeof AccountScreen> = {
  component: AccountScreen,
  title: 'Content/AccountScreen',
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

export const Empty = {
  args: {
    recent: [],
  },
};

export const Primary = {
  args: {
    recent: Array.from({ length: 5 }).map((_, i) => ({
      type: 'game' as const,
      id: `${i}`,
      name: 'Game ' + i,
    })),
  },
};

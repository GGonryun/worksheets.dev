import type { Meta } from '@storybook/react';

import { SearchBar } from './search-bar';

const Story: Meta<typeof SearchBar> = {
  component: SearchBar,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '700px',
          height: 'auto',
          backgroundColor: 'red',
          padding: '20px',
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

export const WithText = {
  args: {
    value: 'I have content',
  },
};

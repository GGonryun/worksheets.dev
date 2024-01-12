import type { Meta } from '@storybook/react';

import { UnderConstruction } from './under-construction';

const Story: Meta<typeof UnderConstruction> = {
  component: UnderConstruction,
  title: 'Content/UnderConstruction',
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

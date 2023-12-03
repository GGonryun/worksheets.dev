import type { Meta } from '@storybook/react';
import { WebsiteFooter } from './footer';

const Story: Meta<typeof WebsiteFooter> = {
  component: WebsiteFooter,
  title: 'Layout/WebsiteFooter',
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '100vh',
        }}
      >
        <div
          style={{
            height: '50vh',
          }}
        />
        <Story />
      </div>
    ),
  ],
};
export default Story;

export const Primary = {
  args: {},
};

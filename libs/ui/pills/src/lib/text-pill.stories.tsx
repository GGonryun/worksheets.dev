import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { TextPill } from './text-pill';

type Story = StoryObj<typeof TextPill>;
type StoryDecorator = Decorator<Story>;

const basic: StoryDecorator = (Story) => (
  <div style={{ backgroundColor: 'orange', padding: 10, height: 80 }}>
    <Story />
  </div>
);

const smallWidth: StoryDecorator = (Story) => (
  <div
    style={{
      width: 288,
    }}
  >
    <Story />
  </div>
);

const meta: Meta<typeof TextPill> = {
  component: TextPill,
  title: 'Pills/TextPill',
};

export default meta;

export const Primary = {
  args: {
    text: 'Solitaire Games',
  },
  decorators: [basic],
};

export const Overflow = {
  args: {
    text: 'Solitaire Games',
  },
  decorators: [basic, smallWidth],
};

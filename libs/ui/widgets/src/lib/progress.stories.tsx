import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { ProgressWidget } from './progress';

type Story = StoryObj<typeof ProgressWidget>;
type StoryDecorator = Decorator<Story>;

const basic: StoryDecorator = (Story) => (
  <div style={{ padding: 10, height: 80 }}>
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

const meta: Meta<typeof ProgressWidget> = {
  component: ProgressWidget,
  title: 'Widgets/ProgressWidget',
};

export default meta;

export const Primary = {
  args: {
    current: 1374,
    required: 2000,
  },
  decorators: [basic],
};

export const Overflow = {
  args: {
    current: 30,
    required: 100,
  },
  decorators: [basic, smallWidth],
};

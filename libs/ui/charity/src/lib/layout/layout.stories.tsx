import type { Meta } from '@storybook/react';
import { Layout } from './layout';

const Story: Meta<typeof Layout> = {
  component: Layout,
  title: 'Layout/WebsiteLayout',
  decorators: [],
};
export default Story;

export const Primary = {
  args: {},
};

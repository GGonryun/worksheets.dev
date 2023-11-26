import type { Meta } from '@storybook/react';
import { SecondaryLink } from './secondary-link';

const Story: Meta<typeof SecondaryLink> = {
  component: SecondaryLink,
  title: 'Links/SecondaryLink',
};
export default Story;

export const Primary = {
  args: {
    children: 'This is a secondary link',
  },
};

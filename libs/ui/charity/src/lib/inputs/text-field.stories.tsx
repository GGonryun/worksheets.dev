import type { Meta } from '@storybook/react';
import { TextField } from './text-field';

const Story: Meta<typeof TextField> = {
  component: TextField,
  title: 'Inputs/TextField',
};
export default Story;

export const Primary = {
  args: {},
};

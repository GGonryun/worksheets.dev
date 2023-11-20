import type { Meta } from '@storybook/react';
import { DefaultInputBase } from './default-input-base';
import { InputAdornment } from '@mui/material';

const Story: Meta<typeof DefaultInputBase> = {
  component: DefaultInputBase,
  title: 'Inputs/DefaultInputBase',
};
export default Story;

export const Primary = {
  args: {},
};

export const EndAdornment = {
  args: {
    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
  },
};

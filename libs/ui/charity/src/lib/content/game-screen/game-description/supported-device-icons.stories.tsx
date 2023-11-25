import type { Meta } from '@storybook/react';
import { SupportedDeviceIcons } from './supported-device-icons';

const Story: Meta<typeof SupportedDeviceIcons> = {
  component: SupportedDeviceIcons,
  title: 'Content/GameScreen/GameDescription/SupportedDeviceIcons',
};
export default Story;

export const None = {
  args: {
    platforms: [],
  },
};

export const Mobile = {
  args: {
    platforms: ['mobile'],
  },
};

export const Desktop = {
  args: {
    platforms: ['desktop'],
  },
};

export const Both = {
  args: {
    platforms: ['mobile', 'desktop'],
  },
};

import type { Meta } from '@storybook/react';
import { BannerBox } from './banner-box';
import {
  Favorite,
  LocalFireDepartmentOutlined,
  Replay,
} from '@mui/icons-material';
import { Typography } from '@mui/material';

const Story: Meta<typeof BannerBox> = {
  component: BannerBox,
  title: 'Games/BannerBox',
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#bee',
          width: '150px',
          height: '150px',
        }}
      >
        <div
          style={{
            position: 'relative',
            backgroundColor: '#ddd',
            width: '120px',
            height: '120px',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
};
export default Story;

export const Text = {
  args: {
    children: <Typography fontFamily={'Montserrat'}>Hello World!</Typography>,
  },
};
export const Icon = {
  args: {
    children: (
      <Favorite
        sx={{
          color: 'love.main',
        }}
      />
    ),
  },
};

export const Popular = {
  args: {
    children: <LocalFireDepartmentOutlined color="error" />,
  },
};

export const RecentlyPlayed = {
  args: {
    children: <Replay color="primary" />,
  },
};

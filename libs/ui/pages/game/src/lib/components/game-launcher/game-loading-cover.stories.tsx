import type { Decorator, Meta, StoryObj } from '@storybook/react';

import { GameLoadingCover, GameLoadingCoverProps } from './game-loading-cover';

const meta: Meta<typeof GameLoadingCover> = {
  component: GameLoadingCover,
};
export default meta;

type Story = StoryObj<typeof GameLoadingCover>;
type StoryDecorator = Decorator<Story>;

const responsive: StoryDecorator = (Story) => (
  <div
    style={{
      width: '100%',
      height: '100vh',
      border: `2px solid black`,
      boxSizing: 'border-box',
      borderRadius: '8px',
      overflow: 'hidden',
    }}
  >
    <Story />
  </div>
);

const size1024x768: StoryDecorator = (Story) => (
  <div
    style={{
      width: 1024,
      height: 768,
      border: `2px solid black`,
      borderRadius: '8px',
      overflow: 'hidden',
    }}
  >
    <Story />
  </div>
);

const sizeSquare: StoryDecorator = (Story) => (
  <div
    style={{
      width: 360,
      height: 360,
      border: `2px solid black`,
      borderRadius: '8px',
      overflow: 'hidden',
    }}
  >
    <Story />
  </div>
);

const baseProps: Partial<GameLoadingCoverProps> = {
  backgroundUrl: '/games/solitaire/banner.png',
  iconUrl: '/games/solitaire/icon.jpg',
  name: 'Solitaire',
};

export const Responsive = {
  args: baseProps,
  decorators: [responsive],
};

export const Window1024x768 = {
  args: baseProps,
  decorators: [size1024x768],
};

export const WindowSquare = {
  args: { ...baseProps },
  decorators: [sizeSquare],
};
export const NoMobile = {
  args: {
    ...baseProps,
    platforms: ['desktop'],
    orientations: ['landscape', 'portrait'],
    isMobileOrTablet: true,
    deviceOrientation: 'portrait-primary',
  },
  decorators: [sizeSquare],
};

export const NoPortrait = {
  args: {
    ...baseProps,
    platforms: ['desktop', 'mobile'],
    orientations: ['landscape'],
    isMobileOrTablet: true,
    deviceOrientation: 'portrait-primary',
  },
  decorators: [sizeSquare],
};

export const NoLandscape = {
  args: {
    ...baseProps,
    platforms: ['desktop', 'mobile'],
    orientations: ['portrait'],
    isMobileOrTablet: true,
    deviceOrientation: 'landscape-primary',
  },
  decorators: [sizeSquare],
};

// 1031, 580
// 836, 470
// 640, 360

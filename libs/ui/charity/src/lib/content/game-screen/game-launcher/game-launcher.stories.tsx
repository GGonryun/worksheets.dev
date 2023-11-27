import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { GameLauncher, GameLauncherProps } from './game-launcher';

const meta: Meta<typeof GameLauncher> = {
  component: GameLauncher,
  title: 'Content/GameLauncher',
};
export default meta;

type Story = StoryObj<typeof GameLauncher>;
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

const iPhoneSEVertical: StoryDecorator = (Story) => (
  <div
    style={{
      width: 375,
      height: 667,
      border: `2px solid black`,
      borderRadius: '8px',
      overflow: 'hidden',
    }}
  >
    <Story />
  </div>
);

const iPhoneSEHorizontal: StoryDecorator = (Story) => (
  <div
    style={{
      width: 667,
      height: 375,
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

const baseProps: Partial<GameLauncherProps> = {
  backgroundUrl: 'https://storage.googleapis.com/game-art/solitaire/banner.png',
  iconUrl: 'https://storage.googleapis.com/game-art/solitaire/icon.jpg',
  name: 'Solitaire',
  developer: 'Charity.Games',
  file: {
    type: 'iframe',
    url: 'https://charity.games',
  },
};

export const Responsive = {
  args: baseProps,
  decorators: [responsive],
};
export const RedirectResponsive = {
  args: {
    ...baseProps,
    file: {
      type: 'redirect',
      url: 'https://charity.games',
    },
  },
  decorators: [responsive],
};

export const Window1024x768 = {
  args: baseProps,
  decorators: [size1024x768],
};

export const VerticalPhone = {
  args: baseProps,
  decorators: [iPhoneSEVertical],
};

export const HorizontalPhone = {
  args: baseProps,
  decorators: [iPhoneSEHorizontal],
};

export const WindowSquare = {
  args: { ...baseProps, small: true },
  decorators: [sizeSquare],
};

// 1031, 580
// 836, 470
// 640, 360

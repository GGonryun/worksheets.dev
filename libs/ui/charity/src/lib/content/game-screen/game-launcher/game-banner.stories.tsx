import type { Meta } from '@storybook/react';
import { GameBanner, GameBannerProps } from './game-banner';

const meta: Meta<typeof GameBanner> = {
  component: GameBanner,
  title: 'Content/GameLauncher/GameBanner',
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'lightblue',
          padding: 16,
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;

const baseProps: Partial<GameBannerProps> = {
  iconUrl: 'https://storage.googleapis.com/game-art/solitaire/icon.jpg',
  name: 'Solitaire',
  developer: 'Charity.Games',
};

export const Responsive = {
  args: baseProps,
};

export const LongName = {
  args: {
    ...baseProps,
    name: 'Solitaire: The Ultra-Classic Card Game',
    developer: 'Charity.Games is the best game developer in the world',
  },
};
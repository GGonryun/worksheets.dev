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
  iconUrl: '/games/solitaire/icon.jpg',
  name: 'Solitaire',
  developer: 'Charity.Games',
  type: 'iframe',
  plays: '1.3m',
  upVotes: '37.2k',
  downVotes: '1.2k',
  favorites: '312',
  isFavorite: false,
  userVote: null,
};

export const ResponsiveIFrameBanner = {
  args: baseProps,
};

export const FavoriteGame = {
  args: { ...baseProps, isFavorite: true },
};
export const LikedGame = {
  args: { ...baseProps, userVote: 'up' },
};

export const DislikedGame = {
  args: { ...baseProps, userVote: 'down' },
};

export const ResponsiveRedirectBanner = {
  args: { ...baseProps, type: 'redirect' },
};

export const LongName = {
  args: {
    ...baseProps,
    name: 'Solitaire: The Ultra-Classic Card Game',
    developer: 'Charity.Games is the best game developer in the world',
  },
};

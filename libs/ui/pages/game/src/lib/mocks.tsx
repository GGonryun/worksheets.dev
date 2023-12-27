import {
  DeveloperSchema,
  GameAnalyticsSchema,
  GamePlayerSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { GameDescription } from './game-description';
import { GameLauncher } from './game-launcher';

export const sampleTopPlayers: GamePlayerSchema[] = [
  { id: `1`, username: 'Player 1', plays: `200` },
  { id: `2`, username: 'Player 2', plays: `100` },
  { id: `3`, username: 'Player 3', plays: `50` },
  { id: `4`, username: 'Player 4', plays: `25` },
  { id: `5`, username: 'Player 5', plays: `10` },
];

export const sampleDeveloper: DeveloperSchema = {
  id: '1',
  name: 'Charity Games',
  description:
    'Charity Games is a non-profit organization. Lorem ipsum dolor sit amet, consectetus adipiscing elit. Nullam auctor, eros vitae aliquet aliquet, ipsum elit lacinia nunc, quis ultricies nisl nunc vitae nisl.',
  avatarUrl: '/common/charity-games/logos/square.png',
  socials: {},
};

export const sampleAnalytics: GameAnalyticsSchema = {
  plays: '1.3m',
  score: '3.5',
  votes: {
    up: '32.2k',
    down: '12.2k',
  },
  favorites: '1k',
  topPlayers: sampleTopPlayers,
};

export const sampleGame: SerializableGameSchema = {
  id: 'solitaire',
  name: 'Solitaire',
  orientations: ['landscape', 'portrait'],
  platforms: ['mobile', 'desktop'],
  developerId: sampleDeveloper.id,
  bannerUrl: '/games/solitaire/banner.png',
  iconUrl: '/games/solitaire/icon.jpg',
  file: {
    type: 'iframe',
    url: 'https://solitaire.charity.games/',
  },
  tags: ['card', 'brain', 'board', 'puzzle'],
  category: ['card'],
  qualifier: 'new',
  size: 2,
  markets: {
    android:
      'https://play.google.com/store/apps/details?id=com.charitygames.solitaire',
    ios: 'https://apps.apple.com/us/app/solitaire/id1569874085',
    steam: 'https://store.steampowered.com/widget/500',
    itch: 'https://itch.io/embed/2257102',
  },
  createdAt: 'October 2023',
  updatedAt: 'October 2023',
  description: `
    Solitaire is a card game that you play by yourself. You only need a standard deck of 52 cards to play, so it's a great game to play when traveling alone or just when you are bored and want something to do. There are a lot of different types of solitaire you can play.
  
    ### How to Play Solitaire?
    The goal of solitaire is to get all 52 cards into four piles, each arranged by suit and in order from ace to king. Game play varies depending on the type of solitaire you play, but the main goal is always the same: to get all cards into the correct order.
  
    ### Who created Solitaire?
    The first known solitaire game rules were recorded during the Napoleonic era. The author of the first known solitaire rules was Lady Adelaide Cadogan, who wrote her rules in the late 1870s or early 1880s. Lady Cadogan's book was titled Illustrated Games of Patience and it was published in the United Kingdom in 1875. The book was very popular among the upper classes and eventually became known as The Solitaire Bible.
  
    ### Controls
    - Click and drag to move cards
    - Double click to move cards to the foundation
    - Click on the deck to draw cards
    `,
};

export const SampleGameLauncher = () => (
  <GameLauncher
    game={sampleGame}
    analytics={sampleAnalytics}
    developer={sampleDeveloper}
    onFavorite={() => alert('TODO: add to favorites')}
    onPlay={() => alert('TODO: show play form')}
    onVote={() => alert('TODO: handle vote')}
    onViewGamePlay={() => alert('TODO: handle view game play')}
    isFavorite={true}
    userVote={'up'}
  />
);

export const SampleGameDescription = () => (
  <GameDescription
    game={sampleGame}
    analytics={sampleAnalytics}
    developer={sampleDeveloper}
  />
);

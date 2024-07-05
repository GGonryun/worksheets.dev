import common from '@worksheets/assets-common';
import {
  DeveloperSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';

import { GameLauncher } from './game-launcher';

export const sampleDeveloper: DeveloperSchema = {
  id: '1',
  name: 'Charity Games',
  description:
    'Charity Games is a non-profit organization. Lorem ipsum dolor sit amet, consectetus adipiscing elit. Nullam auctor, eros vitae aliquet aliquet, ipsum elit lacinia nunc, quis ultricies nisl nunc vitae nisl.',
  avatarUrl: common.charityGames.logos.square,
  socials: {},
};

export const sampleGame: SerializableGameSchema = {
  id: 'solitaire',
  name: 'Solitaire',
  plays: 530123,
  likes: 126634,
  dislikes: 5125,
  multiplier: 0,
  cloudStorage: false,
  leaderboard: false,
  loot: [],
  achievements: false,
  viewport: {
    id: '1',
    type: 'RESPONSIVE',
    devices: ['MOBILE', 'COMPUTER'],
    orientations: ['LANDSCAPE', 'PORTRAIT'],
  },
  developerId: sampleDeveloper.id,
  bannerUrl: '/games/solitaire/banner.png',
  iconUrl: '/games/solitaire/icon.jpg',
  file: {
    type: 'HTML',
    url: 'https://solitaire.charity.games/',
  },
  trailer: null,
  categories: ['card', 'brain', 'board', 'puzzle'],
  markets: {
    android:
      'https://play.google.com/store/apps/details?id=com.charitygames.solitaire',
    ios: 'https://apps.apple.com/us/app/solitaire/id1569874085',
    steam: 'https://store.steampowered.com/widget/500',
    itch: 'https://itch.io/embed/2257102',
  },
  createdAt: 'October 2023',
  updatedAt: 'October 2023',
  description: `<p>Solitaire is a card game that you play by yourself. You only need a standard deck of 52 cards to play, so it's a great game to play when traveling alone or just when you are bored and want something to do. There are a lot of different types of solitaire you can play.</p><br/><h3>How to Play Solitaire?</h3><p>The goal of solitaire is to get all 52 cards into four piles, each arranged by suit and in order from ace to king. Game play varies depending on the type of solitaire you play, but the main goal is always the same: to get all cards into the correct order.</p><br/><h3>Who created Solitaire?</h3><p>The first known solitaire game rules were recorded during the Napoleonic era. The author of the first known solitaire rules was Lady Adelaide Cadogan, who wrote her rules in the late 1870s or early 1880s. Lady Cadogan's book was titled Illustrated Games of Patience and it was published in the United Kingdom in 1875. The book was very popular among the upper classes and eventually became known as The Solitaire Bible.</p><br/><h3>Controls</h3><ul><li>Click and drag to move cards</li><li>Double click to move cards to the foundation</li><li>Click on the deck to draw cards</li></ul>`,
};

export const SampleGameLauncher = () => (
  <GameLauncher
    status={'authenticated'}
    game={sampleGame}
    developer={sampleDeveloper}
    onPlay={() => alert('TODO: show play form')}
    onVote={() => alert('TODO: handle vote')}
    userVote={'up'}
  />
);

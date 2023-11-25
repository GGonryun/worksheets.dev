import { GameDescription } from '../content/game-screen/game-description';

export const SampleGameDescription = () => (
  <GameDescription
    title="Solitaire"
    developer={{ id: '1', name: 'Charity.Games' }}
    platforms={['mobile', 'desktop']}
    tags={['card', 'single-player', 'brain', 'board', 'puzzle']}
    category={['card']}
    created="October 2023"
    updated="October 2023"
    text={`
    Solitaire is a card game that you play by yourself. You only need a standard deck of 52 cards to play, so it's a great game to play when traveling alone or just when you are bored and want something to do. There are a lot of different types of solitaire you can play.
  
    ### How to Play Solitaire?
    The goal of solitaire is to get all 52 cards into four piles, each arranged by suit and in order from ace to king. Gameplay varies depending on the type of solitaire you play, but the main goal is always the same: to get all cards into the correct order.
  
    ### Who created Solitaire?
    The first known solitaire game rules were recorded during the Napoleonic era. The author of the first known solitaire rules was Lady Adelaide Cadogan, who wrote her rules in the late 1870s or early 1880s. Lady Cadogan's book was titled Illustrated Games of Patience and it was published in the United Kingdom in 1875. The book was very popular among the upper classes and eventually became known as The Solitaire Bible.
  
    ### Controls
    - Click and drag to move cards
    - Double click to move cards to the foundation
    - Click on the deck to draw cards
    `}
    markets={{
      android:
        'https://play.google.com/store/apps/details?id=com.charitygames.solitaire',
      ios: 'https://apps.apple.com/us/app/solitaire/id1569874085',
      steam: 'https://store.steampowered.com/widget/500',
      itch: 'https://itch.io/embed/2257102',
    }}
  />
);

export const sampleMixedGridItems = () => [
  ...Array.from({ length: 3 }).map((_, i) => ({
    type: 'category' as const,
    id: `${i}`,
    name: 'Category ' + i,
  })),
  ...Array.from({ length: 20 }).map((_, i) => ({
    type: 'game' as const,
    id: `${i}`,
    name: 'Game ' + i,
    imageUrl: i % 15 === 1 ? 'https://via.placeholder.com/150' : undefined,
    span: i % 7 === 3 ? 2 : i % 17 === 7 ? 3 : 1,
  })),
  ...Array.from({ length: 3 }).map((_, i) => ({
    type: 'category' as const,
    id: `${i}`,
    name: 'Category ' + i + 3,
  })),
  ...Array.from({ length: 20 }).map((_, i) => ({
    type: 'game' as const,
    id: `${i + 20}`,
    name: 'Game ' + i + 20,
    imageUrl: i % 15 === 1 ? 'https://via.placeholder.com/150' : undefined,
    span: i % 7 === 3 ? 2 : i % 17 === 7 ? 3 : 1,
  })),
  ...Array.from({ length: 3 }).map((_, i) => ({
    type: 'category' as const,
    id: `${i + 6}`,
    name: 'Category ' + i + 6,
  })),
  ...Array.from({ length: 5 }).map((_, i) => ({
    type: 'game' as const,
    id: `${i + 40}`,
    name: 'Game ' + i + 40,
    imageUrl: i % 15 === 1 ? 'https://via.placeholder.com/150' : undefined,
    span: 1,
  })),
];

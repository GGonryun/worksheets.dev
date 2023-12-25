import { GameDescription } from './game-description';
import { GameLauncher } from './game-launcher';

export const SampleGameLauncher = () => (
  <GameLauncher
    backgroundUrl={'/games/solitaire/banner.png'}
    iconUrl={'/games/solitaire/icon.jpg'}
    file={{
      type: 'iframe',
      url: 'https://solitaire.charity.games/',
    }}
    name={'Solitaire'}
    orientations={['landscape', 'portrait']}
    developer={'Charity.Games'}
    onReportBug={() => alert('TODO: show bug report form')}
    onPlay={() => alert('TODO: show play form')}
    platforms={['mobile', 'desktop']}
  />
);

export const SampleGameDescription = () => (
  <GameDescription
    gameId="1"
    title="Solitaire"
    developer={{ id: '1', name: 'Charity.Games' }}
    platforms={['mobile', 'desktop']}
    tags={['card', 'brain', 'board', 'puzzle']}
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

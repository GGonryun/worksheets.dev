import { useState } from 'react';
import { SinglePlayerGame } from './Game';
import { GameOverOverlay } from './GameOver';
import { GameMenu, emojiCategories, selectRandomEmoji } from './GameMenu';
import { HowToPlay } from './HowToPlay';
import { EnemyDifficulty } from './controllers';

export const EmojiWar = () => {
  const [menu, setMenu] = useState(true);
  const [gameOver, setGameOver] = useState<number>(-1);
  const [restart, setRestart] = useState(false);
  const [displayGame, setDisplayGame] = useState(false);
  const [displayHowToPlay, setDisplayHowToPlay] = useState(false);
  const [difficulty, setDifficulty] = useState<EnemyDifficulty>('easy');
  const [emoji, setEmoji] = useState(emojiCategories[0].emojis[0]);
  const [enemyEmoji, setEnemyEmoji] = useState('💎');
  const [paused, setPaused] = useState(false);

  return (
    <>
      {menu ? (
        <GameMenu
          emoji={emoji}
          difficulty={difficulty}
          onUpdateEmoji={(emoji) => setEmoji(emoji)}
          onUpdateDifficulty={(difficulty) => setDifficulty(difficulty)}
          onStartGame={() => {
            setPaused(false);
            setMenu(false);
            setDisplayGame(true);
            setEnemyEmoji(selectRandomEmoji());
          }}
          onShowInstructions={() => {
            setDisplayHowToPlay(true);
            setMenu(false);
          }}
        />
      ) : null}

      {displayHowToPlay && (
        <HowToPlay
          onBack={() => {
            setDisplayHowToPlay(false);
            setMenu(true);
          }}
        />
      )}

      {gameOver !== -1 ? (
        <GameOverOverlay
          winner={gameOver}
          player={emoji}
          enemy={enemyEmoji}
          onRematch={() => {
            setEnemyEmoji(selectRandomEmoji());
            setRestart(true);
            setGameOver(-1);
          }}
          onReturnToMenu={() => {
            setPaused(true);
            setMenu(true);
            setRestart(true);
            setGameOver(-1);
          }}
        />
      ) : null}

      {displayGame && (
        <SinglePlayerGame
          emoji={emoji}
          enemy={enemyEmoji}
          restart={restart}
          difficulty={difficulty}
          onRestart={() => setRestart(false)}
          onGameOver={(slot) => {
            setGameOver(slot);
          }}
          onExitGame={() => {
            setPaused(true);
            setMenu(true);
            setRestart(true);
          }}
          paused={gameOver !== -1 || paused}
        />
      )}
    </>
  );
};

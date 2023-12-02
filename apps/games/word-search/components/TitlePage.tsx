import { FC, useState } from 'react';
import { GAME_TITLE } from '../util';
import { useRouter } from 'next/router';
import { usePuzzle } from '../hooks/usePuzzle';

import {
  OurMissionModal,
  SettingsModal,
  TitleContent,
  TitleFooter,
  TitleHeader,
  urls,
} from '@worksheets/ui-games';
import { puzzles } from '../puzzles';
import { Layout } from './Layout';
import Image from 'next/image';
import { assets } from '../util/assets';

export const MainMenu: FC = () => {
  const { push, reload } = useRouter();
  const [showMission, setShowMission] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const puzzle = usePuzzle();

  const handleStart = () => {
    // if the level is less than 0, then we need to start at the beginning
    push(urls.relative.puzzle);
    if (puzzle.level < 0) {
      puzzle.load(0);
    }
  };

  return (
    <>
      <Layout
        header={<TitleHeader onSettings={() => setShowSettings(true)} />}
        content={
          <TitleContent
            logo={
              <Image
                priority
                src={assets.logo}
                alt={'Logo'}
                height={159}
                width={300}
              />
            }
            startText={
              puzzle.level < 0
                ? `Start Game`
                : `Start Puzzle #${puzzle.level + 1}`
            }
            gameOver={puzzle.isGameOver}
            onStart={handleStart}
            onSettings={() => setShowSettings(true)}
          />
        }
        footer={<TitleFooter onShowMission={() => setShowMission(true)} />}
      />
      <OurMissionModal
        game={GAME_TITLE}
        open={showMission}
        onClose={() => setShowMission(false)}
      />

      <SettingsModal
        options={puzzles.map((p, i) => ({ id: i, label: p.theme }))}
        open={showSettings}
        onClose={() => setShowSettings(false)}
        onJumpTo={(level) => {
          puzzle.load(level);
          alert(`Loaded puzzle ${level + 1}, reloading...`);
          reload();
        }}
        onReset={() => {
          puzzle.reset();
          alert('Progress reset, reloading...');
          reload();
        }}
      />
    </>
  );
};

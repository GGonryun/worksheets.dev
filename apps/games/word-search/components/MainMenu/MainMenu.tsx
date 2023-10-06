import { FC, useState } from 'react';
import { Layout } from '../Layout';
import { MainMenuHeader } from './MainMenuHeader';
import { urls } from '../../util';
import { MainMenuFooter } from './MainMenuFooter';
import { OurMissionModal } from './OurMissionModal';
import { DonateWaterModal } from './DonateWaterModal';
import { useRouter } from 'next/router';
import { usePuzzle } from '../../hooks/usePuzzle';
import { MainMenuContent } from './MainMenuContent';
import { SettingsModal } from './SettingsModal';

export const MainMenu: FC = () => {
  const { push, reload } = useRouter();
  const [showMission, setShowMission] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const puzzle = usePuzzle();

  const handleStart = () => {
    // if the level is less than 0, then we need to start at the beginning
    push(urls.puzzle());
    if (puzzle.level < 0) {
      puzzle.load(0);
    }
  };

  return (
    <>
      <Layout
        content={
          <MainMenuContent
            gameOver={puzzle.isGameOver}
            water={puzzle.water}
            level={puzzle.level + 1}
            onDonate={() => setShowDonate(true)}
            onStart={handleStart}
            onSettings={() => setShowSettings(true)}
          />
        }
        header={
          <MainMenuHeader
            onSettings={() => setShowSettings(true)}
            onDonate={() => setShowDonate(true)}
          />
        }
        footer={<MainMenuFooter onShowMission={() => setShowMission(true)} />}
      />
      <OurMissionModal
        open={showMission}
        onClose={() => setShowMission(false)}
      />
      <DonateWaterModal
        open={showDonate}
        onClose={() => setShowDonate(false)}
      />
      <SettingsModal
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

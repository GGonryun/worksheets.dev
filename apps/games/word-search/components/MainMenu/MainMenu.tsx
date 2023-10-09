import { FC, useState } from 'react';
import { MainMenuHeader } from './MainMenuHeader';
import { urls } from '../../util';
import { MainMenuFooter } from './MainMenuFooter';
import { useRouter } from 'next/router';
import { usePuzzle } from '../../hooks/usePuzzle';
import { MainMenuContent } from './MainMenuContent';
import {
  DonateWaterModal,
  MobileLayout,
  OurMissionModal,
  SettingsModal,
  backgroundColor,
} from '@worksheets/ui-games';
import { useTheme } from '@mui/material';
import { puzzles } from '../../puzzles';

export const MainMenu: FC = () => {
  const { push, reload } = useRouter();
  const theme = useTheme();
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
      <MobileLayout
        backgroundColor={backgroundColor(theme)}
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

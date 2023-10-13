import { FC, useState } from 'react';
import { GAME_TITLE, urls } from '../../util';
import { useRouter } from 'next/router';
import {
  DonateWaterModal,
  MobileLayout,
  OurMissionModal,
  SettingsModal,
  backgroundColor,
} from '@worksheets/ui-games';
import { useTheme } from '@mui/material';
import { TitleContent } from './TitleContent';
import { useSavedPuzzle, useSavedSelections } from '../../hooks/useSaveData';
import { MainMenuHeader } from './TitleHeader';
import { MainMenuFooter } from './TitleFooter';
import { usePlayer } from '../../hooks/usePlayer';

export const TitlePage: FC = () => {
  const { push, reload } = useRouter();
  const theme = useTheme();
  const [showMission, setShowMission] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const puzzleState = useSavedPuzzle();
  const selectionsState = useSavedSelections();
  const playerState = usePlayer();

  const handleStart = () => {
    // if the level is less than 0, then we need to start at the beginning
    if (puzzleState.level < 0) {
      puzzleState.cacheLevel(0);
    }
    push(urls.puzzle());
  };

  return (
    <>
      <MobileLayout
        backgroundColor={backgroundColor(theme)}
        content={
          <TitleContent
            gameOver={
              puzzleState.level > puzzleState.maxLevel ||
              (puzzleState.level === puzzleState.maxLevel &&
                puzzleState.complete)
            }
            water={puzzleState.water}
            level={puzzleState.level + 1}
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
        game={GAME_TITLE}
        open={showMission}
        onClose={() => setShowMission(false)}
      />
      <DonateWaterModal
        game={GAME_TITLE}
        open={showDonate}
        onClose={() => setShowDonate(false)}
      />
      <SettingsModal
        open={showSettings}
        options={puzzleState.labels}
        onClose={() => setShowSettings(false)}
        onJumpTo={(level) => {
          puzzleState.cacheLevel(level);
          selectionsState.clearSelections();
          alert(`Loaded puzzle ${level + 1}, reloading...`);
          reload();
        }}
        onReset={() => {
          puzzleState.clear();
          selectionsState.clearSelections();
          playerState.clear();
          alert('Progress reset, reloading...');
          reload();
        }}
      />
    </>
  );
};

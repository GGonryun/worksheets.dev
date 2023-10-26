import { useRouter } from 'next/router';
import { Layout } from './Layout';
import { FC, useState } from 'react';
import { useSavedPuzzle, useSavedSelections } from '../hooks/useSaveData';
import { usePlayer } from '../hooks/usePlayer';
import {
  DonateWaterModal,
  OurMissionModal,
  SettingsModal,
  TitleContent,
  TitleFooter,
  TitleHeader,
  urls,
} from '@worksheets/ui-games';
import { GAME_TITLE } from '../util';
import Image from 'next/image';
import { assets } from '../util/assets';

export const TitlePage: FC = () => {
  const { push, reload } = useRouter();
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
    push(urls.relative.puzzle);
  };

  return (
    <>
      <Layout
        header={
          <TitleHeader
            onSettings={() => setShowSettings(true)}
            onDonate={() => setShowDonate(true)}
          />
        }
        content={
          <TitleContent
            logo={
              <Image
                priority
                src={assets.logo}
                alt={'Game Logo'}
                height={132}
                width={300}
              />
            }
            gameOver={
              puzzleState.level > puzzleState.maxLevel ||
              (puzzleState.level === puzzleState.maxLevel &&
                puzzleState.complete)
            }
            startText={
              puzzleState.level < 0
                ? `Start Game`
                : `Start Puzzle #${puzzleState.level + 1}`
            }
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

import { FC, useState } from 'react';
import { usePlayer } from '../hooks';
import {
  DonateWaterModal,
  OurMissionModal,
  SettingsModal,
  TitleContent,
  TitleFooter,
  TitleHeader,
  urls,
} from '@worksheets/ui-games';
import { GAME_TITLE } from '../constants';
import { Layout } from './Layout';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { assets } from '../assets';
import { puzzles } from '../puzzles';

export const TitlePage: FC = () => {
  const theme = useTheme();
  const { push } = useRouter();
  const [showMission, setShowMission] = useState(false);
  const [showDonateWater, setShowDonateWater] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { level, reset, loadPuzzle, isGameOver } = usePlayer();
  const handleStartPuzzle = () => {
    push(urls.relative.puzzle);
  };

  return (
    <>
      <Layout
        header={
          <TitleHeader
            color={theme.palette.primary.light}
            onDonate={() => setShowDonateWater(true)}
            onSettings={() => setShowSettings(true)}
          />
        }
        content={
          <TitleContent
            color={theme.palette.primary.light}
            onStart={handleStartPuzzle}
            onSettings={() => setShowSettings(true)}
            gameOver={isGameOver()}
            logo={
              <Image
                src={assets.logo}
                alt={'Game Logo'}
                height={165}
                width={350}
              />
            }
            startText={`Start Puzzle #${level + 1}`}
          />
        }
        footer={
          <TitleFooter
            color={theme.palette.primary.light}
            onShowMission={() => setShowMission(true)}
          />
        }
      />

      <OurMissionModal
        game="Puzzle Words"
        open={showMission}
        onClose={() => setShowMission(false)}
      />
      <DonateWaterModal
        game={GAME_TITLE}
        open={showDonateWater}
        onClose={() => setShowDonateWater(false)}
      />
      <SettingsModal
        options={puzzles.map((p, i) => ({
          id: i,
          label: `${p.letters.join('')}`,
        }))}
        onJumpTo={(puzzleId) => {
          loadPuzzle(puzzleId);
          setShowSettings(false);
        }}
        onReset={() => {
          reset();
          setShowSettings(false);
        }}
        open={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
};

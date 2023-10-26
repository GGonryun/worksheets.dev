import { FC, useState } from 'react';
import {
  DonateWaterModal,
  OurMissionModal,
  SettingsModal,
  TitleContent,
  TitleFooter,
  TitleHeader,
} from '@worksheets/ui-games';
import { GAME_TITLE } from '../util';
import { Layout } from './Layout';
import { usePlayer } from '../hooks/usePlayer';
import { SelectDifficultyModal } from './Modals/SelectDifficulty';
import { Typography, useTheme } from '@mui/material';

export const TitlePage: FC = () => {
  const theme = useTheme();
  const player = usePlayer();
  const [showMission, setShowMission] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDifficulty, setShowDifficulty] = useState(false);

  return (
    <>
      <Layout
        content={
          <TitleContent
            logo={
              <Typography
                color={theme.palette.primary.contrastText}
                fontWeight={900}
                variant="h3"
                sx={{
                  textShadow: '0 2px 2px rgba(0,0,0,0.3)',
                }}
              >
                Word Smith
              </Typography>
            }
            startText="Start Game"
            gameOver={false}
            onSettings={() => setShowSettings(true)}
            onStart={() => setShowDifficulty(true)}
          />
        }
        header={
          <TitleHeader
            onSettings={() => setShowSettings(true)}
            onDonate={() => setShowDonate(true)}
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
        options={[]}
        onClose={() => setShowSettings(false)}
        onJumpTo={() => {
          // does not support jumping to levels
        }}
        onReset={() => {
          player.clear();
        }}
      />
      <SelectDifficultyModal
        open={showDifficulty}
        onClose={() => setShowDifficulty(false)}
      />
    </>
  );
};

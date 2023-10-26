import { FC, useState } from 'react';
import {
  DonateWaterModal,
  MobileLayout,
  OurMissionModal,
  SettingsModal,
  TitleFooter,
  TitleHeader,
  backgroundColor,
  urls,
} from '@worksheets/ui-games';
import { useTheme } from '@mui/material';
import { TitleContent } from './TitleContent';
import { GAME_TITLE } from '../../util/constants';
import { useRouter } from 'next/router';
import { usePlayer } from '../../hooks/usePlayer';
import { useNonogramStorage } from '../../hooks/useNonogramStorage';

export const TitlePage: FC = () => {
  const { push, reload } = useRouter();
  const theme = useTheme();
  const [showDonate, setShowDonate] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const player = usePlayer();
  const storage = useNonogramStorage('tutorial1');

  return (
    <>
      <MobileLayout
        backgroundColor={backgroundColor(theme)}
        content={
          <TitleContent
            gameOver={player.gameOver}
            onLevels={() => push(urls.relative.levels)}
            onGallery={() => push(urls.relative.gallery)}
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
        open={showMission}
        onClose={() => setShowMission(false)}
        game={GAME_TITLE}
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
          alert('TODO: onJumpTo');
        }}
        onReset={() => {
          player.clear();
          storage.clear();
          alert('Data cleared. Page will reload.');
          reload();
        }}
      />
    </>
  );
};

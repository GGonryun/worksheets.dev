import { FC, useState } from 'react';
import {
  DonateWaterModal,
  MobileLayout,
  SettingsModal,
  backgroundColor,
} from '@worksheets/ui-games';
import { useTheme } from '@mui/material';
import { TitleContent } from './TitleContent';
import { TitleHeader } from './TitleHeader';
import { TitleFooter } from './TitleFooter';
import { GAME_TITLE, WATER_PER_LEVEL } from '../../util/constants';
import { useRouter } from 'next/router';
import { urls } from '../../util/urls';
import { usePlayer } from '../../hooks/usePlayer';
import { useNonogramStorage } from '../../hooks/useNonogramStorage';

export const TitlePage: FC = () => {
  const { push, reload } = useRouter();
  const theme = useTheme();
  const [showDonate, setShowDonate] = useState(false);
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
            onLevels={() => push(urls.levels())}
            onGallery={() => push(urls.gallery())}
          />
        }
        header={
          <TitleHeader
            water={player.completed.length * WATER_PER_LEVEL}
            onSettings={() => setShowSettings(true)}
            onDonate={() => setShowDonate(true)}
          />
        }
        footer={<TitleFooter />}
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

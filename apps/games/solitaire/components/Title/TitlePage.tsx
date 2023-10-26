import { FC, useState } from 'react';
import {
  DonateWaterModal,
  MobileLayout,
  SettingsModal,
  backgroundColor,
  urls,
} from '@worksheets/ui-games';
import { useTheme } from '@mui/material';
import { TitleContent } from './TitleContent';
import { TitleHeader } from './TitleHeader';
import { TitleFooter } from './TitleFooter';
import { GAME_TITLE, WATER_PER_GAME } from '../../util/constants';
import { useRouter } from 'next/router';
import { usePlayer } from '../../hooks/usePlayer';

export const TitlePage: FC = () => {
  const { push, reload } = useRouter();
  const theme = useTheme();
  const [showDonate, setShowDonate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const player = usePlayer();

  return (
    <>
      <MobileLayout
        backgroundColor={backgroundColor(theme)}
        content={<TitleContent onStart={() => push(urls.relative.play)} />}
        header={
          <TitleHeader
            water={player.gamesPlayed * WATER_PER_GAME}
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
          alert('Data cleared. Page will reload.');
          reload();
        }}
      />
    </>
  );
};

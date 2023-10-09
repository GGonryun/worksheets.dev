import { FC, useState } from 'react';
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
import { MainMenuHeader } from './TitleHeader';
import { MainMenuFooter } from './TitleFooter';
import { urls } from '../../util';

export const TitlePage: FC = () => {
  const { push } = useRouter();
  const theme = useTheme();
  const [showMission, setShowMission] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleStart = () => {
    push(urls.puzzle());
  };

  return (
    <>
      <MobileLayout
        backgroundColor={backgroundColor(theme)}
        content={
          <TitleContent
            gameOver={false}
            water={0}
            level={1}
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
        options={[]}
        onClose={() => setShowSettings(false)}
        onJumpTo={(level) => {
          alert(`TODO: load puzzle ${level + 1}`);
        }}
        onReset={() => {
          alert('TODO: reset progress');
        }}
      />
    </>
  );
};

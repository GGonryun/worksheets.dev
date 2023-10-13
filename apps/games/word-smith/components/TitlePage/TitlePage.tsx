import { FC, useState } from 'react';
import {
  DonateWaterModal,
  OurMissionModal,
  SettingsModal,
} from '@worksheets/ui-games';
import { TitleContent } from './TitleContent';
import { MainMenuHeader } from './TitleHeader';
import { MainMenuFooter } from './TitleFooter';
import { GAME_TITLE } from '../../util';
import { Layout } from '../Layout';
import { usePlayer } from '../../hooks/usePlayer';
import { SelectDifficultyModal } from '../Modals/SelectDifficulty';

export const TitlePage: FC = () => {
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
            water={Object.values(player.words).reduce((a, b) => a + b, 0)}
            onDonate={() => setShowDonate(true)}
            onStart={() => setShowDifficulty(true)}
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

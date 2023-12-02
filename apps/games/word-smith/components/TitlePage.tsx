import { FC, useState } from 'react';
import {
  OurMissionModal,
  SettingsModal,
  TitleContent,
  TitleFooter,
  TitleHeader,
} from '@worksheets/ui-games';
import { GAME_TITLE, assets } from '../util';
import { Layout } from './Layout';
import { usePlayer } from '../hooks/usePlayer';
import { SelectDifficultyModal } from './Modals/SelectDifficulty';
import Image from 'next/image';

export const TitlePage: FC = () => {
  const player = usePlayer();
  const [showMission, setShowMission] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDifficulty, setShowDifficulty] = useState(false);

  return (
    <>
      <Layout
        content={
          <TitleContent
            logo={
              <Image
                priority
                src={assets.logo}
                alt={'Logo'}
                height={205}
                width={300}
              />
            }
            startText="Start Game"
            gameOver={false}
            onSettings={() => setShowSettings(true)}
            onStart={() => setShowDifficulty(true)}
          />
        }
        header={<TitleHeader onSettings={() => setShowSettings(true)} />}
        footer={<TitleFooter onShowMission={() => setShowMission(true)} />}
      />

      <OurMissionModal
        game={GAME_TITLE}
        open={showMission}
        onClose={() => setShowMission(false)}
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

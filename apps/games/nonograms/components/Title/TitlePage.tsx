import { FC, useState } from 'react';
import {
  OurMissionModal,
  SettingsModal,
  TitleFooter,
  TitleHeader,
  urls,
} from '@worksheets/ui-games';
import { TitleContent } from './TitleContent';
import { GAME_TITLE } from '../../util/constants';
import { useRouter } from 'next/router';
import { usePlayer } from '../../hooks/usePlayer';
import { useNonogramStorage } from '../../hooks/useNonogramStorage';
import { Layout } from '../Layout';

export const TitlePage: FC = () => {
  const { push, reload } = useRouter();
  const [showMission, setShowMission] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const player = usePlayer();
  const storage = useNonogramStorage('tutorial1');

  return (
    <>
      <Layout
        content={
          <TitleContent
            gameOver={player.gameOver}
            onLevels={() => push(urls.relative.levels)}
            onGallery={() => push(urls.relative.gallery)}
          />
        }
        header={<TitleHeader onSettings={() => setShowSettings(true)} />}
        footer={<TitleFooter onShowMission={() => setShowMission(true)} />}
      />

      <OurMissionModal
        open={showMission}
        onClose={() => setShowMission(false)}
        game={GAME_TITLE}
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

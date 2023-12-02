import { FC, useState } from 'react';
import {
  MobileLayout,
  SettingsModal,
  TitleContent,
  TitleHeader,
  backgroundColor,
  urls,
} from '@worksheets/ui-games';
import { useTheme } from '@mui/material';
import { TitleFooter } from './TitleFooter';
import { useRouter } from 'next/router';
import { usePlayer } from '../../hooks/usePlayer';
import Image from 'next/image';
import { assets } from '../../util/assets';

export const TitlePage: FC = () => {
  const { push, reload } = useRouter();
  const theme = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const player = usePlayer();

  return (
    <>
      <MobileLayout
        backgroundColor={backgroundColor(theme)}
        content={
          <TitleContent
            logo={
              <Image
                priority
                src={assets.logo}
                alt={'Logo'}
                height={99}
                width={300}
              />
            }
            startText={`Start Game`}
            gameOver={false}
            onStart={() => push(urls.relative.play)}
            onSettings={() => setShowSettings(true)}
          />
        }
        header={<TitleHeader onSettings={() => setShowSettings(true)} />}
        footer={<TitleFooter />}
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

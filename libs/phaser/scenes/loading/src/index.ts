import Phaser from 'phaser';
import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

export type LoadingScreen = ReturnType<typeof newLoadingScreen>;
export type LoadingScreenOptions = {
  to: string; // the scene to start after loading
  icon?: string;
  volume?: number;
};

export const newLoadingScreen = (
  scene: Phaser.Scene,
  server: CharityGamesPlugin,
  { to, icon, volume }: LoadingScreenOptions
) => {
  const { width, height } = scene.cameras.main;

  const assetLoadBar = scene.add.graphics();
  const assetProgressBar = scene.add.graphics();
  const serverLoadBar = scene.add.graphics();
  const serverProgressBar = scene.add.graphics();

  const start = () => {
    if (server.isInitialized && scene.load.isReady()) {
      scene.sound.volume = volume ?? 1;
      scene.scene.start(to);
    }
  };

  icon && scene.add.sprite(width * 0.5, height * 0.3, icon).setOrigin(0.5);

  assetLoadBar.fillStyle(0xd40000, 1);
  assetLoadBar.fillRect(width / 4 - 2, height * 0.5 - 18, width / 2 + 4, 20);

  serverLoadBar.fillStyle(0xd40000, 1);
  serverLoadBar.fillRect(width / 4 - 2, height * 0.5 + 8, width / 2 + 4, 20);

  serverProgressBar.fillStyle(0x0088aa, 1);
  serverProgressBar.fillRect(
    width / 4,
    height * 0.5 + 10,
    (width / 2) * 0.05,
    16
  );

  scene.load.on(
    'progress',
    (value: number) => {
      assetProgressBar.clear();
      assetProgressBar.fillStyle(0x0088aa, 1);
      assetProgressBar.fillRect(
        width / 4,
        height * 0.5 - 16,
        (width / 2) * value,
        16
      );
    },
    this
  );

  server.on('initializing', (value: number) => {
    serverProgressBar.clear();
    serverProgressBar.fillStyle(0x0088aa, 1);
    serverProgressBar.fillRect(
      width / 4,
      height * 0.5 + 10,
      (width / 2) * value,
      16
    );
  });

  server.on('initialized', () => {
    start();
  });

  scene.load.on('complete', () => {
    start();
  });
};

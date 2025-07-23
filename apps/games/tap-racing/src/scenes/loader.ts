import { CharityGamesPlugin } from '@worksheets/phaser/plugins';
import { newLoadingScreen } from '@worksheets/phaser/scenes/loading';

import { MenuScene } from './menu';

export class LoaderScene extends Phaser.Scene {
  static Key = 'LoaderScene';

  server: CharityGamesPlugin;

  constructor() {
    super({
      key: LoaderScene.Key,
    });
  }

  loadFromMiniPixelPack2(args: {
    key: string;
    folder: string;
    file: string;
    frameWidth: number;
    frameHeight: number;
  }) {
    const { key, file, folder, frameHeight, frameWidth } = args;
    this.load.spritesheet(key, `mini-pixel-pack-2/${folder}/${file}.png`, {
      frameWidth,
      frameHeight,
    });
  }

  loadCars() {
    ['blue', 'green', 'police', 'red', 'yellow', 'police'].forEach((car) =>
      this.loadFromMiniPixelPack2({
        key: `car-${car}`,
        folder: 'cars',
        file: car,
        frameWidth: 16,
        frameHeight: 16,
      })
    );
  }

  loadPlayers() {
    ['slime', 'cop', 'lemon', 'cherry', 'carrot'].forEach((player) =>
      this.loadFromMiniPixelPack2({
        key: `player-${player}`,
        folder: 'players',
        file: player,
        frameWidth: 32,
        frameHeight: 32,
      })
    );
  }

  loadRoad() {
    const items = [
      ['details', 16, 16],
      ['markings', 16, 16],
      ['props', 16, 16],
      ['summer', 64, 64],
    ] as const;
    items.forEach(([file, frameWidth, frameHeight]) =>
      this.loadFromMiniPixelPack2({
        key: `road-${file}`,
        folder: 'road',
        file,
        frameWidth,
        frameHeight,
      })
    );
  }

  loadUi() {
    const items = [
      ['fuel', 16, 56],
      ['indicator', 8, 8],
      ['main', 32, 176],
      ['progress', 8, 8],
      ['speed', 8, 8],
      ['lights', 24, 8],
    ] as const;

    items.forEach(([file, frameWidth, frameHeight]) =>
      this.loadFromMiniPixelPack2({
        key: `ui-${file}`,
        folder: 'ui',
        file,
        frameWidth,
        frameHeight,
      })
    );
  }

  loadIcons() {
    const loader = ({ key, file }: { key: string; file: string }) => {
      this.load.image(key, `icons/${file}.png`);
    };

    const items = ['question', 'sound-off', 'sound-on'] as const;
    items.forEach((file) => {
      loader({
        file,
        key: `icons-${file}`,
      });
    });
  }

  loadAudio() {
    const loader = ({ key, file }: { key: string; file: string }) => {
      this.load.audio(key, `audio/${file}.wav`);
    };

    const items = [
      'click',
      'gear-0',
      'gear-1',
      'gear-2',
      'gear-3',
      'gear-4',
      'gear-5',
      'crash-1',
      'loop-0',
      'loop-1',
      'loop-2',
      'loop-3',
      'loop-4',
      'loop-5',
      'loop-6',
      'screech-1',
      'woosh-1',
    ] as const;
    items.forEach((file) => {
      loader({
        file,
        key: `audio-${file}`,
      });
    });
  }

  preload() {
    this.server = CharityGamesPlugin.find(this);
    this.server.initialize();

    this.load.setPath('assets');

    this.loadCars();
    this.loadPlayers();
    this.loadRoad();
    this.loadUi();
    this.loadIcons();
    this.loadAudio();

    newLoadingScreen(this, this.server, {
      to: MenuScene.Key,
      icon: 'charity-games',
      volume: 0.8,
    });
  }
}

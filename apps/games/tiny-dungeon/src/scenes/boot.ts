import { LoaderScene } from './loader';

export class BootScene extends Phaser.Scene {
  static Key = 'BootScene';
  constructor() {
    super({
      key: BootScene.Key,
    });
  }

  preload() {
    this.load.setPath('assets');
    this.load.image('charity-games', 'sprites/charity_games.png');
  }

  create() {
    this.scene.start(LoaderScene.Key);
  }
}

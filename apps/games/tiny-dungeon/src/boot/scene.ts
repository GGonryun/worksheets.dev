import { LoaderScene } from '../loader/scene';

export class BootScene extends Phaser.Scene {
  static Key = 'BootScene';
  constructor() {
    super({
      key: BootScene.Key,
    });
  }

  preload() {
    this.load.setPath('assets');
  }

  create() {
    this.scene.start(LoaderScene.Key);
    // this.load.on('complete', () => {});
  }
}

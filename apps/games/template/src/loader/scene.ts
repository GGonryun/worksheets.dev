import { GameScene } from '../game/scene';

export class LoaderScene extends Phaser.Scene {
  static Key = 'LoaderScene';
  constructor() {
    super({
      key: LoaderScene.Key,
    });
  }

  preload() {
    this.load.setPath('assets');
  }

  create() {
    this.scene.start(GameScene.Key);
    // this.load.on('complete', () => {});
  }
}

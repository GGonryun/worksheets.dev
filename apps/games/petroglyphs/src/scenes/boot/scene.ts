import { LoaderScene } from '../loader/scene';
import { ProgressBar } from '../progress/scene';

export class BootScene extends Phaser.Scene {
  static key = 'BootScene';
  progress: ProgressBar;
  constructor() {
    super(BootScene.key);
  }

  preload() {
    /** Logos */
    this.load.image('charity-games', 'assets/logos/charity-games.png');

    this.load.on('complete', () => {
      LoaderScene.start(this);
    });
  }
}

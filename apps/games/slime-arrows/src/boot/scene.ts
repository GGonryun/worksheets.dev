import { Scene } from 'phaser';

import { LoaderScene } from '../loader/scene';

export class BootScene extends Scene {
  static KEY = 'Boot';
  constructor() {
    super(BootScene.KEY);
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
    this.load.setPath('assets');
  }

  create() {
    this.scene.start(LoaderScene.KEY);
  }
}

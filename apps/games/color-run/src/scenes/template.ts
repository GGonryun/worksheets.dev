import { setWallpaper } from '../util/wallpaper';

export default class TemplateScene extends Phaser.Scene {
  constructor(key: string) {
    super(key);
  }

  create() {
    setWallpaper(this)('wallpaper');
  }
}

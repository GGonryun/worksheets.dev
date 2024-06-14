import { setWallpaper } from "../util/wallpaper";

export default class TemplateScene extends Phaser.Scene {
  constructor(key: string) {
    super(key);
  }

  preload() {
    this.load.image("wallpaper", "./assets/sprites/wallpaper/white.png");
    this.input.setDefaultCursor("url(./assets/cursor/pointer.png), pointer");
  }

  create() {
    setWallpaper(this)("wallpaper");
  }
}

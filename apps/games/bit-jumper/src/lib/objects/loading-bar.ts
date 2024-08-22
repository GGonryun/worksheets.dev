export type ProgressBarOptions = {
  width: number;
  height: number;
  background?: number;
  progress?: number;
};

export class ProgressBar extends Phaser.GameObjects.Container {
  background: Phaser.GameObjects.Graphics;
  progress: Phaser.GameObjects.Graphics;
  options: ProgressBarOptions;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    options: ProgressBarOptions
  ) {
    super(scene, x, y);
    this.options = options;

    this.createBars();
    this.scene.add.existing(this);
  }

  createBars() {
    this.background = new Phaser.GameObjects.Graphics(this.scene);
    this.background.fillStyle(this.options.background ?? 0xffffff, 1);
    this.background.fillRect(
      -this.options.width / 2 - 1,
      -this.options.height / 2 - 1,
      this.options.width + 2,
      this.options.height + 2
    );

    this.add(this.background);

    this.progress = new Phaser.GameObjects.Graphics(this.scene);
    this.add(this.progress);
  }

  updateProgress(value: number) {
    this.progress.clear();
    this.progress.fillStyle(this.options.background ?? 0x000000, 1);
    this.progress.fillRect(
      -this.options.width / 2,
      -this.options.height / 2,
      this.options.width * value,
      this.options.height
    );
  }
}

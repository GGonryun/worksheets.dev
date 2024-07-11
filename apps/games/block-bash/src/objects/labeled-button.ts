import { Typography } from './typography';

export class LabeledButton extends Phaser.GameObjects.Container {
  private fn?: () => void;
  constructor(
    scene: Phaser.Scene,
    opt: {
      icon: string;
      label: string;
      sound?: string;
    }
  ) {
    super(scene);
    scene.add.existing(this);
    const handler = () => {
      this.fn?.();
      scene.sound.play(opt.sound ?? 'text');
    };
    const sprite = scene.add
      .sprite(0, 0, 'icon_square')
      .setScale(0.5)
      .setInteractive()
      .on('pointerdown', handler);
    this.add(sprite);

    this.add(
      new Typography(scene, 50, 0, opt.label, 48)
        .setInteractive()
        .on('pointerdown', handler)
        .setOrigin(0, 0.5)
    );

    this.add(scene.add.sprite(0, 0, opt.icon).setScale(0.25));
  }

  onClick(fn: () => void) {
    this.fn = fn;
    return this;
  }
}

import { NonPlayerCharacter } from './non-player-character';

export class PlayerPoster extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    sprite: string,
    text = 'Find',
    color = 0xf4b266,
    status: 'none' | 'right' | 'wrong' = 'none'
  ) {
    super(scene, x, y);

    const poster = scene.add.sprite(0, 0, 'panel_white').setScale(1.1, 0.9);
    const player = scene.add
      .sprite(0, 10, NonPlayerCharacter.image(sprite))
      .play({
        key: NonPlayerCharacter.idle(sprite),
        repeat: -1,
      })
      .setScale(3);

    const title = scene.add
      .bitmapText(0, -26, 'thick', text, 16)
      .setTintFill(color)
      .setOrigin(0.5)
      .setDropShadow(1, 1, 0x000000, 1);

    const icon = scene.add
      .sprite(32, 42, 'cross')
      .setScale(3)
      .setVisible(false);
    if (status !== 'none') icon.setVisible(true);
    if (status === 'right') icon.setTexture('check');

    this.add(poster);
    this.add(player);
    this.add(title);
    this.add(icon);
    scene.add.existing(this);
  }
}

export class CreditsButton extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    const button = new Phaser.GameObjects.Sprite(scene, 0, 0, 'button_white')
      .setScale(1.1)
      .setInteractive()
      .on(
        'pointerdown',
        (
          _p: unknown,
          _x: unknown,
          _y: unknown,
          e: Phaser.Types.Input.EventData
        ) => {
          scene.sound.play('menu');
          scene.scene.launch('credits');
          scene.scene.stop('instructions');
          e.stopPropagation();
        }
      );

    const icon = new Phaser.GameObjects.Sprite(scene, 0, 0, 'comfort').setScale(
      2
    );

    this.add(button);
    this.add(icon);

    scene.add.existing(this);
  }
}

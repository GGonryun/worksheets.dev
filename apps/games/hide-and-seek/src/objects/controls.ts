export class Controls extends Phaser.Cameras.Controls.FixedKeyControl {
  constructor(scene: Phaser.Scene) {
    // TODO: figure out if removing the round pixels makes the camera zoom smoothly
    // without trimming pixels off. this is most notable when zooming in on an idle
    // npc sprite.
    scene.cameras.main.setRoundPixels(true);
    const keyboard = scene.input.keyboard;
    if (!keyboard) throw new Error('Keyboard not found');

    const cursors = keyboard.createCursorKeys();

    const controlConfig: Phaser.Types.Cameras.Controls.FixedKeyControlConfig = {
      camera: scene.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      zoomIn: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      zoomOut: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      zoomSpeed: 0.02,
      maxZoom: 3,
      minZoom: 0.5,
      speed: 0.2,
    };

    super(controlConfig);
  }

  update(delta: number) {
    super.update(delta);
  }
}

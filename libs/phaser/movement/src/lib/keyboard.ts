import { MovementEventBus, TypedEventEmitter } from '@worksheets/phaser/events';

export class PlayerKeyboard extends Phaser.GameObjects.Container {
  cursor?: Phaser.Types.Input.Keyboard.CursorKeys;
  bus: MovementEventBus;
  status: 'acting' | 'idle';
  disabled: boolean;

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.cursor = scene.input.keyboard?.createCursorKeys();
    this.bus = new TypedEventEmitter();
    this.status = 'idle';
    this.disabled = false;

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  disable() {
    this.disabled = true;
  }

  enable() {
    this.disabled = false;
  }

  override update() {
    if (this.disabled) return;
    if (!this.cursor) return;
    const pressed =
      this.cursor.left.isDown ||
      this.cursor.right.isDown ||
      this.cursor.up.isDown ||
      this.cursor.down.isDown;
    if (!pressed) {
      if (this.state === 'idle') return;
      this.bus.emit('stop-movement');
      this.state = 'idle';
      return;
    }

    if (pressed) {
      this.state = 'acting';
    }

    //if top left is pressed, move top left
    if (this.cursor.left.isDown && this.cursor.up.isDown) {
      this.bus.emit('movement', { force: 1, angle: (5 * Math.PI) / 4 });
    }
    //if top right is pressed, move top right
    else if (this.cursor.right.isDown && this.cursor.up.isDown) {
      this.bus.emit('movement', { force: 1, angle: (7 * Math.PI) / 4 });
    }
    // if bottom left is pressed, move bottom left
    else if (this.cursor.left.isDown && this.cursor.down.isDown) {
      this.bus.emit('movement', { force: 1, angle: (3 * Math.PI) / 4 });
    }
    // if bottom right is pressed, move bottom right
    else if (this.cursor.right.isDown && this.cursor.down.isDown) {
      this.bus.emit('movement', { force: 1, angle: Math.PI / 4 });
    }
    // if just down is pressed, move down
    else if (this.cursor.left.isDown) {
      this.bus.emit('movement', { force: 1, angle: Math.PI });
    }
    // if just up is pressed, move up
    else if (this.cursor.right.isDown) {
      this.bus.emit('movement', { force: 1, angle: 0 });
    }
    // if just left is pressed, move left
    else if (this.cursor.down.isDown) {
      this.bus.emit('movement', { force: 1, angle: Math.PI / 2 });
    }
    // if just right is pressed, move right
    else if (this.cursor.up.isDown) {
      this.bus.emit('movement', { force: 1, angle: (3 * Math.PI) / 2 });
    }
  }

  override destroy() {
    this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
  }
}

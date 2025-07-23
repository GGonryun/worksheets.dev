import { TypedEventEmitter } from '@worksheets/phaser/events';
import { DiscreteMovement } from '@worksheets/phaser/types';

export type PlayerKeyboardEventBus = TypedEventEmitter<{
  movement: [DiscreteMovement];
  'stop-movement': [];
}>;

export class PlayerKeyboard extends Phaser.GameObjects.Container {
  cursor?: Phaser.Types.Input.Keyboard.CursorKeys;
  bus: PlayerKeyboardEventBus;
  status: 'active' | 'idle';
  disabled: boolean;

  static get Movement() {
    return {
      UpLeft: (5 * Math.PI) / 4,
      UpRight: (7 * Math.PI) / 4,
      DownLeft: (3 * Math.PI) / 4,
      DownRight: Math.PI / 4,
      Left: Math.PI,
      Right: 0,
      Up: (3 * Math.PI) / 2,
      Down: Math.PI / 2,
    };
  }

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
      this.state = 'active';
    }

    //if top left is pressed, move top left
    if (this.cursor.left.isDown && this.cursor.up.isDown) {
      this.bus.emit('movement', {
        force: 1,
        angle: PlayerKeyboard.Movement.UpLeft,
        direction: ['up', 'left'],
      });
    }
    //if top right is pressed, move top right
    else if (this.cursor.right.isDown && this.cursor.up.isDown) {
      this.bus.emit('movement', {
        force: 1,
        angle: PlayerKeyboard.Movement.UpRight,
        direction: ['up', 'right'],
      });
    }
    // if bottom left is pressed, move bottom left
    else if (this.cursor.left.isDown && this.cursor.down.isDown) {
      this.bus.emit('movement', {
        force: 1,
        angle: PlayerKeyboard.Movement.DownLeft,
        direction: ['down', 'left'],
      });
    }
    // if bottom right is pressed, move bottom right
    else if (this.cursor.right.isDown && this.cursor.down.isDown) {
      this.bus.emit('movement', {
        force: 1,
        angle: PlayerKeyboard.Movement.DownRight,
        direction: ['down', 'right'],
      });
    }
    // if just down is pressed, move down
    else if (this.cursor.left.isDown) {
      this.bus.emit('movement', {
        force: 1,
        angle: PlayerKeyboard.Movement.Left,
        direction: ['left'],
      });
    }
    // if just up is pressed, move up
    else if (this.cursor.right.isDown) {
      this.bus.emit('movement', {
        force: 1,
        angle: PlayerKeyboard.Movement.Right,
        direction: ['right'],
      });
    }
    // if just left is pressed, move left
    else if (this.cursor.down.isDown) {
      this.bus.emit('movement', {
        force: 1,
        angle: PlayerKeyboard.Movement.Down,
        direction: ['down'],
      });
    }
    // if just right is pressed, move right
    else if (this.cursor.up.isDown) {
      this.bus.emit('movement', {
        force: 1,
        angle: PlayerKeyboard.Movement.Up,
        direction: ['up'],
      });
    }
  }

  override destroy() {
    this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
  }
}

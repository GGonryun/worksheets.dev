import { TypedEventEmitter } from '@worksheets/phaser/events';
import { ContinuousMovement, DirectionalInput } from '@worksheets/phaser/types';
import { assertNever } from '@worksheets/util/errors';

export type PlayerJoystickEventBus = TypedEventEmitter<{
  movement: [ContinuousMovement];
  'stop-movement': [];
}>;

export type ArcJoystickOptions = {
  type: 'arc';
  size: number;
};

type SpriteOptions = {
  texture: string;
  frame?: string | number;
  tintFill?: number;
  alpha?: number;
  scale: number;
};

export type SpriteJoystickOptions = {
  type: 'sprite';
  inner: SpriteOptions;
  outer: SpriteOptions;
  size: number;
};

export type JoystickOptions = ArcJoystickOptions | SpriteJoystickOptions;

export type ITargetingRing = Phaser.GameObjects.GameObject & {
  show: () => void;
  hide: () => void;
  setLocation: (pointer: Phaser.Input.Pointer) => ContinuousMovement;
  setPosition: (x: number, y: number) => void;
};

export class PlayerJoystick extends Phaser.GameObjects.Container {
  private interactionPlane: InteractionPlane;
  private targeting: ITargetingRing;
  private options: JoystickOptions;

  cursors: DirectionalInput;
  bus: PlayerJoystickEventBus;

  constructor(scene: Phaser.Scene, options: JoystickOptions) {
    super(scene, 0, 0);
    this.options = options;

    this.bus = new TypedEventEmitter();
    this.cursors = {
      left: {
        isDown: false,
      },
      right: {
        isDown: false,
      },
      up: {
        isDown: false,
      },
      down: {
        isDown: false,
      },
    };

    this.create();
  }

  create() {
    this.createTargeting();
    this.createInteractionPlane();
  }

  disable() {
    this.targeting.hide();
    this.interactionPlane.disable();
  }

  enable() {
    this.interactionPlane.enable();
  }

  createTargeting() {
    this.targeting = new TargetingRing(this.scene, this.options);
    this.targeting.hide();
    this.add(this.targeting);
  }

  createInteractionPlane() {
    const { width, height } = this.scene.game.config;
    this.interactionPlane = new InteractionPlane(
      this.scene,
      width as number,
      height as number
    );

    this.add(this.interactionPlane);

    this.interactionPlane.bus.on('onDragStart', this.onDragStart, this);
    this.interactionPlane.bus.on('onDrag', this.onDrag, this);
    this.interactionPlane.bus.on('onDragEnd', this.onDragEnd, this);
  }

  onDragStart(pointer: Phaser.Input.Pointer) {
    this.targeting.show();
    this.targeting.setPosition(pointer.x, pointer.y);
  }

  onDrag(pointer: Phaser.Input.Pointer) {
    this.bus.emit('movement', this.targeting.setLocation(pointer));
  }

  onDragEnd() {
    this.targeting.hide();
    this.bus.emit('stop-movement');
  }
}

class TargetingRing
  extends Phaser.GameObjects.Container
  implements ITargetingRing
{
  outer: Phaser.GameObjects.Components.Visible &
    Phaser.GameObjects.Components.Transform;
  inner: Phaser.GameObjects.Components.Visible &
    Phaser.GameObjects.Components.Transform;
  options: JoystickOptions;
  constructor(scene: Phaser.Scene, options: JoystickOptions) {
    super(scene, 0, 0);

    this.options = options;

    switch (options.type) {
      case 'arc':
        this.createArcs(options);
        break;
      case 'sprite':
        this.createSprites(options);
        break;
      default:
        throw assertNever(options);
    }
  }

  createArcs(options: ArcJoystickOptions) {
    const outer = new Phaser.GameObjects.Arc(
      this.scene,
      0,
      0,
      options.size,
      0,
      360,
      false,
      0xc5c5c5,
      0.5
    );
    outer.setStrokeStyle(4, 0x656565);

    const inner = new Phaser.GameObjects.Arc(
      this.scene,
      0,
      0,
      options.size / 2,
      0,
      360,
      false,
      0xc5c5c5,
      0.5
    );
    inner.setStrokeStyle(2, 0x656565);

    this.add([outer, inner]);

    this.outer = outer;
    this.inner = inner;
  }

  createSprites(options: SpriteJoystickOptions) {
    const outer = this.scene.add.sprite(
      0,
      0,
      options.outer.texture,
      options.outer.frame
    );
    if (options.outer.tintFill != null)
      outer.setTintFill(options.outer.tintFill);
    if (options.outer.alpha) outer.setAlpha(options.outer.alpha);
    if (options.outer.scale) outer.setScale(options.outer.scale);

    const inner = this.scene.add.sprite(
      0,
      0,
      options.inner.texture,
      options.inner.frame
    );
    if (options.inner.tintFill != null)
      inner.setTintFill(options.inner.tintFill);
    if (options.inner.alpha) inner.setAlpha(options.inner.alpha);
    if (options.inner.scale) inner.setScale(options.inner.scale);

    this.add([outer, inner]);
    this.outer = outer;
    this.inner = inner;
  }

  hide() {
    this.outer.setVisible(false);
    this.inner.setVisible(false);
  }

  show() {
    this.outer.setVisible(true);
    this.inner.setVisible(true);
  }
  /**
   * Takes a pointer and sets the inner dot to the pointer's location.
   * Clamps the pointer's location to the targeting ring's radius.
   * @param pointer
   * @returns the angle in radians
   */
  setLocation(pointer: Phaser.Input.Pointer): ContinuousMovement {
    // Get the distance from the center of the targeting ring to the pointer
    const dx = pointer.x - this.x;
    const dy = pointer.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    // Clamp the distance to the targeting ring's radius
    const clampedDistance = Math.min(distance, this.options.size);
    // Set the inner dot's position to the clamped distance
    this.inner.setPosition(
      (dx / distance) * clampedDistance,
      (dy / distance) * clampedDistance
    );

    const angle = Math.atan2(dy, dx);

    return { force: clampedDistance / this.options.size, angle };
  }
}

class InteractionPlane extends Phaser.GameObjects.Rectangle {
  static Debug = false;

  bus: TypedEventEmitter<{
    onDragStart: [Phaser.Input.Pointer];
    onDrag: [Phaser.Input.Pointer];
    onDragEnd: [Phaser.Input.Pointer];
  }>;

  constructor(scene: Phaser.Scene, width: number, height: number) {
    super(
      scene,
      0,
      0,
      width,
      height,
      0xff0000,
      InteractionPlane.Debug ? 0.5 : 0
    );
    this.bus = new TypedEventEmitter();

    this.setOrigin(0);
    this.setInteractive({ draggable: true });
    this.on(Phaser.Input.Events.DRAG, this.onDrag, this);
    this.on(Phaser.Input.Events.DRAG_END, this.onDragEnd, this);
    this.on(Phaser.Input.Events.DRAG_START, this.onDragStart, this);
  }

  disable() {
    this.disableInteractive();
  }

  enable() {
    this.setInteractive({ draggable: true });
  }

  onDragStart(pointer: Phaser.Input.Pointer) {
    this.bus.emit('onDragStart', pointer);
  }

  onDrag(pointer: Phaser.Input.Pointer) {
    this.bus.emit('onDrag', pointer);
  }

  onDragEnd(pointer: Phaser.Input.Pointer) {
    this.bus.emit('onDragEnd', pointer);
  }
}

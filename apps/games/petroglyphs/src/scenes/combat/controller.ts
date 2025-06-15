import { TypedEventEmitter } from '@worksheets/phaser/events';
import { Axis, Direction, Point } from '@worksheets/phaser/types';
import { waitFor } from '@worksheets/util/time';

import { Relic } from '../relics/relic';
import { RelicKey } from '../relics/types';
import { Lock } from './lock';
import { LockScreen } from './lock-screen';

export type ControllerEvents = {
  drag: [{ axis: Axis; point: Point; distance: number }];
  dragend: [Point];
  'confirm-dragend': [Point];
  dragstart: [{ axis: Axis } & Point];
};

export class GridController {
  scene: Phaser.Scene;
  dragThreshold = 16;
  dragging = false;
  started: Point | undefined;
  direction: Direction | undefined;
  axis: Axis | undefined;
  events: TypedEventEmitter<ControllerEvents>;
  actionLock: Lock;
  cover: LockScreen;
  disabled = false;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.events = new TypedEventEmitter();
    this.actionLock = new Lock('incremental');
  }

  lock() {
    this.actionLock.close();
  }

  unlock() {
    this.actionLock.open();
  }

  async acquire<T>(fn: () => Promise<T>): Promise<T> {
    while (this.actionLock.locked || this.dragging) {
      await waitFor(100);
    }

    this.lock();
    const result = await fn();
    this.unlock();
    return result;
  }

  get locked() {
    return this.actionLock.locked;
  }

  create() {
    this.cover = new LockScreen(this.scene);

    this.actionLock.events.on('lock', () => {
      this.cover.show();
    });

    this.actionLock.events.on('unlock', () => {
      this.cover.hide();
    });

    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.actionLock.locked) return;

      this.dragging = true;
      this.started = { x: pointer.x, y: pointer.y };
    });

    this.scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (this.actionLock.locked) return;

      if (this.dragging && this.started && this.direction && this.axis) {
        this.events.emit('confirm-dragend', { x: pointer.x, y: pointer.y });
      }
      this.dragging = false;
      this.started = undefined;
      this.direction = undefined;
      this.axis = undefined;

      this.events.emit('dragend', { x: pointer.x, y: pointer.y });
    });
  }

  update() {
    if (!this.dragging || !this.started) return;

    const pointer = this.scene.input.activePointer;
    const distance = Phaser.Math.Distance.Between(
      this.started.x,
      this.started.y,
      pointer.x,
      pointer.y
    );

    if (!this.axis) {
      if (distance > this.dragThreshold) {
        const radians = Phaser.Math.Angle.Between(
          this.started.x,
          this.started.y,
          pointer.x,
          pointer.y
        );
        const direction = convertRadiansToDirection(radians);
        this.direction = direction;
        this.axis = convertDirectionToAxis(direction);
        this.events.emit('dragstart', {
          axis: this.axis,
          x: this.started.x,
          y: this.started.y,
        });
        this.started = { x: pointer.x, y: pointer.y };
      }
    } else {
      const axis = this.axis;
      const point = lockAxis({
        axis,
        point: { x: pointer.x, y: pointer.y },
        lock: this.started,
      });
      const distance =
        axis === 'horizontal'
          ? point.x - this.started.x
          : point.y - this.started.y;
      this.events.emit('drag', {
        axis,
        point,
        distance,
      });
    }
  }
}

const lockAxis = ({
  axis,
  point,
  lock,
}: {
  axis: Axis;
  point: Point;
  lock: {
    x: number;
    y: number;
  };
}) => {
  return axis === 'horizontal'
    ? { x: point.x, y: lock.y }
    : { x: lock.x, y: point.y };
};

const convertRadiansToDirection = (radians: number): Direction => {
  const degrees = Phaser.Math.RadToDeg(radians);
  if (degrees < 45 && degrees > -45) return 'right';
  if (degrees < 135 && degrees > 45) return 'down';
  if (degrees < -45 && degrees > -135) return 'up';
  return 'left';
};

const convertDirectionToAxis = (direction: Direction): Axis => {
  if (direction === 'up' || direction === 'down') return 'vertical';
  return 'horizontal';
};

export type InputControllerEventEmitter = TypedEventEmitter<{
  'view-relic-details': [RelicKey];
}>;

export class ItemController {
  scene: Phaser.Scene;
  events: InputControllerEventEmitter;
  private enabled: boolean;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.events = new TypedEventEmitter();
    this.enabled = true;

    this.scene.input.on(
      'pointerdown',
      (
        _pointer: Phaser.Input.Pointer,
        objects: Phaser.GameObjects.GameObject[]
      ) => {
        if (!this.enabled) return;
        if (!objects.length) return;

        const [object] = objects;

        if (object instanceof Relic) {
          if (object.options.isBonus) {
            // handled by the relic scene.
          } else {
            this.events.emit('view-relic-details', object.options.info.key);
          }
        }
      },
      this
    );
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }
}

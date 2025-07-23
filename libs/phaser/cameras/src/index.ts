import * as Phaser from 'phaser';
import { TypedEventEmitter } from '@worksheets/phaser/events';
import { WholeNumber } from '@worksheets/phaser/numbers';
import { ExpandedRectangle } from '@worksheets/phaser/shapes';
import { BoundedObject } from '@worksheets/phaser/objects';

export const getCenterOfCamera = (camera: Phaser.Cameras.Scene2D.Camera) => {
  return {
    x: camera.centerX,
    y: camera.centerY,
  };
};

export type CameraObserverOptions = {
  buffer?: WholeNumber;
};

export class CameraObserver {
  scene: Phaser.Scene;
  camera: Phaser.Cameras.Scene2D.Camera;
  options: Required<CameraObserverOptions>;
  // the objects to watch.
  objects: BoundedObject[];
  // the objects that are current in our view.
  entered: BoundedObject[];
  // the objects that have left our camera's view.
  exited: BoundedObject[];

  bus: TypedEventEmitter<{
    'object-entered': [BoundedObject];
    'object-exited': [BoundedObject];
  }>;

  constructor(scene: Phaser.Scene, options?: CameraObserverOptions) {
    this.bus = new TypedEventEmitter();

    this.scene = scene;
    this.camera = scene.cameras.main;

    this.objects = [];
    this.entered = [];
    this.exited = [];

    this.options = {
      buffer: options?.buffer ?? WholeNumber.of(0),
    };
  }

  register(object: BoundedObject) {
    this.objects.push(object);
  }

  unregister(object: BoundedObject) {
    this.objects = this.objects.filter((o) => o !== object);
    this.exited = this.exited.filter((o) => o !== object);
    this.entered = this.entered.filter((o) => o !== object);
  }

  update() {
    if (this.camera.worldView.height === 0 || this.camera.worldView.width === 0)
      return;

    for (const object of this.objects) {
      if (this.hasInView(object)) {
        if (!this.entered.includes(object)) {
          this.enteredView(object);
        }
      } else {
        if (this.entered.includes(object) && !this.exited.includes(object)) {
          this.exitedView(object);
        }
      }
    }
  }

  enteredView(object: BoundedObject) {
    this.entered.push(object);
    this.exited = this.exited.filter((o) => o !== object);
    this.bus.emit('object-entered', object);
  }

  exitedView(object: BoundedObject) {
    this.exited.push(object);
    this.entered = this.entered.filter((o) => o !== object);
    this.bus.emit('object-exited', object);
  }

  hasInView(object: BoundedObject) {
    const bounds = object.getBounds();
    const cameraView = new ExpandedRectangle(
      this.camera.worldView,
      this.options.buffer
    );
    return Phaser.Geom.Intersects.RectangleToRectangle(bounds, cameraView);
  }
}

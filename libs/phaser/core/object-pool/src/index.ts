import * as Phaser from 'phaser';

export class ObjectPool<T extends Phaser.GameObjects.GameObject> {
  objects: T[] = [];
  create: () => T;
  constructor(create: () => T) {
    this.objects = [];
    this.create = create;
  }

  get(): T {
    const object = this.objects.find((object) => !object.active);

    if (!object) {
      const newObject = this.create();
      this.objects.push(newObject);
      return newObject;
    } else if (object.scene === undefined) {
      // if an object is destroyed, it will not be associated with a scene
      this.objects = this.objects.filter((o) => o !== object);
      return this.get();
    } else {
      return object;
    }
  }
}

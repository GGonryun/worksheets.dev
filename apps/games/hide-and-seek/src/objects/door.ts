import { Depths } from '../util';
import { Building } from './building';

export class Door extends Phaser.GameObjects.Sprite {
  static size = 16;
  inUse: boolean;
  constructor(
    public building: Building,
    public roomId: string,
    public anchor: 'left' | 'right',
    public x: number,
    public y: number
  ) {
    super(building.scene, x - 1, y, 'door', 0);
    this.setOrigin(0);
    building.scene.add.existing(this);
    this.setDepth(Depths.FOREGROUND);
    this.inUse = false;
    if (anchor === 'right') {
      this.x += Door.size;
    }
  }

  async open() {
    return new Promise((resolve) =>
      this.play({ key: 'door_open' }).on(
        'animationcomplete',
        (animation: Phaser.Animations.Animation) => {
          if (animation.key === 'door_open') {
            resolve(true);
          }
        }
      )
    );
  }

  close() {
    return new Promise((resolve) => {
      this.play({ key: 'door_close' }).on(
        'animationcomplete',
        (animation: Phaser.Animations.Animation) => {
          if (animation.key === 'door_close') {
            resolve(true);
          }
        }
      );
    });
  }
}

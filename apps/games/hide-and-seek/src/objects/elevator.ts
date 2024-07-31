import { DEBUGGING, Depths } from '../util';
import { Building } from './building';
import { NonPlayerCharacter } from './non-player-character';
import { Room } from './room';

export class Elevator extends Phaser.GameObjects.Sprite {
  static size = 32;
  roomId: string;
  inUse: boolean;
  constructor(building: Building, roomId: string, x: number, y: number) {
    super(building.scene, x, y, 'elevator', 0);
    this.roomId = roomId;
    this.setOrigin(0);
    building.scene.add.existing(this);
    this.setDepth(Depths.FOREGROUND);
    this.inUse = false;

    DEBUGGING && this.debug();
  }

  get center() {
    return {
      x: this.x + Elevator.size / 2,
      y:
        this.y + Elevator.size - Room.floorOffset - NonPlayerCharacter.size / 2,
    };
  }

  debug() {
    [this.center].map((point) => {
      const { x, y } = point;
      const graphics = this.scene.add.graphics({
        x,
        y,
      });
      graphics.setDepth(1000);
      graphics.lineStyle(1, 0x0000ff);
      graphics.strokeRect(-1, -1, 2, 2);
    });
  }
  async open() {
    return new Promise((resolve) =>
      this.play({ key: 'elevator_open' }).on(
        'animationcomplete',
        (animation: Phaser.Animations.Animation) => {
          if (animation.key === 'elevator_open') {
            resolve(true);
          }
        }
      )
    );
  }

  async close() {
    return new Promise((resolve) => {
      this.play({ key: 'elevator_close' }).on(
        'animationcomplete',
        (animation: Phaser.Animations.Animation) => {
          if (animation.key === 'elevator_close') {
            resolve(true);
          }
        }
      );
    });
  }

  async use(fn: () => Promise<void>) {
    this.inUse = true;
    await fn();
    this.inUse = false;
  }
}

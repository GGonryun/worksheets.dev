import { DEBUGGING } from '../util';
import { Building } from './building';
import { Room } from './room';

export class Staircase {
  static size = 16;
  static anchorOffset = 6;
  inUse = false;
  constructor(
    public building: Building,
    public roomId: string,
    public anchor: 'top' | 'bottom',
    public flipped: boolean,
    public x: number,
    public y: number
  ) {
    DEBUGGING && this.debug();
  }

  get point() {
    const flipped = this.flipped ? -1 : 1;
    const top = this.anchor === 'top' ? 1 : -1;
    const topOffset = this.anchor === 'top' ? 4 : 0;
    return {
      x:
        this.x +
        Staircase.size / 2 +
        (Staircase.anchorOffset + topOffset) * flipped * top,
      y: this.y + Staircase.size / 2 - Room.floorOffset,
    };
  }
  debug() {
    [this.point].map((point) => {
      const { x, y } = point;
      const graphics = this.building.scene.add.graphics({
        x,
        y,
      });
      graphics.setDepth(1000);
      graphics.lineStyle(1, 0xff0000);
      graphics.strokeRect(-1, -1, 2, 2);
    });
  }
}

import { waitFor } from '@worksheets/util/time';

import { Coordinate, RectangleObject } from '../types';
import { DEBUGGING } from '../util';
import { Building } from './building';
import { NonPlayerCharacter } from './non-player-character';

export class Room {
  static minRow = 'a';
  static maxRow = 'l';
  static minColumn = 1;
  static maxColumn = 5;
  static floorOffset = 2;
  building: Building;
  locations: Record<string, Coordinate>;
  area: RectangleObject;

  constructor(building: Building, area: RectangleObject) {
    this.building = building;
    this.area = area;
    this.locations = {};

    DEBUGGING && this.debug(this.building.scene);
  }

  createPoints() {
    this.iteratePoints(({ x, y, name }) => {
      this.locations[name] = {
        x,
        y,
      };
    });
  }

  iteratePoints(fn: (point: { name: string; x: number; y: number }) => void) {
    this.building.pointsLayer.objects.forEach((point) => {
      const { x, y, name, rectangle } = point;
      if (rectangle) return; // ignore objects that are rectangles
      if (x == null || y == null)
        throw new Error(`Point ${name} properties not found`);
      if (!name.includes(this.code)) return; // ignore points outside of the room
      fn({ name, x, y });
    });
  }

  debug(scene: Phaser.Scene) {
    [this.walls.left, this.walls.right].map((point) => {
      const { x, y } = point;
      const graphics = scene.add.graphics({
        x,
        y,
      });
      graphics.setDepth(1000);
      graphics.lineStyle(1, 0x00ff00);
      graphics.strokeRect(-1, -1, 2, 2);
    });
  }

  async pace(npc: NonPlayerCharacter) {
    const minMovements = 0;
    const maxMovements = 4;
    const movements = Phaser.Math.RND.integerInRange(
      minMovements,
      maxMovements
    );
    for (let i = 0; i < movements; i++) {
      await npc.movement(this.coordinateBetweenWalls());
      const pause = Phaser.Math.RND.integerInRange(0, 1000);
      await waitFor(pause);
    }
  }

  async travel(npc: NonPlayerCharacter) {
    await this.building.travel(npc, this);
  }

  travelOptions() {
    const doors = this.building.doors.filter(
      (door) => door.roomId === this.code
    );
    return {
      // rooms can only have one staircase or elevator
      staircase: this.building.staircases.find(
        (staircase) => staircase.roomId === this.code
      ),
      elevator: this.building.elevators.find(
        (elevator) => elevator.roomId === this.code
      ),
      // rooms can have multiple doors
      leftDoor: doors.find((door) => door.anchor === 'left'),
      rightDoor: doors.find((door) => door.anchor === 'right'),
    };
  }

  get code() {
    return this.area.name;
  }

  coordinateBetweenWalls() {
    // find a random point in the room
    const x = Phaser.Math.Between(this.walls.left.x, this.walls.right.x);
    const y = Phaser.Math.Between(this.walls.left.y, this.walls.right.y);
    return { x, y };
  }

  get walls() {
    const playerOffset = NonPlayerCharacter.size / 2;
    const y = this.area.y + this.area.height - playerOffset - Room.floorOffset;
    return {
      left: { x: this.area.x + playerOffset, y },
      right: {
        x: this.area.x + this.area.width - playerOffset,
        y,
      },
    };
  }

  // vertical access is controlled by the letter, a, b, c...
  // a is the first floor, b is the second floor, etc.
  static above(roomId: string) {
    const letter = roomId[1];
    if (letter === this.minRow)
      throw new Error('Cannot go above the first floor');
    const previousLetter = String.fromCharCode(letter.charCodeAt(0) - 1);
    return roomId.replace(letter, previousLetter);
  }

  static below(roomId: string) {
    const letter = roomId[1];
    if (letter === this.maxRow)
      throw new Error('Cannot go below the last floor');
    const nextLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
    return roomId.replace(letter, nextLetter);
  }

  static left(roomId: string) {
    const number = parseInt(roomId[0]);
    if (number === this.minColumn)
      throw new Error('Cannot go left of the first room');
    const previousNumber = number - 1;
    return `${previousNumber}${roomId.slice(1)}`;
  }

  static right(roomId: string) {
    const number = parseInt(roomId[0]);
    if (number === this.maxColumn)
      throw new Error('Cannot go right of the last room');
    const nextNumber = number + 1;
    return `${nextNumber}${roomId.slice(1)}`;
  }
  static random() {
    const minRow = this.minRow.charCodeAt(0);
    const maxRow = this.maxRow.charCodeAt(0);
    const minColumn = this.minColumn;
    const maxColumn = this.maxColumn;
    const randomRow =
      Math.floor(Math.random() * (maxRow - minRow + 1)) + minRow;
    const randomColumn =
      Math.floor(Math.random() * (maxColumn - minColumn + 1)) + minColumn;
    return randomColumn + String.fromCharCode(randomRow);
  }
}

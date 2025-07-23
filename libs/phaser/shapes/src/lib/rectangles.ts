import { WholeNumber } from '@worksheets/phaser/numbers';
import * as Phaser from 'phaser';

export class ExpandedRectangle extends Phaser.Geom.Rectangle {
  constructor(rect: Phaser.Geom.Rectangle, by: WholeNumber) {
    const value = by.value;
    super(
      rect.x - value,
      rect.y - value,
      rect.width + value * 2,
      rect.height + value * 2
    );
  }
}

import { TypedEventEmitter } from '@worksheets/phaser/events';

import { TileMatch } from '../types';

export class ComboDetector {
  private matches: TileMatch[];
  private cascades: TileMatch[];
  events: TypedEventEmitter<{
    cascade: [TileMatch[]];
    combo: [TileMatch[]];
  }>;
  constructor() {
    this.cascades = [];
    this.matches = [];
    this.events = new TypedEventEmitter();
  }

  increment(matches: TileMatch[]) {
    if (matches.length > 1) {
      this.events.emit('combo', matches);
    }
    if (matches.length > 0) {
      this.matches = this.matches.concat(matches);
      this.cascades = this.cascades.concat([matches[0]]);
    }
  }

  reset() {
    const cascades = this.cascades;
    if (cascades.length > 1) {
      this.events.emit('cascade', cascades);
    }
    this.matches = [];
    this.cascades = [];
  }
}

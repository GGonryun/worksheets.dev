import { ColorKey, grid, lightning, theme } from '../settings';
import { Coordinate } from './coordinate';
import { GameGrid } from './game-grid';

const baseEmitterSettings = {
  lifespan: 500,
  speed: { min: 50, max: 250 },
  scale: { start: 0.25, end: 0 },
  rotate: { min: -360, max: 360, random: true },
  alpha: { start: 1, end: 0 },
  tintFill: true,
  emitting: false,
};

export class LineTerminator {
  grid: GameGrid;
  emitters: Record<ColorKey, Phaser.GameObjects.Particles.ParticleEmitter>;
  lightningEmitter: Phaser.GameObjects.Particles.ParticleEmitter;
  constructor(grid: GameGrid) {
    this.grid = grid;

    this.emitters = {
      blue: grid.scene.add.particles(0, 0, 'icon_dot', {
        ...baseEmitterSettings,
        tint: theme.get().tiles.blue,
      }),
      green: grid.scene.add.particles(0, 0, 'icon_dot', {
        ...baseEmitterSettings,
        tint: theme.get().tiles.green,
      }),
      orange: grid.scene.add.particles(0, 0, 'icon_dot', {
        ...baseEmitterSettings,
        tint: theme.get().tiles.orange,
      }),
      pink: grid.scene.add.particles(0, 0, 'icon_dot', {
        ...baseEmitterSettings,
        tint: theme.get().tiles.pink,
      }),
      yellow: grid.scene.add.particles(0, 0, 'icon_dot', {
        ...baseEmitterSettings,
        tint: theme.get().tiles.yellow,
      }),
    };
    this.lightningEmitter = grid.scene.add.particles(0, 0, 'icon_lightning', {
      lifespan: 500,
      scale: { start: 0.175, end: 0.0 },

      emitting: false,
    });
  }

  emit(coord: Coordinate, color: ColorKey) {
    const point = this.grid.zonePoint(coord);
    this.emitters[color].explode(grid.particlesPerBlock, point.x, point.y);
  }

  resolveLines() {
    const { horizontals, verticals } = this.identifyFullLines();
    for (const line of horizontals) {
      this.terminateHorizontal(line);
    }
    for (const line of verticals) {
      this.terminateVertical(line);
    }
    const total = horizontals.length + verticals.length;
    if (total > 1) {
      this.grid.scene.sound.play('collect_large');
    } else if (total > 0) {
      this.grid.scene.sound.play('collect_small');
    }
    return total;
  }

  lightning() {
    const MAX = lightning.blocksPerStrike;
    const blocks = Object.keys(this.grid.blocks);
    const count = Math.min(MAX, blocks.length);
    const selected =
      count < MAX ? blocks : Phaser.Math.RND.shuffle(blocks).slice(0, MAX);
    const coords = selected.map((key) => Coordinate.fromString(key));

    let destroyed = 0;
    coords.forEach((coord) => {
      const point = this.grid.zonePoint(coord);
      this.lightningEmitter.emitParticleAt(point.x, point.y);
      destroyed += this.terminateBlock(coord);
    });
    return destroyed;
  }

  revive() {
    // given that we're using an 11x11 grid, in order to revive the player delete the inner 5x5 grid
    const center = Math.floor(grid.size.columns / 2);
    const start = center - 2;
    const end = center + 3;

    let blocks = 0;
    for (let i = start; i < end; i++) {
      blocks += this.terminateHorizontal(i);
      blocks += this.terminateVertical(i);
    }
    return blocks;
  }

  terminateBlock(coord: Coordinate) {
    const block = this.grid.blocks[coord.toString()];

    if (block) {
      this.emit(coord, block.color);
      block.relinquish();
      delete this.grid.blocks[coord.toString()];
      return 1;
    }
    return 0;
  }

  terminateHorizontal(line: number) {
    let terminated = 0;
    for (let i = 0; i < grid.size.columns; i++) {
      terminated += this.terminateBlock(
        Coordinate.fromVector({ x: i, y: line })
      );
    }
    return terminated;
  }

  terminateVertical(line: number) {
    let terminated = 0;
    for (let i = 0; i < grid.size.rows; i++) {
      terminated += this.terminateBlock(
        Coordinate.fromVector({ x: line, y: i })
      );
    }
    return terminated;
  }

  identifyFullLines() {
    // check every horizontal line to see if it's complete
    const horizontals: number[] = [];
    for (let j = 0; j < grid.size.columns; j++) {
      let count = 0;
      for (let i = 0; i < grid.size.rows; i++) {
        const coord = Coordinate.fromVector({ x: i, y: j });
        if (this.grid.blocks[coord.toString()]) {
          count++;
        }
      }
      if (count === grid.size.rows) {
        horizontals.push(j);
      }
    }

    const verticals: number[] = [];
    for (let i = 0; i < grid.size.rows; i++) {
      let count = 0;
      for (let j = 0; j < grid.size.columns; j++) {
        const coord = Coordinate.fromVector({ x: i, y: j });
        if (this.grid.blocks[coord.toString()]) {
          count++;
        }
      }
      if (count === grid.size.columns) {
        verticals.push(i);
      }
    }

    return { horizontals, verticals };
  }
}

import { Point } from '@worksheets/phaser/types';

import { PARTICLE_TEXTURES } from '../combat/particles';
import { Color } from '../combat/types';

export type OutlineParticlesOptions = {
  points: Point[];
  colors: Color[];
  emitting: boolean;
};

export class OutlineParticles extends Phaser.GameObjects.Container {
  options: OutlineParticlesOptions;
  constructor(scene: Phaser.Scene, options: OutlineParticlesOptions) {
    super(scene);

    this.options = options;
    for (const point of options.points) {
      this.createParticles(point);
    }
  }

  createParticles(point: Point) {
    const options = {
      ...point,
      lifespan: 400,
      quantity: 1,
      scale: { random: true, start: 0.25, end: 0 },
      speed: { min: 20, max: 50 },
      rotate: { min: 0, max: 360 },
      angle: { min: 0, max: 360 },
      alpha: { start: 1, end: 0 },
      blendMode: Phaser.BlendModes.ADD,
      emitting: this.options.emitting,
    };

    for (const color of this.options.colors) {
      this.add(
        new Phaser.GameObjects.Particles.ParticleEmitter(
          this.scene,
          0,
          0,
          PARTICLE_TEXTURES[color],
          options
        )
      );
    }
  }

  setEmitting(emitting: boolean) {
    for (const emitter of this.list) {
      (emitter as Phaser.GameObjects.Particles.ParticleEmitter).emitting =
        emitting;
    }
  }
}

/**
 * Computes the points on a line between a start and end point, given a density.
 * @param start - The starting point {x, y}.
 * @param end - The ending point {x, y}.
 * @param density - The number of points between the start and end (exclusive).
 * @returns An array of points between the start and end.
 */
export const computeLinePoints = (
  start: Point,
  end: Point,
  density: number
): Point[] => {
  if (density < 0) {
    throw new Error('Density must be a non-negative integer.');
  }

  const points: Point[] = [];

  const dx = (end.x - start.x) / (density + 1);

  const dy = (end.y - start.y) / (density + 1);

  for (let i = 1; i <= density; i++) {
    const x = start.x + dx * i;
    const y = start.y + dy * i;
    points.push({ x, y });
  }

  return points;
};

export const generateSquarePoints = (
  size: number,
  density: number
): Point[] => {
  const top = {
    start: {
      x: -size / 2,
      y: -size / 2,
    },
    end: {
      x: size / 2,
      y: -size / 2,
    },
  };
  const left = {
    start: {
      x: -size / 2,
      y: -size / 2,
    },
    end: {
      x: -size / 2,
      y: size / 2,
    },
  };

  const right = {
    start: {
      x: size / 2,
      y: -size / 2,
    },
    end: {
      x: size / 2,
      y: size / 2,
    },
  };

  const bottom = {
    start: {
      x: -size / 2,
      y: size / 2,
    },
    end: {
      x: size / 2,
      y: size / 2,
    },
  };

  const points: Point[] = [];

  for (const side of [top, left, right, bottom]) {
    points.push(
      side.start,
      side.end,
      ...computeLinePoints(side.start, side.end, density)
    );
  }

  return points;
};

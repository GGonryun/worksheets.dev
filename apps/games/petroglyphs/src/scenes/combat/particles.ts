import { Point } from '@worksheets/phaser/types';

import { ElementDepths } from './constants';
import { Color } from './types';

export class Particles {
  static DURATION = 500;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  async sendMana(data: {
    color: keyof typeof PARTICLE_TEXTURES;
    from: Point;
    to: Point;
  }) {
    const emitter = this.scene.add.particles(
      0,
      0,
      PARTICLE_TEXTURES[data.color],
      {
        x: data.from.x,
        y: data.from.y,
        quantity: 1,
        speed: { random: [50, 200] },
        lifespan: { random: [100, 500] },
        scale: { random: true, start: 0.5, end: 0 },
        rotate: { min: 0, max: 360 },
        angle: { min: 0, max: 360 },
        frequency: 50,
        emitting: false,
      }
    );
    emitter.setDepth(ElementDepths.PARTICLES);

    const xVals = [data.from.x, data.to.x];
    const yVals = [data.from.y, data.to.y];

    return new Promise((resolve) =>
      this.scene.tweens.addCounter({
        from: 0,
        to: 1,
        ease: Phaser.Math.Easing.Sine.InOut,
        duration: Particles.DURATION,
        onUpdate: (tween) => {
          const v = tween.getValue();
          const x = Phaser.Math.Interpolation.CatmullRom(xVals, v);
          const y = Phaser.Math.Interpolation.CatmullRom(yVals, v);

          emitter.emitParticleAt(x, y);
        },
        onStart: () => {
          emitter.explode(50);
        },
        onComplete: () => {
          emitter.stop();
          resolve(true);
          this.scene.time.delayedCall(1000, () => {
            emitter.destroy();
          });
        },
      })
    );
  }

  async sendLine(data: {
    color: Color;
    from: Point;
    half?: boolean;
    to: Point;
  }) {
    const emitter = this.scene.add.particles(
      0,
      0,
      PARTICLE_TEXTURES[data.color],
      {
        x: data.from.x,
        y: data.from.y,
        quantity: 1,
        speed: 100,
        frequency: 100,
        lifespan: Particles.DURATION,
        scale: 0.15,
        alpha: { start: 1, end: 0 },
        emitting: false,
      }
    );
    emitter.setDepth(ElementDepths.PARTICLES);

    const xVals = [data.from.x, data.to.x];
    const yVals = [data.from.y, data.to.y];
    if (data.half) {
      const half = randomizeHalfPoint(data.to);
      xVals.splice(1, 0, half.x);
      yVals.splice(1, 0, half.y);
    }

    return new Promise((resolve) =>
      this.scene.tweens.addCounter({
        from: 0,
        to: 1,
        ease: Phaser.Math.Easing.Sine.InOut,
        duration: Particles.DURATION,
        onUpdate: (tween) => {
          const v = tween.getValue();
          const x = Phaser.Math.Interpolation.CatmullRom(xVals, v);
          const y = Phaser.Math.Interpolation.CatmullRom(yVals, v);

          emitter.emitParticleAt(x, y);
        },
        onComplete: () => {
          emitter.stop();
          resolve(true);
          this.scene.time.delayedCall(1000, () => {
            emitter.destroy();
          });
        },
      })
    );
  }

  async explosion(data: { color: keyof typeof PARTICLE_TEXTURES; at: Point }) {
    const emitter = this.scene.add.particles(
      0,
      0,
      PARTICLE_TEXTURES[data.color],
      {
        x: data.at.x,
        y: data.at.y,
        speed: { random: [50, 200] },
        lifespan: { random: [100, 1000] },
        scale: { random: true, start: 0.25, end: 0 },
        rotate: { min: 0, max: 360 },
        angle: { min: 0, max: 360 },
        frequency: 50,
        emitting: false,
        blendMode: Phaser.BlendModes.ADD,
      }
    );
    emitter.setDepth(ElementDepths.PARTICLES);

    return new Promise((resolve) => {
      emitter.explode(20);

      this.scene.time.delayedCall(Particles.DURATION, () => {
        emitter.stop();
        emitter.destroy();
        resolve(true);
      });
    });
  }
}

export const PARTICLE_TEXTURES: Record<Color, string> = {
  RED: 'red-particle',
  ORANGE: 'orange-particle',
  YELLOW: 'yellow-particle',
  GREEN: 'green-particle',
  BLUE: 'blue-particle',
  PURPLE: 'purple-particle',
  PINK: 'pink-particle',
  BROWN: 'brown-particle',
  GREY: 'grey-particle',
};

export const randomizeHalfPoint = (point: Point): Point => {
  const minX = point.x / 2;
  const maxX = point.x + (point.x - minX);
  const minY = point.y / 2;
  const maxY = point.y + (point.y - minY);
  return {
    x: Phaser.Math.Between(minX, maxX),
    y: Phaser.Math.Between(minY, maxY),
  };
};

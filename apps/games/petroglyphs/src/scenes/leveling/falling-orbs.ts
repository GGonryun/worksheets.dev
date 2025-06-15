import { valuesOf } from '@worksheets/util/objects';

import { GAME_WIDTH } from '../../settings';
import { ORB_SPRITES } from '../orbs/data';

export class FallingOrbParticles extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);

    this.create();
  }

  create() {
    for (let i = 0; i < 3; i++) {
      for (const sprite of valuesOf(ORB_SPRITES)) {
        const options = {
          x: { min: 0, max: GAME_WIDTH },
          y: -32,
          quantity: 1,
          gravityY: 20 + 15 * i,
          speedY: { min: 20 + 5 * i, max: 30 + 5 * i },
          lifespan: { min: 4000 + 1000 * i, max: 6000 + 1000 * i },
          scale: { start: 0.2 + 0.1 * i, end: 0 },
          rotate: { min: 0, max: 360 },
          frequency: 500,
          emitting: true,
        };
        this.scene.time.delayedCall(1000 * i, () => {
          this.createEmitter(sprite, options);
        });
      }
    }
  }

  createEmitter(
    sprite: string,
    options: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig
  ) {
    const emitter = new Phaser.GameObjects.Particles.ParticleEmitter(
      this.scene,
      0,
      0,
      sprite,
      options
    );
    this.add(emitter);
  }
}

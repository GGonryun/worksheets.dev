import { Point } from '@worksheets/phaser/types';

import { GAME_HEIGHT } from '../../settings';
import { ElementDepths } from './constants';
import { PARTICLE_TEXTURES } from './particles';

export class FallingBoulderSprite extends Phaser.GameObjects.Container {
  particles: Phaser.GameObjects.Particles.ParticleEmitter;
  constructor(scene: Phaser.Scene, spawn: Point, scale: number) {
    const duration = 2000;
    super(scene, spawn.x, spawn.y);
    this.setDepth(ElementDepths.GRID);
    const particles = new Phaser.GameObjects.Particles.ParticleEmitter(
      scene,
      0,
      0,
      PARTICLE_TEXTURES['GREY'],
      {
        speedY: { min: -100, max: -100 },
        speedX: { min: -200, max: 200 },
        scale: { random: true, start: 0.5, end: 0 },
        alpha: { random: true, start: 0.75, end: 0 },
        blendMode: Phaser.BlendModes.ADD,
        lifespan: 500,
        emitting: false,
      }
    );
    this.add(particles);

    const sprite = new Phaser.GameObjects.Sprite(
      scene,
      0,
      0,
      'icons-boulder'
    ).setScale(scale);
    this.add(sprite);

    this.scene.tweens.add({
      targets: sprite,
      y: GAME_HEIGHT + 300,
      duration,
      onUpdate: () => {
        particles.emitParticleAt(sprite.x, sprite.y, 2);
      },
    });
    this.scene.tweens.add({
      targets: sprite,
      angle: 720,
      duration,
    });
  }
}

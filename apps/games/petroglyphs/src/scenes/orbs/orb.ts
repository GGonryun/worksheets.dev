import { ORB_TYPE_TO_COLOR } from '../combat/constants';
import { PARTICLE_TEXTURES } from '../combat/particles';
import { ORB_SPRITES, OrbType } from './data';

export class Orb extends Phaser.GameObjects.Container {
  static Discrepancy = 16;
  static Scale = 0.25;
  static MovementDuration = 3000;
  type: OrbType;
  sprite: Phaser.GameObjects.Sprite;
  particles: Phaser.GameObjects.Particles.ParticleEmitter;
  ring: Phaser.GameObjects.Particles.ParticleEmitter;
  constructor(scene: Phaser.Scene, x: number, y: number, type: OrbType) {
    super(scene, x, y);
    this.type = type;

    // TODO: glow effects lag mobile experiences.
    // this.add(new OrbGlow(scene, { x: 0, y: 0, type }));

    this.particles = new Phaser.GameObjects.Particles.ParticleEmitter(
      this.scene,
      0,
      0,
      PARTICLE_TEXTURES[ORB_TYPE_TO_COLOR[type]],
      {
        speed: { min: 50, max: 300 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.5, end: 0 },
        alpha: { start: 1, end: 0 },
        lifespan: 1000,
        quantity: 1,
        frequency: 100,
        emitting: false,
        blendMode: Phaser.BlendModes.ADD,
      }
    );
    this.add(this.particles);

    this.ring = new Phaser.GameObjects.Particles.ParticleEmitter(
      this.scene,
      0,
      0,
      'ring-particle',
      {
        scale: { start: 1, end: 2 },
        alpha: { start: 0.5, end: 0 },
        lifespan: 400,
        emitting: false,
        blendMode: Phaser.BlendModes.ADD,
      }
    );
    this.add(this.ring);

    this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, ORB_SPRITES[type]);
    this.sprite.setOrigin(0.5, 0.5);
    this.add(this.sprite);

    this.setPosition(x, y);
    // the text should spawn in big and shrink down to the normal size.
    this.setScale(0.3);
    this.setAlpha(0);
    this.ring.explode(1);

    this.scene.tweens.chain({
      targets: this,
      tweens: [
        {
          scale: Orb.Scale * 1.25, // Grow larger than its final size
          alpha: 1, // Fade in
          duration: 100,
          ease: 'Back.easeOut',
          onStart: () => {
            this.sprite.setTintFill(0xffffff);
          },
          onComplete: () => {
            this.sprite.clearTint();
            this.particles.emitting = true;
          },
        },
        {
          scale: Orb.Scale, // Shrink back to normal size
          duration: 100,
          ease: 'Sine.easeOut',
        },
        {
          y: y - Phaser.Math.RND.between(-30, 30), // Drift slightly
          x: x + Phaser.Math.RND.between(-30, 30), // Drift slightly
          duration: Orb.MovementDuration,
          ease: 'Quad.easeOut',
          onComplete: () => {
            // Add a particle effect or shimmer on completion
            // addShimmer(scene, orb.x, orb.y);
          },
        },
      ],
    });
  }
}

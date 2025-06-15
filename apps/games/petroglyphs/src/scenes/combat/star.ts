import { TypedEventEmitter } from '@worksheets/phaser/events';

import { GAME_HEIGHT, GAME_WIDTH } from '../../settings';
import { PortalController } from '../portal/portal';
import { STORE_FONT } from '../util/fonts';
import { ElementDepths, SCENE_TRANSITION_SPEED } from './constants';
import { PARTICLE_TEXTURES } from './particles';

export class StageCompletionStar extends Phaser.GameObjects.Container {
  star: Phaser.GameObjects.Sprite;
  burst: Phaser.GameObjects.Sprite;
  particles: Phaser.GameObjects.Particles.ParticleEmitter;
  pointer: Phaser.GameObjects.Sprite;
  continue: Phaser.GameObjects.Text;
  touchLayer: Phaser.GameObjects.Rectangle;
  events: TypedEventEmitter<{
    continue: [];
  }>;
  constructor(scene: Phaser.Scene) {
    const portalX = PortalController.PortalPoint.x;
    const portalY = PortalController.PortalPoint.y;

    super(scene, portalX, portalY);

    this.events = new TypedEventEmitter();

    this.particles = new Phaser.GameObjects.Particles.ParticleEmitter(
      this.scene,
      0,
      0,
      PARTICLE_TEXTURES['YELLOW'],
      {
        speed: { min: 50, max: 300 },
        scale: { start: 0.5, end: 0, random: true },
        angle: { start: 0, end: 360, steps: 64 }, // Full circle
        lifespan: 1500,
        blendMode: Phaser.BlendModes.ADD,
        gravityY: 50, // Adds a shower effect
        emitting: false,
      }
    );
    this.add(this.particles);

    this.burst = new Phaser.GameObjects.Sprite(scene, 0, 0, 'ring-particle');
    this.burst.setScale(0);
    this.burst.setAlpha(0.5);
    this.burst.setBlendMode(Phaser.BlendModes.ADD);
    this.add(this.burst);

    this.star = new Phaser.GameObjects.Sprite(scene, 0, 0, 'icons-star')
      .setScale(0)
      .setAlpha(0);
    this.add(this.star);

    this.pointer = new Phaser.GameObjects.Sprite(
      scene,
      0,
      200,
      'icons-point-up'
    )
      .setScale(0.7)
      .setAlpha(0);
    this.add(this.pointer);

    this.continue = new Phaser.GameObjects.Text(
      scene,
      0,
      300,
      'Tap to continue',
      {
        ...STORE_FONT,
      }
    )
      .setOrigin(0.5)
      .setAlpha(0);
    this.add(this.continue);

    this.touchLayer = new Phaser.GameObjects.Rectangle(
      scene,
      -portalX,
      -portalY,
      GAME_WIDTH,
      GAME_HEIGHT,
      0x000000,
      0
    ).setOrigin(0);

    this.touchLayer.on('pointerdown', async () => {
      this.warp();
      this.events.emit('continue');
    });

    this.add(this.touchLayer);
    this.setDepth(ElementDepths.MAX);
  }

  async warp() {
    // the star flies up and disappears
    this.touchLayer.disableInteractive();
    this.particles.emitting = false;
    this.star.clearTint();
    this.scene.tweens.add({
      targets: [this.pointer, this.continue],
      alpha: 0,
      duration: 500,
      ease: Phaser.Math.Easing.Sine.InOut,
    });

    // make the star fly up
    this.scene.tweens.add({
      targets: this.star,
      y: GAME_HEIGHT / 2 - this.y,
      scale: 20,
      duration: SCENE_TRANSITION_SPEED,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
  }

  async appear() {
    this.scene.tweens.add({
      targets: this.star,
      scale: { from: 0, to: 1.5 },
      alpha: { from: 0, to: 1 },
      rotation: { from: 0, to: 2 * Math.PI },
      ease: Phaser.Math.Easing.Back.Out,
      duration: 1000,
      onStart: () => {
        this.scene.cameras.main.flash(250);
        this.scene.cameras.main.shake(250, 0.015);
        this.particles.emitParticle(100);
        this.particles.emitting = true;
      },
    });

    this.scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 150,
      onStart: () => {
        this.star.setTintFill(0xffffff);
      },
      onComplete: () => {
        this.star.clearTint();
      },
    });

    // Animate the light burst for extra pop
    this.scene.tweens.add({
      targets: this.burst,
      scale: { from: 0, to: 5 },
      alpha: { from: 0.5, to: 0 },
      duration: 1500,
    });

    // Add pulsing effect to the star after initial animation
    this.scene.time.delayedCall(1000, () => {
      this.scene.tweens.add({
        targets: this.star,
        scale: { from: 1.5, to: 1.75 },
        ease: Phaser.Math.Easing.Sine.InOut,
        yoyo: true,
        repeat: -1,
        duration: 500,
      });

      this.scene.tweens.add({
        targets: [this.pointer, this.continue],
        alpha: 1,
        duration: 500,
        ease: Phaser.Math.Easing.Sine.InOut,
        onComplete: () => {
          this.touchLayer.setInteractive();
        },
      });

      this.scene.tweens.add({
        targets: this.pointer,
        y: this.pointer.y + 10,
        yoyo: true,
        repeat: -1,
        duration: 500,
        ease: Phaser.Math.Easing.Sine.InOut,
      });
    });
  }
}

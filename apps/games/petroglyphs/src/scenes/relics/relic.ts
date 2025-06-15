import { TypedEventEmitter } from '@worksheets/phaser/events';
import { assertNever } from '@worksheets/util/errors';
import { waitFor } from '@worksheets/util/time';

import {
  COLORS_HEX,
  ICON_SIZE,
  RELIC_ICON_BORDER_SIZE,
  RELIC_ICON_SIZE,
} from '../combat/constants';
import { Color } from '../combat/types';
import {
  generateSquarePoints,
  OutlineParticles,
} from '../util/outline-particles';
import {
  RelicCooldown,
  RelicCooldownEffect,
  RelicEffect,
  RelicInformation,
  RelicSpellEffect,
} from './types';

export type RelicBackgroundOptions = {
  size: number;
  info: { color: Color };
  defaultFill: number;
};

export const relicColorFill = (color: Color) =>
  Phaser.Display.Color.ValueToColor(COLORS_HEX[color]);

export class RelicBackground extends Phaser.GameObjects.Container {
  static Gap = 2;
  options: RelicBackgroundOptions;
  fill: Phaser.GameObjects.Rectangle;
  outline: OutlineParticles;

  constructor(scene: Phaser.Scene, options: RelicBackgroundOptions) {
    super(scene);
    this.options = options;

    this.create();
  }

  private create() {
    const {
      size,
      info: { color },
    } = this.options;

    const border = new Phaser.GameObjects.Rectangle(
      this.scene,
      -size / 2,
      -size / 2,
      size + RelicBackground.Gap * 2,
      size + RelicBackground.Gap * 2,
      0xffffff
    );
    border.setOrigin(0.5, 0.5);
    border.setStrokeStyle(RELIC_ICON_BORDER_SIZE, 0x000000);
    this.add(border);

    this.createFill();
    this.updateFill(this.options.defaultFill);

    this.outline = new OutlineParticles(this.scene, {
      colors: [color],
      points: generateSquarePoints(size, 10),
      emitting: false,
    });
    this.outline.setPosition(-size / 2, -size / 2);
    this.add(this.outline);
    this.sendToBack(this.outline);
  }

  createFill() {
    this.fill = new Phaser.GameObjects.Rectangle(
      this.scene,
      -this.options.size / 2,
      -this.options.size / 2,
      this.options.size + RelicBackground.Gap,
      -this.options.size - RelicBackground.Gap,
      relicColorFill(this.options.info.color).color,
      0.5
    );
    this.fill.setOrigin(0.5, 0.5);
    this.add(this.fill);
  }

  updateFill(percentage: number) {
    this.fill.height = (this.options.size + RelicBackground.Gap) * -percentage;
  }
}

export type RelicOptions<T extends RelicEffect = RelicEffect> = {
  size: number;
  level: number;
  info: RelicInformation;
  effect?: T;
  defaultFill: number;
  automatic: boolean;
  isBonus: boolean;
};

export class Stars extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, { level }: { level: number }) {
    super(scene);

    for (let i = 0; i <= level; i++) {
      const star = new Phaser.GameObjects.Sprite(
        this.scene,
        i * 16 - level * 8,
        0,
        'icons-star'
      )
        .setOrigin(0.5, 0.5)
        .setScale(0.25);
      this.add(star);
    }
  }
}

export class Relic<T extends RelicEffect = RelicEffect> extends Phaser
  .GameObjects.Container {
  scene: Phaser.Scene;
  shakeTween: Phaser.Tweens.Tween;
  background: RelicBackground;
  options: RelicOptions<T>;
  stars: Stars;
  sprite: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, options: RelicOptions<T>) {
    super(scene);
    this.scene = scene;
    this.options = options;

    this.create();
  }

  create() {
    this.background = new RelicBackground(this.scene, this.options);
    this.background.setPosition(this.options.size / 2, this.options.size / 2);
    this.add(this.background);

    this.sprite = new Phaser.GameObjects.Sprite(
      this.scene,
      0,
      0,
      this.options.info.sprite
    );
    this.sprite.setScale(this.options.size / ICON_SIZE - 0.05);
    this.add(this.sprite);

    this.stars = new Stars(this.scene, this.options);
    this.add(this.stars);
    Phaser.Display.Align.In.BottomCenter(
      this.stars,
      this.background,
      -this.options.size / 2
    );

    this.setInteractive(
      new Phaser.Geom.Rectangle(
        -this.background.options.size / 2,
        -this.background.options.size / 2,
        this.background.options.size,
        this.background.options.size
      ),
      Phaser.Geom.Rectangle.Contains
    );
  }

  upgrade(level: number, info: RelicInformation, effect: T) {
    this.background.outline.setEmitting(false);

    this.options.info = info;
    this.options.effect = effect;
    this.options.level = level;

    this.scene.tweens.killTweensOf(this);
    this.list.forEach((child) => {
      this.remove(child);
      child.destroy();
    });

    this.create();
  }

  getWorldPosition() {
    const matrix = this.getWorldTransformMatrix();
    const decomposed = matrix.decomposeMatrix();
    return {
      x: decomposed.translateX,
      y: decomposed.translateY,
    };
  }

  shake() {
    if (this.shakeTween && this.shakeTween.isPlaying()) {
      this.shakeTween.stop();
    }
    this.scale = 1;

    this.shakeTween = this.scene.tweens.add({
      targets: this,
      scale: 1.1,
      ease: Phaser.Math.Easing.Cubic.InOut,
      duration: 100,
      yoyo: true,
      repeat: 3,
    });
  }

  pulse() {
    this.scene.tweens.add({
      targets: this,
      scale: { from: this.scale, to: this.scale * 0.9 },
      ease: Phaser.Math.Easing.Cubic.InOut,
      duration: 500,
      yoyo: true,
      repeat: -1,
    });
  }

  async animate() {
    return new Promise((resolve) => {
      this.scene.tweens.chain({
        targets: this,
        tweens: [
          {
            scaleX: 1.25,
            scaleY: 1.25,
            ease: Phaser.Math.Easing.Cubic.InOut,
            duration: 100,
            onComplete: () => {
              this.sprite.setTintFill(0xffffff);
              const copy = new Phaser.GameObjects.Sprite(
                this.scene,
                this.sprite.x,
                this.sprite.y,
                this.sprite.texture.key
              );
              this.add(copy);
              this.scene.tweens.add({
                targets: copy,
                scale: { from: 0, to: 2 },
                alpha: { from: 1, to: 0 },
                duration: 300,
                ease: Phaser.Math.Easing.Cubic.InOut,
                onComplete: () => {
                  copy.destroy();
                  this.remove(copy);
                },
              });

              const ring = new Phaser.GameObjects.Sprite(
                this.scene,
                this.sprite.x,
                this.sprite.y,
                'ring-particle'
              );
              this.add(ring);
              this.scene.tweens.add({
                targets: ring,
                scale: { from: 0, to: 3 },
                alpha: { from: 1, to: 0 },
                duration: 500,
                ease: Phaser.Math.Easing.Sine.InOut,
                onComplete: () => {
                  ring.destroy();
                  this.remove(ring);
                },
              });

              const particles =
                new Phaser.GameObjects.Particles.ParticleEmitter(
                  this.scene,
                  0,
                  0,
                  this.options.info.sprite,
                  {
                    lifespan: { min: 500, max: 1000 },
                    scale: { random: true, start: 0.5, end: 0 },
                    speed: { min: 100, max: 300 },
                    rotate: { min: 0, max: 360 },
                    angle: { min: 0, max: 360 },
                    alpha: { start: 1, end: 0 },
                    blendMode: Phaser.BlendModes.ADD,
                    emitting: false,
                  }
                );
              this.add(particles);
              this.sendToBack(particles);
              particles.explode(100);
              this.scene.time.delayedCall(1500, () => {
                this.remove(particles);
                particles.destroy();
              });
            },
          },

          {
            scaleX: 1,
            scaleY: 1,
            ease: Phaser.Math.Easing.Cubic.InOut,
            delay: 100,
            duration: 100,
            onComplete: () => {
              this.sprite.clearTint();
            },
          },
        ],
        onComplete: resolve,
      });
    });
  }
}

export class CooldownRelic<
  T extends RelicCooldownEffect | RelicSpellEffect
> extends Relic<T> {
  cooldown: CooldownController;
  constructor(
    scene: Phaser.Scene,
    options: RelicOptions<T> & {
      cooldown: RelicCooldown;
      startFull: boolean;
    }
  ) {
    super(scene, options);

    const cooldownController = new CooldownController({
      key: options.info.key,
      ...options,
    });

    cooldownController.events.on('update', (percentage) => {
      this.background.updateFill(Math.min(percentage, 1));
    });

    this.cooldown = cooldownController;
  }

  updateCooldown(apply: RelicCooldown) {
    return this.cooldown.process(apply);
  }

  reset() {
    this.cooldown.updateProgress(0);
  }

  upgrade(level: number, info: RelicInformation, effect: T) {
    const progress = this.cooldown.progress;
    super.upgrade(level, info, effect);
    this.cooldown.upgrade(effect.when);
    this.cooldown.updateProgress(progress);
  }
}

export type CooldownOptions = {
  key: string;
  cooldown: RelicCooldown;
  automatic: boolean;
  startFull: boolean;
};

export class CooldownController {
  progress: number;
  options: CooldownOptions;
  events: TypedEventEmitter<{
    update: [number];
  }>;

  constructor(options: CooldownOptions) {
    this.progress = options.startFull ? options.cooldown.amount : 0;
    this.options = options;
    this.events = new TypedEventEmitter();
  }

  upgrade(cooldown: RelicCooldown) {
    this.options = {
      ...this.options,
      cooldown,
    };
  }

  process(apply: RelicCooldown): {
    executions: number;
  } {
    const { cooldown } = this.options;
    if (!this.canApplyCooldown(cooldown, apply)) return { executions: 0 };

    this.updateProgress(this.progress + apply.amount);

    if (this.progress >= cooldown.amount) {
      if (!this.options.automatic) {
        this.updateProgress(this.options.cooldown.amount);
        return { executions: 0 };
      }

      const executions = Math.floor(this.progress / cooldown.amount);
      const remaining = this.progress % cooldown.amount;

      this.updateProgress(remaining);
      return { executions };
    }
    return { executions: 0 };
  }

  refresh() {
    this.updateProgress(0);
  }

  canApplyCooldown(cooldown: RelicCooldown, apply: RelicCooldown) {
    switch (cooldown.type) {
      case 'turns':
        return cooldown.type === apply.type;
      case 'matches':
        return (
          cooldown.type === apply.type &&
          (!cooldown.tile || cooldown.tile === apply.tile)
        );
      case 'tiles':
        return (
          cooldown.type === apply.type &&
          (!cooldown.tile || cooldown.tile === apply.tile)
        );
      default:
        throw assertNever(cooldown);
    }
  }

  updateProgress(value: number) {
    this.progress = value;
    const percentage = this.progress / this.options.cooldown.amount;
    this.events.emit('update', percentage);
  }
}

export class SpellRelic extends CooldownRelic<RelicSpellEffect> {
  ready: boolean;
  constructor(
    scene: Phaser.Scene,
    options: RelicOptions<RelicSpellEffect> & {
      cooldown: RelicCooldown;
      startFull: boolean;
    }
  ) {
    super(scene, options);

    this.cooldown.events.on('update', (percentage) => {
      if (!this.ready && percentage >= 1) {
        this.makeReady();
      }
    });

    // first creation skips the animation entrance because the level-up handler will take care of calling
    this.makeReady(false);
  }

  async makeReady(animate = false) {
    this.ready = true;

    animate && (await this.animate());
    await waitFor(400);
    this.pulse();
    this.background.updateFill(1);
    this.background.outline.setEmitting(true);
  }

  upgrade(level: number, info: RelicInformation, effect: RelicSpellEffect) {
    this.ready = false;
    this.scene.tweens.killTweensOf(this);

    super.upgrade(level, info, effect);

    this.cooldown.updateProgress(effect.when.amount);
  }

  cast() {
    this.ready = false;
    this.cooldown.refresh();
    this.background.outline.setEmitting(false);
    this.scene.tweens.killTweensOf(this);
    this.scale = 1;
  }
}

export class RelicFactory {
  scene: Phaser.Scene;
  size: number;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.size = RELIC_ICON_SIZE;
  }

  create(
    level: number,
    info: RelicInformation,
    effect: RelicEffect
  ): Relic<RelicEffect> {
    switch (effect.type) {
      case 'triggered':
        return new Relic(this.scene, {
          size: this.size,
          level,
          info,
          effect,
          defaultFill: 1,
          automatic: false,
          isBonus: false,
        });
      case 'cooldown':
        return new CooldownRelic(this.scene, {
          size: this.size,
          level,
          info,
          effect,
          defaultFill: 0,
          automatic: true,
          cooldown: effect.when,
          startFull: false,
          isBonus: false,
        });
      case 'spell':
        return new SpellRelic(this.scene, {
          size: this.size,
          level,
          info,
          effect,
          defaultFill: 1,
          automatic: false,
          cooldown: effect.when,
          startFull: true,
          isBonus: false,
        });
      case 'passive':
        return new Relic(this.scene, {
          size: this.size,
          level,
          info,
          effect,
          defaultFill: 1,
          automatic: false,
          isBonus: false,
        });
      default:
        throw assertNever(effect);
    }
  }

  createBonus(level: number, info: RelicInformation): Relic<RelicEffect> {
    const relic = new Relic(this.scene, {
      size: this.size,
      level,
      info,
      defaultFill: 1,
      automatic: false,
      isBonus: true,
    });
    relic.animate();
    relic.background.outline.setEmitting(true);
    this.scene.time.delayedCall(250, () => {
      relic.pulse();
    });
    return relic;
  }
}

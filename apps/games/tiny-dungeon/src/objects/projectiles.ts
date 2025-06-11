import { Point } from '@worksheets/phaser/types';
import { keysOf } from '@worksheets/util/objects';

import { GameScene } from '../scenes/game';
import { addAnimation } from './animations';
import { ProjectileAttackConfig, ProjectileCharacterType } from './character';
import { LaunchProjectileEvent } from './events';

export type ProjectileType = 'spear' | 'magic' | 'rocket';
export type Projectiles = ReturnType<typeof newProjectiles>;

const PROJECTILE_ANIMATION_COMMON = {
  frameRate: 30,
  repeat: 0,
  hideOnComplete: true,
};

export const PROJECTILE_CHARACTER_CONFIGS: Record<
  ProjectileCharacterType,
  ProjectileAttackConfig
> = {
  hunter: {
    delay: 500,
    offset: new Phaser.Math.Vector2(-2, -2),
    projectile: {
      type: 'spear',
      offset: { x: -1, y: -2 },
      speed: 1000,
      peak: 32,
      projectileTexture: 'hunter-projectile',
      animation: {
        ...PROJECTILE_ANIMATION_COMMON,
        texture: 'hunter-projectile-effect',
        key: 'hunter-projectile-explode',
        animationFrames: 4,
      },
    },
  },
  mage: {
    delay: 350,
    offset: new Phaser.Math.Vector2(-1, -5),
    projectile: {
      type: 'magic',
      offset: { x: 0, y: -6 },
      speed: 1750,
      peak: 16,
      projectileTexture: 'mage-projectile',
      animation: {
        ...PROJECTILE_ANIMATION_COMMON,
        texture: 'mage-projectile-effect',
        key: 'mage-projectile-explode',
        animationFrames: 3,
      },
    },
  },
  rocketeer: {
    delay: 200,
    offset: new Phaser.Math.Vector2(-2, -8),
    projectile: {
      type: 'rocket',
      offset: {
        left: { x: 3, y: -10 },
        up: { x: -0, y: -10 },
        down: { x: -0, y: -12 },
        right: { x: -3, y: -10 },
      },
      speed: 2500,
      peak: 100,
      projectileTexture: 'rocketeer-projectile',
      animation: {
        ...PROJECTILE_ANIMATION_COMMON,
        texture: 'rocketeer-projectile-effect',
        key: 'rocketeer-projectile-explode',
        animationFrames: 3,
      },
    },
  },
};

export const newProjectiles = (scene: GameScene) => {
  const shadows = scene.add.group();
  const ballistics = scene.add.group();
  keysOf(PROJECTILE_CHARACTER_CONFIGS).forEach((key) => {
    const { projectile } = PROJECTILE_CHARACTER_CONFIGS[key];
    const { animation } = projectile;

    addAnimation(scene, animation);
  });

  const createEffect = ({
    destination,
    animationKey,
    effectTexture,
  }: {
    destination: Point;
    animationKey: string;
    effectTexture: string;
  }) => {
    const effect = scene.add
      .sprite(destination.x, destination.y, effectTexture)
      .setOrigin(0.5);
    effect.play(animationKey);
    effect.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      scene.time.delayedCall(1000, () => {
        effect.destroy();
      });
    });
  };

  const createShadow = ({
    source,
    destination,
    duration,
    throwDistance,
    projectileTexture,
  }: {
    source: Point;
    destination: Point;
    duration: number;
    throwDistance: number;
    projectileTexture: string;
  }) => {
    const shadow = scene.add
      .sprite(source.x, source.y, projectileTexture)
      .setOrigin(0.5)
      .setScale(0)
      .setTint(0x000000);
    shadows.add(shadow);

    // close distances are more angled towards the sky
    // this should probably be synchronized with the angle of the spear
    // but using distance is easier than calculating the projection.
    // using a projection would couple the shadow to the thrown spear
    const normalizeShadowScale = (t: number) => {
      const max = 72;
      const min = 0.5;
      const normalizedThrow = Math.min(max, throwDistance);
      const shadowScale = Math.max(min, normalizedThrow / max);
      const xs = [0.4, 0.7, 1, 0.8, 0.4].map((v) => v * shadowScale);
      const ys = [0.9, 1, 0.7].map((v) => v * shadowScale);
      const x = Phaser.Math.Interpolation.Linear(xs, t);
      const y = Phaser.Math.Interpolation.Linear(ys, t);
      return { x, y };
    };

    scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration,
      onUpdate: (tween) => {
        const v = tween.getValue();
        const x = Phaser.Math.Interpolation.Linear(
          [source.x, destination.x],
          v
        );
        const y = Phaser.Math.Interpolation.Linear(
          [source.y, destination.y],
          v
        );
        shadow.setPosition(x, y);
        shadow.setAlpha(1 - 0.25 * v);
        // look at the destination
        const angle = Phaser.Math.Angle.Between(
          shadow.x,
          shadow.y,
          destination.x,
          destination.y
        );
        shadow.setRotation(angle + Math.PI / 2);

        const scale = normalizeShadowScale(v);
        shadow.setScale(scale.x, scale.y);
      },
      onComplete: () => {
        shadow.destroy();
      },
    });
  };

  const createBallistic = (options: {
    source: Point;
    destination: Point;
    peak: number;
    duration: number;
    animationKey: string;
    projectileTexture: string;
    effectTexture: string;
    type: ProjectileType;
  }) => {
    const {
      type,
      source,
      destination,
      duration,
      animationKey,
      effectTexture,
      projectileTexture,
    } = options;
    const marker = scene.floorMarkers.create(destination);
    const sprite = scene.add
      .sprite(source.y, source.y, projectileTexture)
      .setOrigin(0.5);
    ballistics.add(sprite);
    const tile = scene.map.getTile(destination);

    const computer = newCurveComputer(options);
    scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration,
      onStart: () => {
        const { x, y } = computer.run(0);
        sprite.setPosition(x, y);
        sprite.setRotation(0);
      },
      onUpdate: (tween) => {
        const v = tween.getValue();
        const { x, y, a } = computer.run(v);

        sprite.setPosition(x, y);
        sprite.setRotation(a);
      },
      onComplete: () => {
        sprite.destroy();
        marker.destroy();
        createEffect({ destination, animationKey, effectTexture });
        scene.gameEvents.emit('projectile-hit', {
          type,
          tile,
        });
      },
    });
  };

  const create = ({
    source,
    destination,
    projectile,
  }: LaunchProjectileEvent) => {
    const pointX = source.x + 4;
    const pointY = source.y + 4;

    const throwDistance = Math.abs(destination.x - pointX);
    const verticalDifference = pointY - destination.y;
    const peakHeight = Math.max(
      projectile.peak + 34 - throwDistance * 0.5 + verticalDifference * 0.75,
      projectile.peak
    );
    const duration = projectile.speed + throwDistance * 5;

    createBallistic({
      ...projectile,
      animationKey: projectile.animation.key,
      effectTexture: projectile.animation.texture,
      source: {
        x: pointX,
        y: pointY,
      },
      destination,
      duration,
      peak: peakHeight,
    });
    createShadow({
      ...projectile,
      source: {
        x: pointX,
        y: pointY,
      },
      throwDistance,
      destination,
      duration,
    });
  };

  return {
    create,
  };
};

const newCurveComputer = (options: {
  source: Point;
  destination: Point;
  peak: number;
}) => {
  const { destination, source, peak } = options;

  let lastX = source.x;
  let lastY = source.y;

  const run = (t: number) => {
    const x = Phaser.Math.Interpolation.Linear([source.x, destination.x], t);
    const y = Phaser.Math.Interpolation.Bezier(
      [source.y, source.y - peak, source.y - peak, destination.y],
      t
    );
    const dx = x - lastX;
    const dy = y - lastY;
    const a = Math.atan2(dy, dx) + Math.PI / 2; // Rotation in radians
    lastX = x;
    lastY = y;

    return { x, y, a };
  };

  return { run };
};

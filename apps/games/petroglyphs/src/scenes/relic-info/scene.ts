import { TypedEventEmitter } from '@worksheets/phaser/events';

import { GAME_HEIGHT, GAME_WIDTH } from '../../settings';
import { ICON_SIZE } from '../combat/constants';
import { RELIC_EFFECTS } from '../relics/data';
import { RelicOptions } from '../relics/relic';
import { RelicOwnership } from '../relics/types';
import { RelicCard } from './relic-card';

type AnimationDirection = { direction: 'left' | 'right' };

export const RELIC_BACK_BUTTON = {
  height: GAME_HEIGHT - 128,
  scale: 2,
};

export type BasicRelicModalInfo = Omit<
  RelicOptions,
  'size' | 'defaultFill' | 'automatic' | 'isBonus'
>;

export type RelicInfoModalSceneOptions = BasicRelicModalInfo & {
  bus: TypedEventEmitter<
    {
      'close-relic-info': [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } & { [key: string]: any }
  >;
};

export class RelicInfoModalScene extends Phaser.Scene {
  static key = 'RelicInfoModalScene';
  titleHeight = 64;
  centeredX = GAME_WIDTH / 2;
  options: RelicInfoModalSceneOptions;
  card: RelicCard;

  constructor() {
    super(RelicInfoModalScene.key);
  }

  static launch({ scene }: Phaser.Scene, options: RelicInfoModalSceneOptions) {
    scene.launch(RelicInfoModalScene.key, options);
  }

  static stop({ scene }: Phaser.Scene) {
    scene.stop(RelicInfoModalScene.key);
  }

  static isActive({ scene }: Phaser.Scene) {
    return scene.isActive(RelicInfoModalScene.key);
  }

  create(options: RelicInfoModalSceneOptions) {
    this.options = options;

    this.createBackdrop();
    this.createBackButton();
    this.createLevelControls();
    this.createCard({
      key: options.info.key,
      level: options.level,
      direction: 'right',
    });

    this.options.bus.on('stage-complete', this.closeScene, this);
    this.options.bus.on('start-level-up', this.closeScene, this);

    // on scene shutdown.
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.options.bus.off('stage-complete', this.closeScene, this);
      this.options.bus.off('start-level-up', this.closeScene, this);
    });
  }

  closeScene() {
    this.options.bus.emit('close-relic-info');
  }

  createBackdrop() {
    this.add
      .rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.5)
      .setOrigin(0, 0)
      // intercepts clicks
      .setInteractive();
  }

  createCard(ownership: RelicOwnership & AnimationDirection) {
    this.card = new RelicCard(this, { ...ownership, showUpgradeIcon: false })
      .setPosition(-300, 128)
      .setScale(2.25);
    this.add.existing(this.card);

    this.card.animateIn({
      from: {
        x: ownership.direction === 'right' ? -GAME_WIDTH : GAME_WIDTH * 2,
        y: 128,
      },
      to: {
        x: GAME_WIDTH / 2,
        y: 128,
      },
    });
  }

  removeCard({ direction }: AnimationDirection) {
    const card = this.card;
    return new Promise((resolve) =>
      this.tweens.add({
        targets: card,
        x: direction === 'right' ? GAME_WIDTH * 2 : -GAME_WIDTH,
        angle: direction === 'right' ? 50 : -50,
        duration: 300,
        ease: Phaser.Math.Easing.Sine.Out,
        onComplete: () => {
          card.destroy();
          resolve(true);
        },
      })
    );
  }

  createLevelControls() {
    const controls = new RelicLevelControls(this, {
      levels: RELIC_EFFECTS[this.options.info.key].length,
      level: this.options.level,
    });
    const bounds = controls.getBounds();
    controls.setPosition(
      this.centeredX - bounds.width / 2 + ICON_SIZE / 2,
      GAME_HEIGHT - 475
    );
    controls.events.on('level-selected', async (level, delta) => {
      const direction = delta > 0 ? 'right' : 'left';
      this.removeCard({ direction });
      this.createCard({ key: this.options.info.key, level, direction });
    });
    this.add.existing(controls);
  }

  createBackButton() {
    this.add
      .sprite(this.centeredX, RELIC_BACK_BUTTON.height, 'icons-back')
      .setScale(RELIC_BACK_BUTTON.scale)
      .setInteractive()
      .on('pointerdown', () => {
        this.options.bus.emit('close-relic-info');
      });
  }
}

export class RelicLevelControls extends Phaser.GameObjects.Container {
  slots: Phaser.GameObjects.Sprite[] = [];
  stars: Phaser.GameObjects.Sprite[] = [];
  current: number;
  max: number;
  events: TypedEventEmitter<{ 'level-selected': [number, number] }>;
  constructor(
    scene: Phaser.Scene,
    { levels, level }: { levels: number; level: number }
  ) {
    const gap = 8;
    const iconSize = ICON_SIZE + gap;

    super(scene);
    this.events = new TypedEventEmitter();
    this.current = level;
    this.max = levels - 1;

    this.slots = [];
    this.stars = [];

    const left = new Phaser.GameObjects.Sprite(
      scene,
      0,
      0,
      'icons-disadvantage'
    )
      .setAngle(90)
      .setInteractive()
      .on('pointerdown', () => {
        this.updateStars(this.current - 1);
      });
    this.add(left);

    const right = new Phaser.GameObjects.Sprite(
      scene,
      iconSize * (levels + 1),
      0,
      'icons-advantage'
    )
      .setAngle(90)
      .setInteractive()
      .on('pointerdown', () => {
        this.updateStars(this.current + 1);
      });
    this.add(right);

    for (let i = 0; i < levels; i++) {
      const x = (i + 1) * iconSize;
      const grey = new Phaser.GameObjects.Sprite(
        scene,
        x,
        0,
        'icons-grey-star'
      ).setAlpha(0.5);

      const yellow = new Phaser.GameObjects.Sprite(scene, x, 0, 'icons-star')
        .setAlpha(i <= level ? 1 : 0)
        .setData('selected', i <= level);

      this.add(grey);
      this.add(yellow);
      this.slots.push(grey);
      this.stars.push(yellow);
    }

    this.updateStars(level);
  }

  updateStars(level: number) {
    if (level < 0 || level > this.max) {
      return;
    }

    const delta = level - this.current;

    this.events.emit('level-selected', level, delta);

    this.current = level;
    this.stars.forEach((star, i) => {
      if (i <= level) {
        if (star.getData('selected')) {
          return;
        }

        this.scene.tweens.chain({
          targets: star,
          tweens: [
            {
              alpha: 1,
              scale: { from: 1, to: 1.5 },
              duration: 100,
              ease: Phaser.Math.Easing.Cubic.InOut,
              onStart: () => {
                star.setData('selected', true);
                star.setTintFill(0xffffff);
              },
            },
            {
              scale: { from: 1.5, to: 1 },
              duration: 100,
              ease: Phaser.Math.Easing.Cubic.InOut,
              onComplete: () => {
                star.clearTint();

                const clone = new Phaser.GameObjects.Sprite(
                  this.scene,
                  star.x,
                  star.y,
                  'icons-star'
                );
                this.add(clone);
                this.scene.tweens.add({
                  targets: clone,
                  scale: { from: 1, to: 3 },
                  alpha: { from: 0.5, to: 0 },
                  ease: Phaser.Math.Easing.Sine.Out,
                  duration: 500,
                  onComplete: () => {
                    this.remove(clone);
                    clone.destroy();
                  },
                });
              },
            },
          ],
        });
      } else {
        if (!star.getData('selected')) {
          return;
        }
        this.scene.tweens.chain({
          targets: star,
          tweens: [
            {
              alpha: 0,
              scale: { from: 1, to: 3 },
              duration: 500,
              ease: Phaser.Math.Easing.Sine.InOut,
              onStart: () => {
                star.setData('selected', false);
              },
            },
          ],
        });
      }
    });
  }
}

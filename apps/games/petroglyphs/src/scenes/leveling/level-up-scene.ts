import { TypedEventEmitter } from '@worksheets/phaser/events';
import { Point } from '@worksheets/phaser/types';
import { assertNever } from '@worksheets/util/errors';

import { GAME_HEIGHT, GAME_WIDTH } from '../../settings';
import {
  CARD_DISINTEGRATION_TIME,
  CARD_MOVE_TO_CENTER_TIME,
  GRID_SETTINGS,
  SHOW_LEVEL_TEXT_DURATION,
} from '../combat/constants';
import { GameControllerScene } from '../game-controller/scene';
import {
  RELIC_CARD_SPRITE_SCALE,
  RelicCard,
  RelicCardSprite,
} from '../relic-info/relic-card';
import { RelicOwnership } from '../relics/types';
import { NoiseShaderPipeline } from '../shaders/noise';
import { BlurController } from '../util/blur';
import { BonusOperations } from './bonus-operations';
import { FallingOrbParticles } from './falling-orbs';

export type LevelUpSceneOptions = {
  relics: RelicOwnership[];
  getRandomRelic: () => RelicOwnership;
  banishes: number;
  recycles: number;
  manager: GameControllerScene;
};

const LEVEL_UP_CARD_SPAWN_DELAY = 250;
const LEVEL_UP_RELIC_CARD_SCALE = 1.75;

export class LevelUpScene extends Phaser.Scene {
  options: LevelUpSceneOptions;
  bonus: BonusOperations;
  particles: FallingOrbParticles;
  blur: BlurController;
  cards: (RelicCard | undefined)[];
  background: Phaser.GameObjects.Rectangle;
  noOptions: NoOptionsRemaining;
  operation: 'selecting' | 'banishing' | 'recycling';
  processing: boolean;

  static Key = 'LevelUpScene';
  constructor() {
    super({ key: LevelUpScene.Key });
  }

  static launch({ scene }: Phaser.Scene, options: LevelUpSceneOptions) {
    scene.launch(LevelUpScene.Key, options);
  }

  static get({ scene }: Phaser.Scene): LevelUpScene {
    return scene.get(LevelUpScene.Key) as LevelUpScene;
  }

  static stop({ scene }: Phaser.Scene) {
    scene.stop(LevelUpScene.Key);
  }

  static isActive({ scene }: Phaser.Scene) {
    return scene.isActive(LevelUpScene.Key);
  }

  async create(options: LevelUpSceneOptions) {
    this.operation = 'selecting';

    this.options = options;

    this.blur = new BlurController(this);

    this.cards = [];
    this.processing = false;

    this.createObjects();
    this.createEvents();
    this.createOptions();
  }

  async createObjects() {
    const particles = new FallingOrbParticles(this);
    this.add.existing(particles);
    this.particles = particles;

    this.background = new Phaser.GameObjects.Rectangle(
      this,
      0,
      0,
      GAME_WIDTH,
      GRID_SETTINGS.y + GRID_SETTINGS.height + 2,
      Phaser.Display.Color.GetColor(0, 0, 0),
      0.5
    ).setOrigin(0);
    this.background.postFX.addBlur(0.1);
    this.add.existing(this.background);

    for (let i = 0; i < this.options.relics.length; i++) {
      const relic = this.options.relics[i];
      this.time.delayedCall(
        SHOW_LEVEL_TEXT_DURATION + LEVEL_UP_CARD_SPAWN_DELAY + i * 100,
        () => {
          this.addCard(i, relic);
        }
      );
    }

    this.noOptions = new NoOptionsRemaining(this, {
      x: GAME_WIDTH / 2,
      y: 512,
    });

    this.noOptions.events.on('exit', async () => {
      await Promise.all([
        this.bonus.animateHeaderOut(),
        this.bonus.animateOperationOut(),
      ]);
      this.options.manager.bus.emit('close-relic-selection');
    });

    this.add.existing(this.noOptions);
  }

  createOptions() {
    this.bonus = new BonusOperations(this, {
      x: 0,
      y: 32,
      ...this.options,
    });
    this.add.existing(this.bonus);
    this.bonus.events.on('cancel', () => {
      this.background.setFillStyle(0x000000, 0.5);
      this.operation = 'selecting';
    });
    this.bonus.events.on('banishing', () => {
      this.background.setFillStyle(0xaa0000, 0.3);
      this.operation = 'banishing';
    });
    this.bonus.events.on('recycling', () => {
      this.background.setFillStyle(0x00aa00, 0.3);
      this.operation = 'recycling';
    });
    this.time.delayedCall(SHOW_LEVEL_TEXT_DURATION, () => {
      this.bonus.animateHeaderIn();
    });
  }

  handleOperation(card: RelicCard) {
    switch (this.operation) {
      case 'selecting':
        this.handleSelection(card);
        break;
      case 'banishing':
        this.handleBanish(card);
        break;
      case 'recycling':
        this.handleRecycle(card);
        return;
      default:
        throw assertNever(this.operation);
    }
  }

  handleSelection(chosen: RelicCard) {
    for (const card of this.cards) {
      if (!card) continue;

      card.disableInteractive();

      if (card === chosen) {
        this.selectCard(card);
      } else {
        card.animateShrink();
      }
    }
    this.bonus.animateHeaderOut();
  }

  selectCard(card: RelicCard) {
    card.setDepth(100);

    const noise = NoiseShaderPipeline.get(this);

    const fill = new Phaser.GameObjects.Sprite(
      this,
      card.x,
      card.y,
      'game-relic-card-background-fill'
    )
      .setOrigin(card.background.originX, card.background.originY)
      .setScale(card.scale)
      .setAlpha(0);
    this.add.existing(fill);
    fill.setPipeline(NoiseShaderPipeline.Key);

    const mask = this.add.bitmapMask(fill);
    card.setMask(mask);
    const bounds = card.getBounds();

    this.tweens.add({
      targets: [fill, card],
      duration: CARD_MOVE_TO_CENTER_TIME,
      ease: Phaser.Math.Easing.Sine.InOut,
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2 - 256,
      onStart: () => {
        noise.onUpdate(0);
        noise.onInit(bounds.width, bounds.height);
      },
      onComplete: () => {
        const scale = RELIC_CARD_SPRITE_SCALE * LEVEL_UP_RELIC_CARD_SCALE;
        // Reset the card's position after vibration ends
        const bounds = card.sprite.getBounds();
        const sprite = new RelicCardSprite(this, {
          x: bounds.x + bounds.width / 2,
          y: bounds.y + bounds.height / 2,
          sprite: card.info.sprite,
          color: card.info.color,
        }).setScale(scale);
        this.add.existing(sprite);
        sprite.setDepth(0);
        this.tweens.addCounter({
          from: 0,
          to: 1.1,
          duration: CARD_DISINTEGRATION_TIME,
          onUpdate: (tween) => {
            noise.onUpdate(tween.getValue());
          },
          onComplete: () => {
            this.options.manager.bus.emit('insert-relic', {
              sprite: card.info.sprite,
              color: card.info.color,
              scale,
              x: bounds.x + bounds.width / 2,
              y: bounds.y + bounds.height / 2,
              ...card.options,
            });
            this.time.delayedCall(50, () => {
              sprite.destroy();
            });
          },
        });
      },
    });
  }

  async addCard(index: number, relic: RelicOwnership) {
    const placements = PLACEMENTS[this.options.relics.length];

    if (!placements) throw new Error('Invalid number of relics in level up');

    const placement = placements[index];

    const card = new RelicCard(this, { ...relic, showUpgradeIcon: true })
      .setPosition(placement.from.x, placement.from.y)
      .setScale(LEVEL_UP_RELIC_CARD_SCALE);
    card.on('pointerdown', () => {
      this.handleOperation(card);
    });
    this.add.existing(card);
    this.cards[index] = card;
    await card.animateIn(placement);
  }

  async handleBanish(card: RelicCard) {
    if (!this.bonus.canBanish()) return;

    this.bonus.updateBanish();
    this.options.manager.bus.emit('banish-relic', card.options);
    await this.sliceCard(card);

    this.removeCard(card);
    if (!this.cards.filter(Boolean).length) {
      this.noOptions.animateIn();
    }
  }

  removeCard(card: RelicCard) {
    this.cards = this.cards.map((c) => (c === card ? undefined : c));
    card.destroy();
  }

  async sliceCard(card: RelicCard) {
    card.setVisible(false);
    card.setActive(false);

    const bounds = card.getBounds();

    const leftHalf = new RelicCard(this, card.options)
      .setPosition(card.x, card.y)
      .setScale(LEVEL_UP_RELIC_CARD_SCALE)
      .disableInteractive();
    const leftMask = this.add
      .graphics()
      .fillStyle(0xffffff, 0.5)
      .fillTriangle(-155, bounds.height, 155, bounds.height, -155, 0)
      .setPosition(card.x, card.y)
      .setVisible(false);
    leftHalf.mask = new Phaser.Display.Masks.GeometryMask(this, leftMask);

    this.add.existing(leftHalf);

    //create a right mask.
    const rightHalf = new RelicCard(this, card.options)
      .setPosition(card.x, card.y)
      .setScale(LEVEL_UP_RELIC_CARD_SCALE)
      .disableInteractive();
    const rightMask = this.add
      .graphics()
      .fillStyle(0xffffff, 0.5)
      .fillTriangle(-155, 0, 155, 0, 155, bounds.height)
      .setPosition(card.x, card.y)
      .setVisible(false);
    rightHalf.mask = new Phaser.Display.Masks.GeometryMask(this, rightMask);
    this.add.existing(rightHalf);

    const slope = 0.66;
    const delta = 128;
    const driftDistance = 150; // How far they will drift apart (adjust as needed)
    const driftDuration = 1000; // Duration for the drift animation
    const sliceDuration = 300; // Duration for the slice animation

    const left = new Promise((resolve) => {
      this.tweens.chain({
        targets: [leftHalf, leftMask],
        onComplete: resolve,
        tweens: [
          {
            x: { from: card.x, to: card.x - delta * slope },
            y: { from: card.y, to: card.y - delta },
            duration: sliceDuration,
            ease: Phaser.Math.Easing.Cubic.In,
            onComplete: () => {
              this.cameras.main.flash(100, 255, 255, 255, true);
              this.cameras.main.shake(150, 0.02);
            },
          },
          {
            x: leftHalf.x - driftDistance,
            y: leftHalf.y - driftDistance,
            alpha: 0,
            angle: 5, // Small rotation to give a floating effect
            duration: driftDuration,
            ease: Phaser.Math.Easing.Cubic.Out,
          },
        ],
      });
    });
    const right = new Promise((resolve) => {
      this.tweens.chain({
        targets: [rightHalf, rightMask],
        onComplete: resolve,
        tweens: [
          {
            x: { from: card.x, to: card.x + delta * slope },
            y: { from: card.y, to: card.y + delta },
            duration: sliceDuration,
            ease: Phaser.Math.Easing.Cubic.In,
            onComplete: () => {
              this.cameras.main.flash(100, 255, 255, 255, true);
              this.cameras.main.shake(150, 0.02);
            },
          },
          {
            x: rightHalf.x + driftDistance,
            y: rightHalf.y + driftDistance,
            alpha: 0,
            angle: 5, // Small rotation to give a floating effect
            duration: driftDuration,
            ease: Phaser.Math.Easing.Cubic.Out,
          },
        ],
      });
    });

    await Promise.all([left, right]);
  }

  async handleRecycle(card: RelicCard) {
    if (!this.bonus.canRecycle()) return;
    if (this.processing) return;

    this.bonus.updateRecycle();
    this.options.manager.bus.emit('recycle-relic', card.options);
    await this.recycleCard(card);
  }

  async recycleCard(card: RelicCard) {
    this.processing = true;
    const index = this.cards.indexOf(card);
    this.cards = this.cards.map((c) => (c === card ? undefined : c));
    await Promise.all([
      card.animateShrink(),
      this.addCard(index, this.options.getRandomRelic()),
    ]);
    card.destroy();
    this.processing = false;
  }

  createEvents() {
    this.options.manager.bus.on('open-relic-info', this.onOpen, this);
    this.options.manager.bus.on('close-relic-info', this.onClose, this);
    this.options.manager.bus.on('stage-complete', this.closeScene, this);

    // on scene shutdown.
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.options.manager.bus.off('close-relic-info', this.onClose, this);
      this.options.manager.bus.off('stage-complete', this.closeScene, this);
      this.options.manager.bus.off('open-relic-info', this.onOpen, this);
    });
  }

  onOpen() {
    this.blur.display();
  }

  onClose() {
    this.blur.remove();
  }

  closeScene() {
    this.options.manager.bus.emit('close-relic-selection');
  }
}

export class NoOptionsRemaining extends Phaser.GameObjects.Container {
  events: TypedEventEmitter<{ exit: [] }>;
  constructor(scene: Phaser.Scene, options: Point) {
    const { x, y } = options;
    super(scene, x, y);
    this.events = new TypedEventEmitter();

    const text = new Phaser.GameObjects.Text(
      scene,
      0,
      0,
      'No Options\nRemaining!',
      {
        fontSize: `60px`,
        fontStyle: 'bold',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6,
        align: 'center',
        fixedWidth: GAME_WIDTH,
      }
    )
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', this.onClick, this);
    this.add(text);

    const exit = new Phaser.GameObjects.Sprite(scene, 0, 128, 'icons-exit')
      .setScale(1)
      .setInteractive()
      .on('pointerdown', this.onClick, this);
    this.add(exit);

    this.setAlpha(0);
    this.setScale(0);
  }

  animateIn() {
    this.scene.tweens.add({
      targets: [this],
      alpha: 1,
      scale: 1,
      duration: 300,
      ease: Phaser.Math.Easing.Cubic.Out,
    });
  }

  onClick() {
    this.scene.tweens.add({
      targets: [this],
      alpha: 0,
      scale: 0,
      duration: 300,
      ease: Phaser.Math.Easing.Cubic.In,
      onComplete: () => {
        this.events.emit('exit');
      },
    });
  }
}

const singlePlacement = [
  {
    from: {
      x: -256,
      y: 256,
    },
    to: {
      x: GAME_WIDTH / 2,
      y: 256,
    },
  },
];
const doublePlacement = [
  {
    from: {
      x: -180,
      y: 230,
    },
    to: {
      x: 180,
      y: 230,
    },
  },
  {
    from: {
      x: GAME_WIDTH + 180,
      y: 230,
    },
    to: {
      x: GAME_WIDTH - 180,
      y: 230,
    },
  },
];
const triplePlacement = [
  {
    from: {
      x: -180,
      y: 130,
    },
    to: {
      x: 180,
      y: 130,
    },
  },
  {
    from: {
      x: GAME_WIDTH + 180,
      y: 130,
    },
    to: {
      x: GAME_WIDTH - 180,
      y: 140,
    },
  },
  {
    from: {
      x: -180,
      y: 580,
    },
    to: {
      x: GAME_WIDTH / 2,
      y: 580,
    },
  },
];
const quadruplePlacement = [
  {
    from: {
      x: -180,
      y: 130,
    },
    to: {
      x: 180,
      y: 130,
    },
  },
  {
    from: {
      x: GAME_WIDTH + 180,
      y: 130,
    },
    to: {
      x: GAME_WIDTH - 180,
      y: 130,
    },
  },
  {
    from: {
      x: -180,
      y: 580,
    },
    to: {
      x: 180,
      y: 580,
    },
  },
  {
    from: {
      x: GAME_WIDTH + 180,
      y: 580,
    },
    to: {
      x: GAME_WIDTH - 180,
      y: 580,
    },
  },
];

const PLACEMENTS = [
  undefined,
  singlePlacement,
  doublePlacement,
  triplePlacement,
  quadruplePlacement,
];

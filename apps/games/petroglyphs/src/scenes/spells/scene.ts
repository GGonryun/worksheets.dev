import { TypedEventEmitter } from '@worksheets/phaser/events';
import { assertNever } from '@worksheets/util/errors';

import { ElementDepths } from '../combat/constants';
import { CellHighlightRequest } from '../combat/grid/grid';
import { GameControllerScene } from '../game-controller/scene';
import { RelicOptions } from '../relics/relic';
import { RelicSpellEffect, RelicSpellTargetingData } from '../relics/types';
import { CircularTargeting } from './targeting/circular-targeting';
import { DiagonalTargeting } from './targeting/diagonal-targeting';
import { LineTargeting } from './targeting/line-targeting';
import { TargetingOverlay } from './targeting/overlay';
import { SingleTargetTargeting } from './targeting/single-target-targeting';
import { TileTypeTargeting } from './targeting/tile-type-targeting';

export type SpellTargetingSceneOptions = {
  manager: GameControllerScene;
  relic: RelicOptions<RelicSpellEffect>;
};

export type TargetingEventEmitter = TypedEventEmitter<{
  execute: [RelicSpellTargetingData];
  highlight: [CellHighlightRequest];
}>;

export class SpellTargetingScene extends Phaser.Scene {
  static Key = 'SpellTargetingScene';
  options: SpellTargetingSceneOptions;
  targeting?: Phaser.GameObjects.Container;
  bus: TargetingEventEmitter;
  overlay?: TargetingOverlay;
  constructor() {
    super({ key: SpellTargetingScene.Key });
  }

  static launch({ scene }: Phaser.Scene, options: SpellTargetingSceneOptions) {
    scene.launch(SpellTargetingScene.Key, options);
  }

  static stop(plugin: Phaser.Scene) {
    plugin.scene.stop(SpellTargetingScene.Key);
  }

  static isActive({ scene }: Phaser.Scene) {
    return scene.isActive(SpellTargetingScene.Key);
  }

  async create(options: SpellTargetingSceneOptions) {
    this.options = options;

    this.createEvents();
    this.createTargeting();
  }

  createEvents() {
    this.bus = new TypedEventEmitter();
    this.bus.on('highlight', (payload) => {
      this.options.manager.bus.emit('highlight-cells', payload);
    });

    this.bus.on('execute', (payload) => {
      this.options.manager.bus.emit('spell-cast', {
        key: this.options.relic.info.key,
        data: payload,
      });
    });

    this.options.manager.bus.on('stage-complete', this.closeScene, this);
    this.options.manager.bus.on('start-level-up', this.closeScene, this);

    // on scene shutdown.
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.options.manager.bus.off('stage-complete', this.closeScene, this);
      this.options.manager.bus.off('start-level-up', this.closeScene, this);
    });
  }

  closeScene() {
    this.options.manager.bus.emit('close-spell-targeting');
  }

  createTargeting() {
    const { effect, info } = this.options.relic;
    const { sprite } = info;
    if (!effect) return;
    const { targeting } = effect;
    switch (targeting.type) {
      case 'single-target': {
        this.targeting = new SingleTargetTargeting(this, {
          sprite,
          targeting,
          events: this.bus,
        });
        break;
      }
      case 'circular': {
        this.targeting = new CircularTargeting(this, {
          sprite,
          targeting,
          events: this.bus,
        });
        break;
      }
      case 'diagonal': {
        this.targeting = new DiagonalTargeting(this, {
          sprite,
          targeting,
          events: this.bus,
        });
        break;
      }
      case 'tile-type': {
        this.targeting = new TileTypeTargeting(this, {
          sprite,
          targeting,
          events: this.bus,
        });
        break;
      }
      case 'line': {
        this.targeting = new LineTargeting(this, {
          sprite,
          targeting,
          events: this.bus,
        });

        break;
      }
      case 'instant': {
        this.bus.emit('execute', {
          type: 'instant',
          execute: targeting.execute,
        });
        return;
      }
      default:
        throw assertNever(targeting);
    }
    this.targeting.setDepth(ElementDepths.PORTAL);
    this.add.existing(this.targeting);
    this.createOverlay();
  }

  createOverlay() {
    this.overlay = new TargetingOverlay(this);

    this.overlay.events.on('cancel', () => {
      this.options.manager.bus.emit('close-spell-targeting');
    });

    this.overlay.events.on('info', () => {
      this.options.manager.bus.emit('close-spell-targeting');
      this.options.manager.bus.emit('open-relic-info', this.options.relic);
    });

    this.overlay.setDepth(ElementDepths.BACKGROUND);
    this.add.existing(this.overlay);
  }

  isActive() {
    return this.targeting !== undefined && this.overlay !== undefined;
  }
}

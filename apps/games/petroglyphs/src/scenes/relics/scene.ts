import { waitFor } from '@worksheets/util/time';

import {
  ElementDepths,
  GRID_SETTINGS,
  ICON_SIZE,
  RELIC_ICON_SIZE,
  SCENE_TRANSITION_SPEED,
} from '../combat/constants';
import { ItemController } from '../combat/controller';
import { GameControllerScene } from '../game-controller/scene';
import { RelicCardSprite } from '../relic-info/relic-card';
import { BlurController } from '../util/blur';
import { BonusRelic } from './bonus';
import { RELIC_EFFECTS, RELICS } from './data';
import { SpellRelic } from './relic';
import { Relics } from './relics';
import { isPassiveEffect, RelicOwnership } from './types';

export type RelicsSceneOptions = {
  owned: RelicOwnership[];
  manager: GameControllerScene;
};
export class RelicsScene extends Phaser.Scene {
  static Key = 'RelicsScene';
  options: RelicsSceneOptions;
  controller: ItemController;
  relics: Relics;
  blur: BlurController;
  bonusRelics: BonusRelic[];

  constructor() {
    super({ key: RelicsScene.Key });
  }

  static launch({ scene }: Phaser.Scene, options: RelicsSceneOptions) {
    scene.launch(RelicsScene.Key, options);
  }

  static get({ scene }: Phaser.Scene): RelicsScene {
    return scene.get(RelicsScene.Key) as RelicsScene;
  }

  static stop({ scene }: Phaser.Scene) {
    scene.stop(RelicsScene.Key);
  }

  create(options: RelicsSceneOptions) {
    this.options = options;
    this.bonusRelics = [];

    this.blur = new BlurController(this);

    this.controller = new ItemController(this);
    this.controller.setEnabled(true);

    this.relics = new Relics(this);
    this.add.existing(this.relics);

    this.createEvents();
    this.cameras.main.fadeOut(0);

    this.start();
  }

  createEvents() {
    this.options.manager.bus.on('start-combat', () => {
      this.cameras.main.fadeIn(SCENE_TRANSITION_SPEED);
    });

    this.options.manager.bus.on('level-up-relic', ({ key, level }) => {
      const info = RELICS[key];
      const effects = RELIC_EFFECTS[key];
      if (level >= effects.length) {
        console.warn('Relic level exceeds max level');
        return;
      }
      const effect = effects[level];

      this.relics.upsertRelic({ level, info, effect });

      if (isPassiveEffect(effect)) {
        this.options.manager.stats.upsertEffect(key, effect);
      }
    });

    this.options.manager.bus.on('evolve-relic', ({ key, level }, evolution) => {
      const info = RELICS[key];
      const effect = RELIC_EFFECTS[key][level];

      this.relics.replaceRelic(evolution.replaces, level, info, effect);
    });

    this.options.manager.bus.on('process-cooldowns', (cooldown) => {
      this.relics.cooldowns(cooldown);
    });

    this.options.manager.bus.on('spell-cast', ({ key }) => {
      this.relics.cast(key);
    });

    this.options.manager.bus.on('activate-relics', (activation) => {
      this.relics.activate(activation);
    });

    this.options.manager.bus.on('stage-complete', () => {
      this.relics.absorbAll();
      this.bonusRelics.forEach((relic) => {
        relic.absorbAll();
      });
    });

    this.controller.events.on('view-relic-details', (key) => {
      const relic = this.relics.get(key);

      if (relic instanceof SpellRelic && relic.ready) {
        this.options.manager.bus.emit('open-spell-targeting', relic.options);
      } else {
        this.options.manager.bus.emit('open-relic-info', relic.options);
      }
    });

    this.options.manager.bus.on('open-spell-targeting', () => {
      this.blur.display();
      this.controller.setEnabled(false);
    });

    this.options.manager.bus.on('close-spell-targeting', () => {
      this.blur.remove();
      this.controller.setEnabled(true);
    });

    this.options.manager.bus.on('open-relic-info', () => {
      this.blur.display();
      this.controller.setEnabled(false);
    });

    this.options.manager.bus.on('close-relic-info', () => {
      this.blur.remove();
      this.controller.setEnabled(true);
    });

    this.relics.events.on('execute-skill', (skill) => {
      this.options.manager.bus.emit('execute-skill', skill);
    });

    this.options.manager.bus.on('insert-relic', (relic) => {
      const sprite = new RelicCardSprite(this, relic).setScale(relic.scale);
      this.add.existing(sprite);
      sprite.setDepth(ElementDepths.MAX);
      const pos = this.relics.getPosition(relic.key);
      this.tweens.add({
        x: pos.x + this.relics.x,
        y: pos.y + this.relics.y,
        scale: RELIC_ICON_SIZE / ICON_SIZE - 0.1,
        targets: sprite,
        delay: 150,
        duration: 750,
        ease: Phaser.Math.Easing.Cubic.InOut,
        onComplete: () => {
          this.options.manager.bus.emit('relic-selected', relic);
          this.options.manager.bus.emit('close-relic-selection');
          sprite.destroy();
        },
      });
    });

    this.options.manager.bus.on('drop-bonus-relic', ({ key, level }) => {
      const bonus = new BonusRelic(this, { key, level, relics: this.relics });
      const offset = 64;
      const pos = {
        x: Phaser.Math.Between(
          GRID_SETTINGS.x + offset,
          GRID_SETTINGS.x + GRID_SETTINGS.width - offset
        ),
        y: Phaser.Math.Between(
          GRID_SETTINGS.y + offset,
          GRID_SETTINGS.y + GRID_SETTINGS.height - offset
        ),
      };
      bonus.setPosition(pos.x, pos.y);
      this.add.existing(bonus);

      bonus.bus.on('collected', () => {
        this.bonusRelics = this.bonusRelics.filter((r) => r !== bonus);
        this.options.manager.bus.emit('relic-selected', {
          key,
          level,
        });

        bonus.kill();
      });

      this.bonusRelics.push(bonus);
    });

    this.options.manager.bus.on('trigger-level-up', async () => {
      this.bonusRelics.forEach((relic) => {
        relic.collectRelic();
      });
    });
  }

  async start() {
    for (const relic of this.options.owned) {
      this.options.manager.bus.emit('level-up-relic', relic);
    }

    await waitFor(1000);
    this.options.manager.bus.emit('relics-ready');
  }
}

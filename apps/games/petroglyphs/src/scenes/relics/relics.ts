import { TypedEventEmitter } from '@worksheets/phaser/events';
import { hasExactly } from '@worksheets/util/arrays';
import { assertNever } from '@worksheets/util/errors';

import { ActionSkill } from '../combat/actions';
import {
  ElementDepths,
  GRID_SETTINGS,
  MAX_UNIQUE_RELICS,
  RELIC_ICON_BORDER_SIZE,
  RELIC_ICON_SIZE,
  TILE_TYPE_TO_COLOR,
} from '../combat/constants';
import { Color, TileMatch } from '../combat/types';
import { absorbFunction } from '../portal/portal';
import { CooldownRelic, Relic, RelicFactory, SpellRelic } from './relic';
import {
  isCooldownEffect,
  isTriggeredEffect,
  isTriggerType,
  MatchCondition,
  RelicActivation,
  RelicCascadeActivation,
  RelicComboActivation,
  RelicCooldown,
  RelicEffect,
  RelicEvents,
  RelicInformation,
  RelicKey,
  RelicMatchActivation,
  RepeatCondition,
} from './types';

export class Relics extends Phaser.GameObjects.Container {
  events: TypedEventEmitter<RelicEvents>;
  items: Relic[];
  factory: RelicFactory;
  columns: number;
  placement = RELIC_ICON_SIZE + 12;
  extra = {
    width: RELIC_ICON_SIZE,
    height:
      RELIC_ICON_SIZE * 2 +
      (this.placement - RELIC_ICON_SIZE) +
      RELIC_ICON_BORDER_SIZE,
  };
  constructor(scene: Phaser.Scene) {
    super(
      scene,
      GRID_SETTINGS.x + 36,
      GRID_SETTINGS.y + GRID_SETTINGS.height + 94
    );
    this.columns = Math.floor(MAX_UNIQUE_RELICS / 2);
    this.items = [];
    this.events = new TypedEventEmitter();
    this.factory = new RelicFactory(scene);

    this.setDepth(ElementDepths.CARD);
    this.setScale(1);
  }

  find(key: RelicKey): Relic | undefined {
    return this.items.find((item) => item.options.info.key === key);
  }

  get(key: RelicKey): Relic {
    const relics = this.items.filter((item) => item.options.info.key === key);
    if (hasExactly(relics, 1)) return relics[0];
    throw new Error(
      `Unexpected number of relics found for ${key} (${relics.length})`
    );
  }

  getPosition(key: RelicKey) {
    const index = this.items.findIndex((i) => i.options.info.key === key);
    const i = index === -1 ? this.items.length : index;
    const y = Math.floor(i / this.columns);
    const x = i % this.columns;
    return { x: x * this.placement, y: y * this.placement, i };
  }

  cast(key: RelicKey) {
    const relic = this.get(key);
    if (!(relic instanceof SpellRelic)) {
      throw new Error(`Relic ${key} is not a spell relic`);
    }

    relic.cast();
  }

  absorbAll() {
    for (const item of this.items) {
      this.scene.tweens.killTweensOf(item);
      absorbFunction(this.scene, {
        object: item,
        offset: this,
        delayModifier: Phaser.Math.Between(0, 5),
        onComplete: () => {
          if (item instanceof Relic) {
            this.events.emit('relic-absorbed', item.options.info);
          }
        },
      });
    }
  }

  upsertRelic({
    level,
    info,
    effect,
  }: {
    level: number;
    info: RelicInformation;
    effect: RelicEffect;
  }) {
    let find = this.find(info.key);
    if (!find) {
      find = this.addRelic(level, info, effect);
    } else {
      find.upgrade(level, info, effect);
    }
    find.animate();
  }

  replaceRelic(
    replaces: RelicKey,
    level: number,
    info: RelicInformation,
    effect: RelicEffect
  ) {
    const find = this.find(replaces);
    if (!find) {
      throw new Error(`Could not find relic to replace: ${replaces}`);
    } else {
      find.upgrade(level, info, effect);
    }
  }

  addRelic(level: number, info: RelicInformation, effect: RelicEffect) {
    const item = this.factory.create(level, info, effect);

    const { x, y } = this.getPosition(info.key);
    item.setPosition(x, y);

    this.items.push(item);

    this.add(item);

    return item;
  }

  activate(activation: RelicActivation) {
    switch (activation.type) {
      case 'match':
        return this.matchActivation(activation);
      case 'cascade':
        return this.comboActivation('cascade', activation);
      case 'combo':
        return this.comboActivation('combo', activation);
      default:
        throw assertNever(activation);
    }
  }

  cooldowns(cooldown: RelicCooldown) {
    for (const item of this.items) {
      if (!(item instanceof Relic)) continue;
      if (!(item instanceof CooldownRelic || item instanceof SpellRelic))
        continue;
      const { effect } = item.options;
      const { executions } = item.updateCooldown(cooldown);

      if (!isCooldownEffect(effect)) continue;
      for (let i = 0; i < executions; i++) {
        this.executeSkill(item, effect.action, 'GREY');
      }
    }
  }

  comboActivation(
    type: 'combo' | 'cascade',
    activation: RelicCascadeActivation | RelicComboActivation
  ) {
    const { size } = activation;

    for (const item of this.items) {
      const { effect } = item.options;
      if (!effect) continue;
      if (!isTriggeredEffect(effect)) continue;
      if (!isTriggerType(type)(effect.trigger)) continue;

      if (effect.trigger.when.min > size) continue;

      item.shake();
      const repetitions = calculateRepetitions(effect.trigger.repeat, size);

      for (let i = 0; i < repetitions; i++) {
        this.executeSkill(item, effect.action, 'GREY');
      }
    }
  }

  matchActivation(activation: RelicMatchActivation) {
    const { match } = activation;
    for (const item of this.items) {
      const { effect } = item.options;
      if (!effect) continue;
      if (!isTriggeredEffect(effect)) continue;
      if (!isTriggerType('match')(effect.trigger)) continue;

      for (const condition of effect.trigger.when) {
        if (!isMatchConditionMet(condition, match)) continue;
        item.shake();
        this.executeSkill(
          item,
          effect.action,
          TILE_TYPE_TO_COLOR[match.tileType]
        );
      }
    }
  }

  executeSkill(item: Relic, action: ActionSkill, color: Color) {
    this.events.emit('execute-skill', {
      key: item.options.info.key,
      from: item.getWorldPosition(),
      action,
      color,
    });
  }
}

const isMatchConditionMet = (condition: MatchCondition, match: TileMatch) => {
  if (condition.tile && condition.tile !== match.tileType) {
    return false;
  }

  if (condition.length && condition.length > match.coordinates.length) {
    return false;
  }

  return true;
};

const calculateRepetitions = (
  repeat: RepeatCondition | undefined,
  size: number
) => {
  if (!repeat) return 1;
  return size;
};

export class InfoButton extends Phaser.GameObjects.Container {
  background: Phaser.GameObjects.Rectangle;
  sprite: Phaser.GameObjects.Sprite;
  events: TypedEventEmitter<{ clicked: [] }>;
  constructor(
    scene: Phaser.Scene,
    {
      x,
      y,
      width,
      height,
      sprite,
    }: { x: number; y: number; width: number; height: number; sprite: string }
  ) {
    super(scene, x, y);
    this.events = new TypedEventEmitter();
    this.background = new Phaser.GameObjects.Rectangle(
      this.scene,
      0,
      0,
      width,
      height,
      0x93c6d6,
      1
    )
      .setStrokeStyle(RELIC_ICON_BORDER_SIZE, 0x000000)
      .setInteractive()
      .on('pointerdown', () => {
        this.events.emit('clicked');
      });
    this.add(this.background);

    this.sprite = new Phaser.GameObjects.Sprite(
      this.scene,
      0,
      0,
      sprite
    ).setScale(0.4);
    this.sprite.setOrigin(0.5, 0.5);
    this.add(this.sprite);
  }
}

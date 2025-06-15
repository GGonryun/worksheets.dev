import { TypedEventEmitter } from '@worksheets/phaser/events';

import { ICON_SIZE, RELIC_ICON_SIZE } from '../combat/constants';
import { absorbFunction } from '../portal/portal';
import { RELICS } from './data';
import { Relic, RelicFactory } from './relic';
import { Relics } from './relics';
import { RelicOwnership } from './types';

export type BonusRelicOptions = RelicOwnership & {
  relics: Relics;
};
export class BonusRelic extends Phaser.GameObjects.Container {
  bus: TypedEventEmitter<{ collected: [] }>;
  pointer: Phaser.GameObjects.Sprite;
  relic: Relic;
  event: Phaser.Time.TimerEvent;
  options: BonusRelicOptions;
  constructor(scene: Phaser.Scene, options: BonusRelicOptions) {
    super(scene);
    this.bus = new TypedEventEmitter();
    this.options = options;

    this.createRelic();

    this.createPointer();
  }

  createRelic() {
    const info = RELICS[this.options.key];

    const factory = new RelicFactory(this.scene);
    this.relic = factory.createBonus(this.options.level, info);
    this.relic.setScale(1.5);

    this.add(this.relic);

    this.relic.on('pointerdown', () => {
      this.collectRelic();
    });

    this.event = this.scene.time.delayedCall(3000, () => {
      this.collectRelic();
    });
  }

  createPointer() {
    this.pointer = new Phaser.GameObjects.Sprite(
      this.scene,
      0,
      -72,
      'icons-advantage'
    );

    this.pointer.setScale(0.3);
    this.pointer.setRotation(Phaser.Math.DegToRad(180));
    this.add(this.pointer);
    this.scene.tweens.add({
      targets: this.pointer,
      y: `-=8`,
      ease: Phaser.Math.Easing.Cubic.InOut,
      duration: 300,
      yoyo: true,
      repeat: -1,
    });
  }
  collectRelic() {
    this.relic.disableInteractive();
    this.event.remove();
    this.pointer.setVisible(false);
    const going = this.options.relics.getPosition(this.options.key);
    this.scene.tweens.add({
      x: going.x + this.options.relics.x,
      y: going.y + this.options.relics.y,
      scale: RELIC_ICON_SIZE / ICON_SIZE + 0.1,
      targets: this,
      delay: 150,
      duration: 750,
      ease: Phaser.Math.Easing.Cubic.InOut,
      onComplete: () => {
        this.bus.emit('collected');
      },
    });
  }

  killTweens() {
    this.scene.tweens.killTweensOf(this.pointer);
    this.scene.tweens.killTweensOf(this.relic);
    this.scene.tweens.killTweensOf(this);
  }
  kill() {
    this.killTweens();

    this.destroy();
  }
  absorbAll() {
    this.killTweens();

    this.relic.disableInteractive();
    this.event.remove();

    absorbFunction(this.scene, {
      object: this,
      offset: { x: 0, y: 0 },
      delayModifier: Phaser.Math.Between(0, 5),
      onComplete: () => {
        // no-op
      },
    });
  }
}

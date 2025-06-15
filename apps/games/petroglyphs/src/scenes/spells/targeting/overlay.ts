import { TypedEventEmitter } from '@worksheets/phaser/events';

import { GAME_WIDTH } from '../../../settings';
import { INFO_BUTTON_POSITION } from '../../combat/constants';
import { RELIC_BACK_BUTTON } from '../../relic-info/scene';
import { STORE_FONT } from '../../util/fonts';

export class TargetingOverlay extends Phaser.GameObjects.Container {
  centeredX = GAME_WIDTH / 2;
  events: TypedEventEmitter<{
    cancel: [];
    info: [];
  }>;
  constructor(scene: Phaser.Scene) {
    super(scene);

    this.events = new TypedEventEmitter();

    this.create();
    this.createBackButton();
  }

  create() {
    const background = new Phaser.GameObjects.Sprite(
      this.scene,
      0,
      0,
      'game-background-mask'
    );
    background.setOrigin(0, 0);
    background.setTint(0x000000);
    background.setAlpha(0.85);
    this.add(background);

    // TODO: this simply intercepts the input.
    background.setInteractive();

    const text = new Phaser.GameObjects.Text(
      this.scene,
      GAME_WIDTH / 2,
      400,
      'Drag to cast',
      STORE_FONT
    );
    text.setOrigin(0.5, 0.5);
    this.add(text);

    const info = new Phaser.GameObjects.Sprite(
      this.scene,
      INFO_BUTTON_POSITION.x,
      INFO_BUTTON_POSITION.y,
      'icons-info'
    )
      .setScale(0.75)
      .setInteractive()
      .on('pointerdown', () => {
        this.events.emit('info');
      });
    this.add(info);
  }

  createBackButton() {
    this.add(
      new Phaser.GameObjects.Sprite(
        this.scene,
        this.centeredX,
        RELIC_BACK_BUTTON.height,
        'icons-back'
      )
        .setScale(RELIC_BACK_BUTTON.scale)
        .setInteractive()
        .on('pointerdown', () => {
          this.events.emit('cancel');
        })
    );
  }
}

import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { LabeledButton } from '../objects/labeled-button';
import { Typography } from '../objects/typography';
import { tomato } from '../settings';
import { GameOverPayload } from '../types';

export class LastChance extends Phaser.Scene {
  payload: GameOverPayload;
  constructor() {
    super('last-chance');
    this.payload = {
      score: 0,
      blocks: 0,
      lines: 0,
    };
  }

  init(payload: GameOverPayload) {
    this.payload = payload;
  }
  create() {
    const server = CharityGamesPlugin.find(this);
    const { width, height } = this.cameras.main;
    new Typography(this, width * 0.5, height * 0.29, 'No space left!', 48);

    this.spawnLoadingDots();

    new LabeledButton(this, {
      icon: 'icon_star',
      label: 'Continue',
    })
      .setPosition(width * 0.3, height * 0.5)
      .onClick(() => {
        this.triggerGameOver();
      });

    new LabeledButton(this, {
      icon: 'icon_ad',
      label: 'Revive',
    })
      .setPosition(width * 0.3, height * 0.6)
      .onClick(() => {
        server.advertisements.show({
          type: 'reward',
          name: 'revive',
          beforeAd: () => {
            this.scene.pause();
          },
          afterAd: () => {
            this.scene.resume();
          },
          adBreakDone: () => {
            const game = this.scene.get('game');
            game.scene.resume();
            game.events.emit('revive');
            this.scene.stop('last-chance');
          },
        });
      });

    new Typography(
      this,
      width * 0.545,
      height * 0.6415,
      '(Watch an Ad)',
      24,
      tomato
    );
  }

  spawnLoadingDots() {
    const { width, height } = this.cameras.main;
    const sprites = Array.from({ length: 12 }, (_, i) => {
      return this.add
        .sprite(width * 0.2 + i * 32, height * 0.4, 'icon_dot')
        .setOrigin(0.5)
        .setScale(0.5)
        .setVisible(false);
    });

    let i = 0;
    //every 250 seconds, toggle the visibility of the sprite
    this.time.addEvent({
      delay: 300,
      loop: true,
      callback: () => {
        if (i >= sprites.length) {
          this.time.removeAllEvents();
          this.triggerGameOver();
          return;
        }
        const sprite = sprites[i];
        sprite.setVisible(!sprite.visible);
        i += 1;
      },
    });
  }

  triggerGameOver() {
    this.scene.stop('last-chance');
    this.scene.launch('game-over', this.payload);
    this.sound.play('game_over');
  }
}

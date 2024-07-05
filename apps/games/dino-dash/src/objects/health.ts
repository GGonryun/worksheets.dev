import { DEFAULT_MAX_HEALTH } from '../data/settings';
import { Game } from '../scenes/game';

export class Health {
  game: Game;
  max: number;
  current: number;
  sprites: Phaser.GameObjects.Sprite[] = [];
  ad?: Phaser.GameObjects.Sprite;
  offset: number;
  constructor(game: Game) {
    const max = DEFAULT_MAX_HEALTH;
    this.game = game;
    this.max = max;
    this.current = max;
    this.offset = 18;

    this.initializeHealth();
  }

  initializeHealth() {
    // create three sprites for health at the top left corner.
    for (let i = 0; i < this.max; i++) {
      const sprite = this.game.add.sprite(
        12 + i * this.offset,
        16,
        'icon_life',
        0
      );
      this.sprites.push(sprite);
    }
    // place the video button at the end of the health sprites.
    this.ad = this.game.add
      .sprite(this.game.cameras.main.width - 18, 18, 'button_video')
      .setInteractive()
      .on('pointerdown', () => {
        const volume = this.game.sound.volume;
        this.game.server?.advertisements.show({
          type: 'reward',
          name: 'health',
          beforeAd: () => {
            this.game.scene.pause();
            this.game.sound.volume = 0;
          },
          afterAd: () => {
            this.game.scene.resume();
            this.game.sound.volume = volume;
            this.increase();
          },
        });
      });
  }

  get() {
    return this.current;
  }

  decrease() {
    this.current -= 1;
    // get the current sprite
    const sprite = this.sprites[this.current];
    // swap it to a life lost sprite.
    sprite.setTexture('icon_life_lost');
  }

  increase() {
    // check if all health is full.
    if (this.current < this.max) {
      // if full, toggle the current sprite to a life sprite.
      const sprite = this.sprites[this.current];
      sprite.setTexture('icon_life');
    } else {
      const max = this.sprites.length;
      // add another sprite.
      const sprite = this.game.add.sprite(
        12 + max * this.offset,
        16,
        'icon_life',
        0
      );

      this.max += 1;
      this.sprites.push(sprite);
    }
    this.current += 1;
    this.ad?.setVisible(false).removeInteractive();
  }
}

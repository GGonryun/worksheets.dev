import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { NonPlayerCharacter } from '../objects/non-player-character';
import { PlayerPoster } from '../objects/player-poster';

export type GameOverPayload = {
  remaining: number;
  errors: number;
  found: string[];
};

export class GameOver extends Phaser.Scene {
  payload: GameOverPayload;
  server!: CharityGamesPlugin;
  constructor() {
    super('game-over');
    this.payload = {
      remaining: 0,
      errors: 0,
      found: [],
    };
  }

  init(data: GameOverPayload) {
    this.payload = data;
  }

  create() {
    this.server = CharityGamesPlugin.find(this);
    this.add
      .bitmapText(160, 40, 'peaberry_yellow', 'Game Over!', 32)
      .setOrigin(0.5)
      .setDropShadow(3, 3, 0x000000, 1);

    this.add
      .bitmapText(
        160,
        200,
        'peaberry_yellow',
        `${this.sys.game.device.os.desktop ? 'Click' : 'Tap'} to try again`,
        24
      )
      .setOrigin(0.5)
      .setDropShadow(2, 2, 0x000000, 1);

    this.input.on('pointerdown', () => {
      const game = this.scene.get('game');
      this.sound.play('menu');
      game.events.emit('game:restart');
      const targets = Phaser.Math.RND.shuffle([
        ...NonPlayerCharacter.sprites,
      ]).slice(0, 3);

      this.registry.set('targets', targets);
    });

    const targets = this.registry.get('targets');

    const foundFirst = foundTarget(this.payload.found, targets[0]);
    const foundSecond = foundTarget(this.payload.found, targets[1]);
    const foundThird = foundTarget(this.payload.found, targets[2]);

    new PlayerPoster(
      this,
      70,
      120,
      targets[0],
      foundFirst.text,
      foundFirst.color,
      foundFirst.status
    );
    new PlayerPoster(
      this,
      160,
      120,
      targets[1],
      foundSecond.text,
      foundSecond.color,
      foundSecond.status
    );
    new PlayerPoster(
      this,
      250,
      120,
      targets[2],
      foundThird.text,
      foundThird.color,
      foundThird.status
    );

    this.submitScore();
    this.submitAchievements();
  }

  submitScore() {
    this.server.score.submit(this.payload.found.length);
  }

  submitAchievements() {
    const achievements: string[] = [];
    const errors = this.payload.errors;
    const found = this.payload.found.length;
    errors === 0 && achievements.push('hide-and-seek:perfect');
    found >= 1 && achievements.push('hide-and-seek:found-one');
    found >= 2 && achievements.push('hide-and-seek:found-two');
    found >= 3 && achievements.push('hide-and-seek:found-three');
    this.server.achievements.unlock(achievements);
  }
}

const foundTarget = (array: string[], value: string) => {
  if (array.includes(value)) {
    return { text: 'Found!', color: 0x00ff00, status: 'right' as const };
  } else {
    return { text: 'Lost!', color: 0xff0000, status: 'wrong' as const };
  }
};

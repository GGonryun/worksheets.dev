import { CreditsButton } from '../objects/credits-button';
import { NonPlayerCharacter } from '../objects/non-player-character';
import { PlayerPoster } from '../objects/player-poster';
import { VolumeButton } from '../objects/volume-button';

export class Instructions extends Phaser.Scene {
  constructor() {
    super('instructions');
  }

  create() {
    new VolumeButton(this, 304, 16);
    new CreditsButton(this, 16, 16);

    this.add
      .bitmapText(160, 40, 'peaberry_yellow', 'Hide and Seek', 24)
      .setOrigin(0.5)
      .setDropShadow(2, 2, 0x000000, 1);

    this.add
      .bitmapText(
        160,
        200,
        'peaberry_yellow',
        `${this.sys.game.device.os.desktop ? 'Click' : 'Tap'} to Start`,
        18
      )
      .setOrigin(0.5)
      .setDropShadow(2, 2, 0x000000, 1);

    const targets = Phaser.Math.RND.shuffle([
      ...NonPlayerCharacter.sprites,
    ]).slice(0, 3);

    this.input.on('pointerdown', () => {
      const game = this.scene.get('game');
      game.events.emit('game:start');
      this.registry.set('targets', targets);
      this.sound.play('menu');
    });

    new PlayerPoster(this, 160, 120, targets[0], 'Find');
    new PlayerPoster(this, 70, 120, targets[1], 'Find');
    new PlayerPoster(this, 250, 120, targets[2], 'Find');
  }
}

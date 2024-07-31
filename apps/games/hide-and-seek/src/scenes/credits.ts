import { GAME_VERSION } from '../util';

export class Credits extends Phaser.Scene {
  constructor() {
    super('credits');
  }

  create() {
    this.add
      .sprite(16, 16, 'back')
      .setScale(2)
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.play('menu');
        this.scene.launch('instructions');
        this.scene.stop('credits');
      });

    this.add
      .bitmapText(160, 30, 'peaberry_yellow', 'Credits', 24)
      .setOrigin(0.5)
      .setDropShadow(2, 2, 0x000000, 1);

    this.add.sprite(160, 100, 'charity_games').setScale(0.041);

    this.add
      .bitmapText(160, 150, 'peaberry_yellow', 'Code by ModestDuck', 18)
      .setDropShadow(2, 2, 0x000000, 1)
      .setOrigin(0.5);

    this.add
      .bitmapText(160, 180, 'peaberry_yellow', 'Art by Netherzapdos', 18)
      .setOrigin(0.5)
      .setDropShadow(2, 2, 0x000000, 1);

    this.add
      .bitmapText(160, 210, 'peaberry_yellow', 'Sound by ColorAlpha', 18)
      .setOrigin(0.5)
      .setDropShadow(2, 2, 0x000000, 1);
    this.add
      .bitmapText(4, 230, 'peaberry_yellow', GAME_VERSION, 8)
      .setDropShadow(0.5, 0.5, 0x000000, 1);

    const logoAnchor = document.createElement('a');
    logoAnchor.setAttribute('target', '_blank');
    logoAnchor.setAttribute(
      'href',
      'https://charity.games/?utm_source=hide-and-seek'
    );
    logoAnchor.setAttribute(
      'style',
      'height:80px;width:80px;background-color: transparent;'
    );

    this.add.dom(160, 100, logoAnchor);

    const developerAnchor = document.createElement('a');
    developerAnchor.setAttribute('target', '_blank');
    developerAnchor.setAttribute('href', 'https://modestduck.com');
    developerAnchor.setAttribute(
      'style',
      'height:30px;width:280px;background-color: transparent;'
    );
    this.add.dom(160, 150, developerAnchor);

    const artistAnchor = document.createElement('a');
    artistAnchor.setAttribute(
      'style',
      'height:30px;width:280px;background-color: transparent;'
    );
    artistAnchor.setAttribute('target', '_blank');
    artistAnchor.setAttribute('href', 'https://netherzapdos.itch.io/');
    this.add.dom(160, 180, artistAnchor);

    const soundAnchor = document.createElement('a');
    soundAnchor.setAttribute('target', '_blank');
    soundAnchor.setAttribute('href', 'https://coloralpha.itch.io/');
    soundAnchor.setAttribute(
      'style',
      'height:30px;width:280px;background-color: transparent;'
    );
    this.add.dom(160, 210, soundAnchor);
  }
}

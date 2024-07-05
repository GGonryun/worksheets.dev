import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { CHARACTER, CHARACTER_KEYS_ARRAY } from '../data/characters';
import {
  CHARACTER_SELECTION,
  GAME_VOLUME,
  getCharacterSelection,
  getGameVolume,
  getHighScore,
  getUnlockedCharacters,
} from '../data/storage';

export class Menu extends Phaser.Scene {
  server!: CharityGamesPlugin;
  cursor?: Phaser.GameObjects.Sprite;
  audios!: {
    select: Phaser.Sound.BaseSound;
  };
  constructor() {
    super('menu');
  }

  create() {
    this.server = CharityGamesPlugin.find(this);

    this.cameras.main.setBackgroundColor(0x87ceeb);
    // create the bitmap text for the title.

    new AudioButton(this);

    this.loadAudios();
    this.createTitle();
    this.createShopButton();
    this.createPlayButton();
    this.createInfoButton();
    this.createPlayerSelection();
  }

  loadAudios() {
    this.audios = {
      select: this.sound.add('select'),
    };
  }

  createTitle() {
    const highScore = getHighScore(this.server);
    const { width, height } = this.cameras.main;
    this.add
      .bitmapText(width * 0.5, height * 0.125, 'arcade', 'Dino Dash', 25)
      .setOrigin(0.5)
      .setTint(0xffffff)
      .setDropShadow(2, 2, 0x000000, 0.8);

    this.add
      .bitmapText(
        width * 0.5,
        height * 0.25,
        'arcade',
        `High Score: ${highScore}`,
        10
      )
      .setOrigin(0.5)
      .setDropShadow(1, 1, 0x000000, 0.8);
  }

  createInfoButton() {
    const { width, height } = this.cameras.main;
    this.add
      .sprite(width * 0.08, height * 0.85, 'button_star')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('info');
        this.audios.select.play();
      });
  }

  createShopButton() {
    const { width, height } = this.cameras.main;
    const shop = this.add.sprite(width * 0.65, height * 0.85, 'button_shop');
    shop.setInteractive();
    shop.on('pointerdown', () => {
      this.scene.start('shop');
      this.audios.select.play();
    });
  }

  createPlayButton() {
    const play = this.add.sprite(
      this.cameras.main.width * 0.35,
      this.cameras.main.height * 0.85,
      'button_play'
    );
    play.setInteractive();
    play.on('pointerdown', () => {
      this.scene.start('game');
      this.audios.select.play();
    });
  }

  createPlayerSelection() {
    const { width, height } = this.cameras.main;

    const unlocked = getUnlockedCharacters(this.server);

    CHARACTER_KEYS_ARRAY.forEach((key, index) => {
      const character = CHARACTER[key];
      const idle = character.sprites.idle.key;
      const player = this.add
        .sprite(selectionX(width, index), height * 0.6, idle)
        .play({ key: idle, repeat: -1 })
        .setScale(1)
        .setOrigin(0.5, 1);
      // if the character is not unlocked, make it darker
      if (!unlocked.includes(index)) {
        player.setTint(0x000000);
      } else {
        player.setInteractive().on('pointerdown', () => {
          if (!unlocked.includes(index)) return;
          this.updateSelection(index);
          this.audios.select.play();
        });
      }
    });

    this.createCursor();
  }

  createCursor() {
    const { width, height } = this.cameras.main;
    const selection = getCharacterSelection(this.server);

    this.cursor = this.add.sprite(
      selectionX(width, selection),
      height * 0.4,
      'ui_cursor_down'
    );
  }

  updateSelection(index: number) {
    const active = getCharacterSelection(this.server);
    if (index === active) return;
    if (this.cursor) {
      this.cursor.x = this.cameras.main.width * 0.2 + index * 50;
    }
    this.server.storage.set(CHARACTER_SELECTION.KEY, index);
    this.server.storage.save();
  }
}
const selectionX = (width: number, index: number) => {
  return width * 0.2 + index * 50;
};

class AudioButton {
  scene: Menu;
  line: Phaser.GameObjects.Graphics;
  audio: Phaser.GameObjects.Sprite;
  constructor(scene: Menu) {
    this.scene = scene;
    this.audio = scene.add.sprite(
      scene.cameras.main.width * 0.92,
      scene.cameras.main.height * 0.85,
      'button_music_on'
    );

    this.line = scene.add
      .graphics()
      .lineStyle(2, 0x000000)
      .strokePoints([
        {
          x: this.audio.x - 8,
          y: this.audio.y - 12,
        },
        {
          x: this.audio.x + 8,
          y: this.audio.y + 4,
        },
      ])
      .setVisible(false);

    const volume = getGameVolume(this.scene.server);
    this.set(!!volume);

    this.audio.setInteractive();
    this.audio.on('pointerdown', () => {
      this.toggle();
      this.scene.audios.select.play();
    });
  }

  toggle() {
    const volume = getGameVolume(this.scene.server);
    this.set(!volume);
    this.scene.server.storage.save();
  }

  set(enable: boolean) {
    if (enable) {
      this.scene.game.sound.setVolume(1);
      this.line.setVisible(false);
      this.audio.setTexture('button_music_on');
      this.scene.server.storage.set(GAME_VOLUME.KEY, 1);
    } else {
      this.scene.game.sound.setVolume(0);
      this.line.setVisible(true);
      this.audio.setTexture('button_music_off');
      this.scene.server.storage.set(GAME_VOLUME.KEY, 0);
    }
  }
}

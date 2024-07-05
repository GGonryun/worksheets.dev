import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import {
  CHARACTER,
  CHARACTER_KEYS_ARRAY,
  CharacterInfo,
} from '../data/characters';
import {
  COIN_PURSE,
  getPlayerCoins,
  getUnlockedCharacters,
  UNLOCKED_CHARACTERS,
} from '../data/storage';

export class Shop extends Phaser.Scene {
  server!: CharityGamesPlugin;
  characters: CharacterShopItem[];
  coins: number;
  coinsText!: Phaser.GameObjects.BitmapText;
  audios!: {
    buzz: Phaser.Sound.BaseSound;
    select: Phaser.Sound.BaseSound;
    unlock: Phaser.Sound.BaseSound;
  };
  selection?: number;
  constructor() {
    super('shop');
    this.characters = [];
    this.coins = 0;
  }

  create() {
    this.server = CharityGamesPlugin.find(this);
    this.coins = getPlayerCoins(this.server);
    this.cameras.main.setBackgroundColor(0xffe0bd);

    this.createShopControls();
    this.createShopItems();
    this.createTokenControls();
    this.loadAudios();
  }

  loadAudios() {
    this.audios = {
      buzz: this.sound.add('buzz'),
      select: this.sound.add('select'),
      unlock: this.sound.add('unlock'),
    };
  }

  createShopControls() {
    const { width, height } = this.cameras.main;
    // place the menu button at the top right.
    this.add
      .sprite(width * 0.025, height * 0.025, 'button_arrow_left')
      .setOrigin(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('menu');
        this.audios.select.play();
      });

    this.add
      .sprite(width * 0.075, height * 0.9, 'icon_charity_games')
      .setScale(1);
  }

  createTokenControls() {
    const { width, height } = this.cameras.main;

    this.add.sprite(width * 0.682, height * 0.1, 'coin', 1).setScale(0.5);

    this.coinsText = this.add
      .bitmapText(width * 0.725, height * 0.1, 'arcade', ``, 16)
      .setOrigin(0, 0.5)
      .setDropShadow(1, 1, 0x000000, 1);

    this.updateCoinsDisplay(this.coins);
  }

  updateCoinsDisplay(coins: number) {
    this.coinsText.setText(coins > 9999 ? '9999+' : coins.toString());
  }

  createShopItems() {
    const unlocked = getUnlockedCharacters(this.server);

    this.characters = CHARACTER_KEYS_ARRAY.map(
      (key, index) =>
        new CharacterShopItem(
          this,
          unlocked.includes(index),
          CHARACTER[key],
          index
        )
    );
  }
}

class CharacterShopItem {
  scene: Shop;
  status: 'unlocked' | 'unlocking' | 'locked';
  index: number;
  info: CharacterInfo;
  price: Phaser.GameObjects.BitmapText;
  character: Phaser.GameObjects.Sprite;
  action: Phaser.GameObjects.Sprite;
  constructor(
    scene: Shop,
    unlocked: boolean,
    info: CharacterInfo,
    index: number
  ) {
    this.scene = scene;
    this.status = unlocked ? 'unlocked' : 'locked';
    this.index = index;
    this.info = info;

    const { width, height } = this.scene.cameras.main;
    const idle = info.sprites.idle.key;
    const x = width * 0.2 + index * 50;
    this.character = this.scene.add
      .sprite(x, height * 0.6, idle)
      .play({ key: idle, repeat: -1 })
      .setScale(1)
      .setOrigin(0.5, 1)
      .on('pointerdown', () => {
        if (this.status === 'locked') {
          this.shopSelection();
        } else {
          // confirmation must be done by clicking on the action button
        }
      });

    this.price = this.scene.add
      .bitmapText(x, height * 0.4, 'arcade', `${info.price}`, 13)
      .setDropShadow(1, 1, 0x000000, 1)
      .setOrigin(0.5)
      .setVisible(false);

    this.action = this.scene.add
      .sprite(x, height * 0.65, 'button_unlock')
      .setOrigin(0.5, 0)
      .setVisible(false)
      .on('pointerdown', () => {
        if (this.status === 'locked') {
          this.shopSelection();
        } else if (this.status === 'unlocking') {
          this.unlockSelection();
        } else {
          // no-op
        }
      });

    unlocked ? this.unlockCharacter() : this.lockCharacter();
  }

  shopSelection() {
    const previous = this.scene.selection;
    if (previous) {
      this.scene.characters[previous].clearSelection();
    }

    this.scene.selection = this.index;
    this.scene.audios.select.play();
    this.action.setTint(undefined);

    this.action.setTexture('button_check');
    if (this.scene.coins < this.info.price) {
      this.action.setTint(0x666666);
    }
    this.status = 'unlocking';
  }

  clearSelection() {
    this.action.setTexture('button_unlock').setTint(undefined);
    this.status = 'locked';
  }

  unlockSelection() {
    const unlocked = getUnlockedCharacters(this.scene.server);

    if (this.scene.coins < this.info.price) {
      this.scene.audios.buzz.play();
      this.clearSelection();
    } else {
      this.scene.audios.unlock.play();
      const updatedCoins = this.scene.coins - this.info.price;
      this.scene.coins = updatedCoins;
      this.scene.updateCoinsDisplay(updatedCoins);
      this.scene.server.storage.set(COIN_PURSE.KEY, this.scene.coins);
      this.scene.server.storage.set(
        UNLOCKED_CHARACTERS.KEY,
        Array.from(new Set([...unlocked, this.index]))
      );
      this.scene.server.storage.save();
      this.updateAchievements(this.index);
      this.unlockCharacter();
      // TODO: trigger achievement for unlocking characters.
    }
  }

  updateAchievements(index: number) {
    const info = CHARACTER[CHARACTER_KEYS_ARRAY[index]];
    this.scene.server.achievements.unlock([info.achievement]);
  }

  lockCharacter() {
    this.character.setTint(0x000000).setInteractive();
    this.price.setVisible(true);
    this.action.setVisible(true).setInteractive();
  }

  unlockCharacter() {
    this.character.setTint(undefined).removeInteractive();
    this.price.setVisible(false);
    this.action.removeInteractive().setVisible(false);
  }
}

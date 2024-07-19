import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { Blocks } from '../objects/blocks';
import { RexDropShadowPipeline } from '../types';
import { dropShadowConfig } from '../util';

export class Menu extends Phaser.Scene {
  server!: CharityGamesPlugin;
  constructor() {
    super('menu');
  }

  create() {
    this.server = CharityGamesPlugin.find(this);

    const { width, height } = this.cameras.main;
    this.add.tileSprite(0, 0, width, height, 'wallpaper').setOrigin(0);

    this.add
      .bitmapText(width * 0.5, height * 0.15, 'peaberry', 'TALL TOWER', 60)
      .setDropShadow(4, 4, 0x000000, 1)
      .setOrigin(0.5)
      .setDepth(1);

    const play = this.add
      .bitmapText(width * 0.5, height * 0.45, 'peaberry', 'PLAY', 48)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(1)
      .setDropShadow(4, 4, 0x000000, 1)
      .on('pointerdown', this.startGame, this);

    this.input.keyboard?.once('keydown-SPACE', this.startGame, this);

    this.add.tween({
      targets: play,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 500,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });

    const enabled = this.server.storage.get('sound', true);
    this.sound.mute = !enabled;
    const speaker = this.add
      .sprite(
        width * 0.5,
        height * 0.75,
        enabled ? 'ui_speaker_on' : 'ui_speaker_off'
      )
      .setDepth(1)
      .setOrigin(0.5)
      .setScale(0.75)
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.mute = !this.sound.mute;
        this.server.storage.set('sound', this.sound.mute);
        this.server.storage.save();
        speaker.setTexture(
          this.sound.mute ? 'ui_speaker_on' : 'ui_speaker_off'
        );
        this.sound.play('select');
      });

    const question = this.add
      .sprite(width * 0.5, height * 0.85, 'ui_question')
      .setDepth(1)
      .setOrigin(0.5)
      .setScale(0.75)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('instructions');
        this.sound.play('select');
      });

    const dropShadowPipeline = this.plugins.get(
      'rexDropShadowPipeline'
    ) as unknown as RexDropShadowPipeline;

    dropShadowPipeline.add(speaker, dropShadowConfig);
    dropShadowPipeline.add(question, dropShadowConfig);

    this.tileAnimations();
  }

  startGame() {
    this.scene.start('game');
    this.sound.play('select');
  }

  tileAnimations() {
    this.time.addEvent({
      loop: true,
      delay: 1500,
      callback: () => {
        this.spawnBlock();
      },
    });
  }

  spawnBlock() {
    const { height, width } = this.cameras.main;
    const min = height * 0.1;
    const max = height * 0.8;
    const y = Phaser.Math.FloatBetween(min, max);
    const direction = Phaser.Math.Between(0, 1) > 0.5;
    const left = -120;
    const right = width + 120;
    const movement = direction ? 30 : -30;
    const start = direction ? left : right;
    const end = direction ? right : left;

    const predicate = direction
      ? (x: number) => x > end
      : (x: number) => x < end;

    const blocks = new Blocks(this, Phaser.Math.Between(1, 3))
      .setPosition(start, y)
      .setDepth(0);

    const time = this.time.addEvent({
      loop: true,
      delay: Phaser.Math.FloatBetween(100, 300),
      callback: () => {
        blocks.x += movement;
        if (predicate(blocks.x)) {
          time.destroy();
          blocks.destroy();
        }
      },
    });
  }
}

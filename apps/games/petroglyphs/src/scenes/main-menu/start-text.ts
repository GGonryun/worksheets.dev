import { TypedEventEmitter } from '@worksheets/phaser/events';
import { waitFor } from '@worksheets/util/time';
import { GameObjects } from 'phaser';

import { GAME_HEIGHT, GAME_WIDTH } from '../../settings';
import { TILE_TYPE_TO_ORB } from '../combat/constants';
import { cellTermination } from '../combat/grid/util';
import { TileType } from '../combat/types';
import { Orb } from '../orbs/orb';
import { absorbFunction, PortalController } from '../portal/portal';

export class StartText extends Phaser.GameObjects.Container {
  scene: Phaser.Scene;
  blocks: FakeTile[] = [];
  matchers: FakeTile[] = [];
  clicked: boolean;
  determinedScale = 0.5;
  portal: PortalController;
  bus: TypedEventEmitter<{
    start: [];
  }>;
  constructor(scene: Phaser.Scene, portal: PortalController) {
    super(scene);
    this.scene = scene;
    this.portal = portal;
    this.clicked = false;

    this.bus = new TypedEventEmitter();

    scene.add.existing(this);

    this.setPosition(GAME_WIDTH / 2, GAME_HEIGHT - 256);
    const scale = this.determinedScale;

    this.matchers = [
      new FakeTile(scene, 0, -256 * scale, 'start-3', 'RED'),
      new FakeTile(scene, 0, -128 * scale, 'start-8', 'GREEN'),
    ];
    this.blocks = [
      new FakeTile(scene, -256 * scale, 0, 'start-1', 'RED'),
      new FakeTile(scene, -128 * scale, 0, 'start-2', 'RED'),
      new FakeTile(scene, 128 * scale, 0, 'start-4', 'RED'),
      new FakeTile(scene, 256 * scale, 0, 'start-5', 'RED'),
      new FakeTile(scene, -256 * scale, 128 * scale, 'start-6', 'GREEN'),
      new FakeTile(scene, -128 * scale, 128 * scale, 'start-7', 'GREEN'),
      new FakeTile(scene, 128 * scale, 128 * scale, 'start-9', 'GREEN'),
      ...this.matchers,
    ];

    for (const object of this.blocks) {
      object.setScale(scale);
      this.add(object);
      object.setInteractive().on('pointerdown', () => {
        this.bus.emit('start');
      });
    }

    this.animateClue();
  }

  async startGame() {
    if (this.clicked) return;
    this.clicked = true;
    // make the pointer hand appear and drag the tiles down.
    const hand = await this.spawnHand();
    // when the tiles drag down,
    await this.dragDown(hand);
    await this.destroyTiles(hand);
  }

  async destroyTiles(hand: Phaser.GameObjects.Sprite) {
    this.scene.tweens.add({
      targets: hand,
      alpha: 0,
      scale: 0,
      duration: 500,
      ease: Phaser.Math.Easing.Sine.Out,
    });

    await Promise.all(
      this.blocks.map(async (cell) => {
        await waitFor(Phaser.Math.Between(0, 500));
        await cellTermination(this.scene, cell, (cell) => {
          cell.setTintFill(0xffffff);
        });
        const orb = new Orb(
          this.scene,
          cell.x,
          cell.y,
          TILE_TYPE_TO_ORB[cell.type]
        );
        this.add(orb);
        absorbFunction(this.scene, {
          object: orb,
          offset: {
            x: 0,
            y: GAME_HEIGHT / 2 - 256,
          },
          objectScale: orb.scale * 0.85,
          point: this.portal,
          delayOffset: 750,
          randomizedXOffset: 200,
          durationOffset: 1500,
        });
      })
    );
  }

  async spawnHand(): Promise<GameObjects.Sprite> {
    const sprite = new GameObjects.Sprite(
      this.scene,
      48,
      -256 * this.determinedScale,
      'icons-pointer-2'
    );
    this.add(sprite);

    return new Promise((resolve) =>
      this.scene.tweens.add({
        targets: sprite,
        alpha: { from: 0, to: 1 },
        scale: { from: 0, to: this.determinedScale + 0.2 },
        duration: 500,
        ease: Phaser.Math.Easing.Back.Out,
        onComplete: () => {
          resolve(sprite);
        },
      })
    );
  }

  async dragDown(hand: GameObjects.Sprite) {
    await Promise.all(
      [...this.matchers, hand].map((object) => {
        return new Promise((resolve) =>
          this.scene.tweens.add({
            targets: object,
            y: `+=${256 * this.determinedScale}`,
            duration: 1000,
            ease: Phaser.Math.Easing.Cubic.InOut,
            onComplete: resolve,
          })
        );
      })
    );
  }

  animateClue() {
    for (const sprite of this.blocks) {
      const generator = () => {
        this.scene.time.delayedCall(Phaser.Math.Between(1000, 10000), () => {
          this.scene.tweens.add({
            targets: sprite,
            angle: 4,
            duration: 50,
            ease: Phaser.Math.Easing.Sine.InOut,
            yoyo: true,
            repeat: 2,
          });

          generator();
        });
      };
      generator();
    }
  }
}

class FakeTile extends Phaser.GameObjects.Sprite {
  type: TileType;
  scene: Phaser.Scene;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    type: TileType
  ) {
    super(scene, x, y, texture);
    this.setOrigin(0.5, 0.5);
    this.type = type;
    this.scene = scene;
    this.scene.add.existing(this);
  }
}

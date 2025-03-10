import { TypedEventEmitter } from '@worksheets/phaser/events';
import { Direction } from '@worksheets/phaser/types';
import { compress } from '@worksheets/util/objects';
import { waitFor } from '@worksheets/util/time';

import { GAME_HEIGHT, GAME_WIDTH } from '../main';
import { ElementDepth } from '../util/depth';
import { Slime } from './slime';
import { DeltaValue, DirectionPositionDelta, PositionDelta } from './types';

export type FireEvent = {
  position: [number, number];
  angle: number;
  direction: Direction;
};

export type BowEventEmitter = TypedEventEmitter<{
  fire: [FireEvent];
}>;

export type BowOptions = {
  player: Slime;
  events: BowEventEmitter;
};

export class Bow extends Phaser.GameObjects.Container {
  private bow: Phaser.GameObjects.Sprite;
  private arrow: Phaser.GameObjects.Sprite;
  private positionDelta: DirectionPositionDelta = {
    down: {
      y: { from: -6, to: 4 },
    },
    left: {
      x: { from: -6, to: 4 },
    },
    right: {
      x: { from: GAME_WIDTH + 6, to: GAME_WIDTH - 4 },
    },
    up: {
      y: { from: GAME_HEIGHT + 6, to: GAME_HEIGHT - 4 },
    },
  };
  private spawnRange: Record<
    Direction,
    { x: [number, number]; y: [number, number] }
  > = {
    down: { x: [0, GAME_WIDTH], y: [0, 0] },
    left: { x: [0, 0], y: [0, GAME_HEIGHT] },
    right: { x: [GAME_WIDTH, GAME_WIDTH], y: [0, GAME_HEIGHT] },
    up: { x: [0, GAME_WIDTH], y: [GAME_HEIGHT, GAME_HEIGHT] },
  };
  private directionAssignment: Record<Direction, 'x' | 'y'> = {
    down: 'x',
    left: 'y',
    right: 'y',
    up: 'x',
  };
  private pointAngle: Record<Direction, number> = {
    left: 0,
    down: 90,
    right: 180,
    up: 270,
  };
  private lerp = 0.01;
  options: BowOptions;
  direction: Direction;
  status: 'pre-enter' | 'post-enter' | 'pre-exit' | 'post-exit';

  constructor(scene: Phaser.Scene, options: BowOptions) {
    super(scene);
    this.options = options;
    this.name = Phaser.Math.RND.uuid();

    scene.add.existing(this);
    this.setScale(1);
    this.setDepth(ElementDepth.Arrow);

    this.arrow = scene.add.sprite(4, 0, 'bow-and-arrow', 2);
    this.add(this.arrow);

    this.bow = scene.add.sprite(0, 0, 'bow-and-arrow', 1);
    this.add(this.bow);

    this.setVisible(false);
    this.status = 'post-exit';
  }

  private follow() {
    this.assign(this.directionAssignment[this.direction]);
  }
  private pointTowards() {
    this.setAngle(this.pointAngle[this.direction]);
  }
  private assign(pos: 'x' | 'y') {
    const { player } = this.options;
    const value = Phaser.Math.Interpolation.CatmullRom(
      [pos === 'x' ? this.x : this.y, pos === 'x' ? player.x : player.y],
      this.lerp
    );
    pos === 'x' ? this.setX(value) : this.setY(value);
  }
  private preExit() {
    this.status = 'pre-exit';
    this.stopFollow();
    this.bow.setTexture('bow-and-arrow', 0);
    this.arrow.setVisible(false);
  }
  private postExit() {
    this.status = 'post-exit';
    this.setVisible(false);
  }
  private preEnter() {
    this.status = 'pre-enter';
    this.bow.setTexture('bow-and-arrow', 1);
    this.arrow.setVisible(true);
    this.pointTowards();
    this.setVisible(true);
  }
  private postEnter() {
    this.status = 'post-enter';
    this.startFollow();
  }
  private startFollow() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }
  private stopFollow() {
    this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    this.follow();
  }
  enter(direction: Direction) {
    if (this.status !== 'post-exit') return;

    this.direction = direction;

    const range = this.spawnRange[direction];
    this.setPosition(
      Phaser.Math.RND.between(...range.x),
      Phaser.Math.RND.between(...range.y)
    );

    this.scene.tweens.add({
      ...this.positionDelta[this.direction],
      targets: this,
      duration: 1000,
      ease: Phaser.Math.Easing.Cubic.Out,
      onStart: this.preEnter,
      onComplete: this.postEnter,
      callbackScope: this,
    });
  }
  async exit(fire: boolean) {
    if (this.status !== 'post-enter') return;

    const flipped = compress(
      flipPositionDelta(this.positionDelta[this.direction])
    );

    return new Promise((resolve) =>
      this.scene.tweens.add({
        // slide up and out of the screen
        targets: this,
        ...flipped,
        duration: 1000,
        ease: Phaser.Math.Easing.Cubic.Out,
        onStart: () => {
          this.preExit();

          if (!fire) return;
          this.options.events.emit('fire', {
            position: [this.x, this.y],
            angle: this.angle,
            direction: this.direction,
          });
        },
        onComplete: () => {
          this.postExit();
          resolve(true);
        },
        callbackScope: this,
      })
    );
  }
}

const flipDelta = (delta: DeltaValue) => ({
  from: delta.to,
  to: delta.from,
});

const flipPositionDelta = (delta: PositionDelta) => ({
  x: delta.x ? flipDelta(delta.x) : undefined,
  y: delta.y ? flipDelta(delta.y) : undefined,
});

export const newBowFactory = (
  scene: Phaser.Scene,
  player: Slime,
  events: BowEventEmitter
) => {
  let builder: Phaser.Time.TimerEvent | undefined;
  const bows: Record<string, Bow> = {};
  const loops: Record<string, Phaser.Time.TimerEvent> = {};

  const loop = (bow: Bow) => {
    return scene.time.addEvent({
      delay: Math.max(2000, 6000 - Object.keys(loops).length * 30),
      loop: true,
      repeat: -1,
      callback: async () => {
        bow.enter(Phaser.Math.RND.pick(['up', 'down', 'left', 'right']));
        scene.sound.play('bow', { volume: 1 });
        await waitFor(Phaser.Math.RND.between(1000, 5000));
        bow.exit(true);
      },
    });
  };

  const create = () => {
    // TODO: find a bow without a loop and create one for it instead
    // of creating a new bow every time.
    const bow = new Bow(scene, {
      player,
      events,
    });
    bows[bow.name] = bow;
    loops[bow.name] = loop(bow);
  };
  return {
    start: () => {
      create();
      create();

      builder = scene.time.addEvent({
        delay: 12345,
        loop: true,
        callback: () => {
          create();
        },
      });
    },

    stop: () => {
      builder?.destroy();

      Object.entries(loops).forEach(([key, loop]) => {
        loop.destroy();
        delete loops[key];
      });

      Object.values(bows).forEach((bow) => bow.exit(false));
    },
  };
};

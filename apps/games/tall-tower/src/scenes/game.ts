import { Block } from '../objects/block';
import { Blocks } from '../objects/blocks';
import { Grid } from '../objects/grid';
import { GameOverPayload, Location } from '../types';

const difficulty: Record<number, number> = {
  20: 200,
  19: 200,
  18: 190,
  17: 180,
  16: 170,
  15: 160,
  14: 150,
  13: 140,
  12: 130,
  11: 120,
  10: 110,
  9: 100,
  8: 85,
  7: 80,
  6: 75,
  5: 70,
  4: 65,
  3: 55,
  2: 45,
  1: 40,
  0: 35,
};

export class Game extends Phaser.Scene {
  timer?: Phaser.Time.TimerEvent;
  blocks?: Blocks;
  placements: Record<string, Phaser.GameObjects.Sprite> = {};
  particles?: Phaser.GameObjects.Particles.ParticleEmitter;

  done = false;
  defaultSize = 3;
  height = 19;
  speed = 150;
  constructor() {
    super('game');
  }

  create() {
    this.placements = {};
    this.height = 19;
    this.speed = 300;
    this.done = false;

    this.addWallpaper();
    this.addGrid();
    this.addMarkers();
    this.addTitle();

    this.blocks = new Blocks(this, this.defaultSize);
    this.blocks.set({ column: 0, row: this.height });
    this.moveBlocks();
    this.createPlayerController();
    this.addParticles();
  }

  addWallpaper() {
    const { width, height } = this.cameras.main;

    this.add
      .tileSprite(width * 0.5, height * 0.5, width, height, 'wallpaper')
      .setOrigin(0.5);
  }

  addGrid() {
    const { width, height } = this.cameras.main;

    this.add.image(width * 0.5, height * 0.5, 'grid').setOrigin(0.5);
    this.add.image(width * 0.5, height * 0.5, 'border').setOrigin(0.5);
  }

  addMarkers() {
    this.addMarker({ row: 0, hideTopLine: true, text: 'MAJOR PRIZE' });
    this.addMarker({ row: 6, text: 'MINOR PRIZE' });
    this.addMarker({ row: 12, text: 'BONUS PRIZE' });
  }

  addMarker({
    row,
    hideTopLine,
    text,
  }: {
    row: number;
    hideTopLine?: boolean;
    text: string;
  }) {
    this.add
      .bitmapText(
        this.center().x,
        Grid.rowToHeight(row + 0.5, -2),
        'peaberry',
        text,
        20
      )
      .setOrigin(0.5)
      .setAlpha(0.75)
      .setLetterSpacing(10);

    if (!hideTopLine) {
      this.addLine(Grid.rowToHeight(row, 1));
    }
    this.addLine(Grid.rowToHeight(row + 1, -1));
  }

  addTitle() {
    this.add
      .bitmapText(
        this.center().x,
        Grid.rowToHeight(-2),
        'peaberry',
        'TALL TOWER',
        32
      )
      .setOrigin(0.5)
      .setLetterSpacing(6);

    this.addLine(Grid.rowToHeight(-1.25, -1), 1);
  }

  addParticles() {
    this.particles = this.add.particles(0, 0, 'block', {
      lifespan: 500,
      speed: { min: 50, max: 250 },
      scale: { start: 0.25, end: 0 },
      rotate: { start: -360, end: 360, random: true },
      alpha: { start: 1, end: 0 },
      emitting: false,
    });
  }

  center() {
    const { width, height } = this.cameras.main;
    return { x: width * 0.5, y: height * 0.5 };
  }

  addLine(y: number, alpha = 0.5) {
    this.add
      .graphics()
      .lineStyle(2, 0xffffff, 1)
      .strokeLineShape(
        new Phaser.Geom.Line(
          Grid.columnToWidth(0),
          y,
          Grid.columnToWidth(10),
          y
        )
      )
      .setAlpha(alpha);
  }

  moveBlocks() {
    const blocks = this.blocks;
    if (!blocks) return;

    const max = 10 - blocks.list.length;
    const min = 0;

    const start = this.height === 19 ? 1 : Phaser.Math.Between(0, 1);
    let x = start > 0.5 ? min : max;
    let direction = start > 0.5 ? 1 : -1;
    this.timer = this.time.addEvent({
      delay: this.speed,
      callback: () => {
        blocks.set({ column: x, row: this.height });
        x += direction;
        if (x === max) {
          direction = -1;
        } else if (x === min) {
          direction = 1;
        }
      },
      startAt: 0,
      callbackScope: this,
      loop: true,
    });
  }

  createPlayerController() {
    this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.input.on('pointerdown', this.handleDrop, this);
    this.input.keyboard?.on('keydown-SPACE', this.handleDrop, this);
  }

  handleDrop() {
    if (!this.blocks) return;

    const blocks = this.blocks.clone();

    let dropped = 0;
    for (const block of blocks) {
      const location = block.location;
      this.sound.play('drop');
      // check if there's a block below
      if (this.canDrop(location)) {
        this.placements[Grid.positionToKey(block.location)] = block;
      } else if (this.blocks.length > 0) {
        this.blocks.reduce();
        this.drop(block);
        dropped += 1;
      }
    }

    if (dropped >= blocks.length) {
      this.launchGameOver();
      return;
    }

    this.increaseHeight();
  }

  increaseHeight() {
    this.height -= 1;
    this.timer?.remove();
    if (this.height < 0) {
      this.launchGameOver();
      return;
    }
    this.speed = difficulty[this.height];
    this.moveBlocks();
  }

  canDrop(location: Location): boolean {
    if (Grid.lowest(location)) return true;
    const below = Grid.below(location);
    const placement = this.placements[Grid.positionToKey(below)];
    return !!placement;
  }

  drop(block: Block) {
    const event = this.time.addEvent({
      delay: 150,
      loop: true,
      callback: () => {
        block.set({
          column: block.location.column,
          row: block.location.row + 1,
        });
        if (
          this.canDrop({
            row: block.location.row - 1,
            column: block.location.column,
          })
        ) {
          this.particles?.explode(10, block.x + 15, block.y - 15);
          event.destroy();
          block.destroy();
          if (this.blocks?.length === 0) {
            this.launchGameOver();
          }
        }
      },
    });
  }

  launchGameOver() {
    const gameOver: GameOverPayload = {
      height: this.height,
      blocks: this.blocks?.length ?? 0,
      placements: convertPlacements(this.placements),
    };

    if (this.done) return;
    this.done = true;

    this.sound.play('over');
    this.scene.start('game_over', gameOver);
  }
}

const convertPlacements = (
  placements: Record<string, Phaser.GameObjects.Sprite>
): Record<number, number> => {
  const r: Record<number, number> = {};
  for (const placement in placements) {
    const location = Grid.keyToPosition(placement);
    if (!r[location.row]) {
      r[location.row] = 0;
    }
    r[location.row] += 1;
  }
  return r;
};

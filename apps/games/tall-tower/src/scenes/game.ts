import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { Block } from '../objects/block';
import { Blocks } from '../objects/blocks';
import { Grid } from '../objects/grid';
import { GameOverPayload, Location } from '../types';
import { yellow } from '../util';

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
  5: 65,
  4: 55,
  3: 50,
  2: 45,
  1: 40,
  0: 35,
};

export class Game extends Phaser.Scene {
  timer?: Phaser.Time.TimerEvent;
  blocks?: Blocks;
  placements: Record<string, Phaser.GameObjects.Sprite> = {};
  particles?: Phaser.GameObjects.Particles.ParticleEmitter;
  server!: CharityGamesPlugin;
  actionable = false;
  bonus = false;
  done = false;
  defaultSize = 3;
  height = 19;
  speed = 150;
  score = 0;
  dropping = 0;
  scoreText!: Phaser.GameObjects.BitmapText;
  constructor() {
    super('game');
  }

  create() {
    this.server = CharityGamesPlugin.find(this);
    this.bonus = this.server.storage.pull('bonus-run', false);
    this.placements = {};
    this.height = 19;
    this.speed = 200;
    this.score = 0;
    this.dropping = 0;
    this.done = false;
    this.actionable = false;

    this.addWallpaper();
    this.addGrid();
    this.addMarkers();
    this.addTitle();
    this.addScore();

    this.blocks = new Blocks(this, this.defaultSize + (this.bonus ? 2 : 0));
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

  addScore() {
    this.scoreText = this.add
      .bitmapText(
        Grid.columnToWidth(0),
        Grid.rowToHeight(21),
        'peaberry',
        'SCORE: 0',
        20
      )
      .setOrigin(0)
      .setDropShadow(2, 2, 0x000000, 1)
      .setLetterSpacing(4);
  }

  updateScore(delta: number) {
    this.score += delta;
    if (this.score < 0) {
      this.score = 0;
    }
    this.scoreText.setText(`SCORE: ${this.score}`);
  }

  addTitle() {
    const text = this.add
      .bitmapText(
        this.center().x,
        Grid.rowToHeight(-2),
        'peaberry',
        'TALL TOWER',
        32
      )
      .setOrigin(0.5)
      .setLetterSpacing(6);

    this.addLine(
      Grid.rowToHeight(-1.25, -1),
      1,
      this.bonus ? yellow : 0xffffff
    );

    if (this.bonus) {
      text.setTint(yellow);
      text.setText('BONUS RUN');
    }
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

  addLine(y: number, alpha = 0.5, color = 0xffffff) {
    this.add
      .graphics()
      .lineStyle(2, color, 1)
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
      startAt: 0,
      delay: this.speed,
      callback: () => {
        this.actionable = true;
        blocks.set({ column: x, row: this.height });
        x += direction;
        if (x === max) {
          direction = -1;
          this.updateScore(-1);
        } else if (x === min) {
          direction = 1;
          this.updateScore(-1);
        }
      },
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
    if (!this.actionable) return;

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
        this.dropping += 1;
        dropped += 1;
      }
    }

    if (dropped >= blocks.length) {
      this.timer?.remove();
      return;
    }

    this.increaseHeight();
  }

  increaseHeight() {
    this.height -= 1;
    this.timer?.remove();
    this.actionable = false;
    if (this.height < 0) {
      this.launchGameOver();
      return;
    }
    this.speed = difficulty[this.height];
    this.updateScore(10);
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
          this.dropping -= 1;
          this.particles?.explode(10, block.x + 15, block.y - 15);
          event.destroy();
          block.destroy();
          if (this.blocks?.length === 0 && this.dropping === 0) {
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
      bonus: this.bonus,
      score: this.score,
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

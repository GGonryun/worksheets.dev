import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { phaserInputEvent } from '../input-events';
import { BlockGroup } from '../objects/block-group';
import { BlockGroupGenerator } from '../objects/block-group-generator';
import { GameGrid } from '../objects/game-grid';
import { GameSolver } from '../objects/game-solver';
import { HomeButton } from '../objects/home-button';
import { LightButton } from '../objects/light-button';
import { LightningButton } from '../objects/lightning-button';
import { ScoreKeeper } from '../objects/score-keeper';
import { Separator } from '../objects/separator';
import { SoundButton } from '../objects/sound-button';
import { Typography } from '../objects/typography';
import { grid, theme } from '../settings';
import { GameOverPayload } from '../types';
import { paintBody } from '../util';

export class Game extends Phaser.Scene {
  blur: Phaser.FX.Blur | undefined;
  lightning!: LightningButton;
  grid!: GameGrid;
  generator!: BlockGroupGenerator;
  server!: CharityGamesPlugin;
  solver!: GameSolver;
  blocks: BlockGroup[];
  score!: ScoreKeeper;
  separator!: Separator;
  lastChance: boolean;
  constructor() {
    super('game');
    this.blocks = [];
    this.grid;
    this.lastChance = true;
  }

  create() {
    this.server = CharityGamesPlugin.find(this);

    this.grid = new GameGrid(this);
    this.generator = new BlockGroupGenerator(this);
    this.solver = new GameSolver(this);
    this.lastChance = true;

    this.setUpSceneBlur();
    this.createInterface();
    this.createSeparator();
    this.createEventHandlers();

    this.redraw();

    // on letter J trigger game over.
    this.input.keyboard?.on('keydown-J', () => {
      this.triggerGameOver();
    });
  }

  createInterface() {
    const { width } = this.cameras.main;
    const BEST_SCORE = 0;

    const leftOffset = 92;
    const buttonSize = 48;
    const buttonGap = 8;

    const rightOffset = width - leftOffset - buttonSize;
    new SoundButton(this, leftOffset, buttonSize, {
      size: 48,
      scale: 0.16,
    });
    new LightButton(this, leftOffset + buttonSize + buttonGap, buttonSize, {
      size: 48,
      scale: 0.16,
    }).onClick(() => {
      this.redraw();
    });

    // display score.
    this.score = new ScoreKeeper(this);
    new Typography(this, width * 0.5, 108, `Best: ${BEST_SCORE}`, 24);

    this.lightning = new LightningButton(
      this,
      rightOffset - buttonSize - buttonGap,
      48
    )
      .disable()
      .onClick(() => {
        this.solver.lightning();
      });

    new HomeButton(this, rightOffset, 48).onClick(() => {
      this.scene.pause();
      this.scene.launch('are-you-sure');
    });
  }

  setUpSceneBlur() {
    this.events.on('revive', () => {
      this.solver.revive();
    });

    this.events.on('pause', () => {
      if (!this.blur) {
        this.blur = this.cameras.main.postFX.addBlur(0, 1, 1, 2, 0xffffff, 16);
      }
    });

    this.events.on('resume', () => {
      if (this.blur) {
        this.cameras.main.postFX.remove(this.blur);
        this.blur = undefined;
      }
    });

    // remove the event listener when the scene is destroyed.
    this.events.once('shutdown', () => {
      this.events.off('resume');
      this.events.off('pause');
      this.events.off('revive');
      this.blur = undefined;
    });
  }

  createSeparator() {
    this.separator = new Separator(this);
  }

  createEventHandlers() {
    phaserInputEvent(this)('dragstart', (pointer, group: BlockGroup) => {
      this.sound.play('select');
      const offset = {
        x: group.worldPosition.x - pointer.position.x,
        y: group.worldPosition.y - pointer.position.y + grid.cell.height / 2,
      };
      group.select(offset);
    });

    phaserInputEvent(this)('drag', (_, group: BlockGroup, x, y) => {
      group.dragPosition(x, y);
    });

    phaserInputEvent(this)('dragenter', (_, group: BlockGroup, zone) => {
      this.grid.onDragEnter(group, zone);
    });

    phaserInputEvent(this)('dragleave', (_, group: BlockGroup, zone) => {
      this.grid.onDragLeave(group, zone);
    });

    phaserInputEvent(this)(
      'dragend',
      (_, group: BlockGroup, dropped: boolean) => {
        if (!group.input) return;
        if (!dropped) {
          group.revert();
        }
      }
    );

    phaserInputEvent(this)('drop', async (_, group: BlockGroup, dropZone) => {
      const dropped = this.grid.canDrop(group, dropZone);

      if (dropped) {
        this.score.addBlocks(group.size());
        this.lightning.enable();
        this.sound.play('confirm');
        this.generator.release(group);
        await this.grid.drop(group, dropZone);
      } else {
        this.sound.play('cancel');
        group.revert();
      }
      this.solver.resolveLines();
      if (!this.solver.solve()) {
        this.triggerGameOver();
      }
    });
  }

  triggerGameOver() {
    const payload: GameOverPayload = {
      score: this.score.value,
      blocks: this.score.blocks,
      lines: this.score.lines,
    };

    if (this.lastChance) {
      this.lastChance = false;
      this.scene.pause();
      this.scene.launch('last-chance', payload);
      this.sound.play('last_chance');
    } else {
      this.scene.pause();
      this.scene.launch('game-over', payload);
      this.sound.play('game_over');
    }
  }

  redraw() {
    const background = theme.get().background;
    paintBody(background);
    this.cameras.main.setBackgroundColor(background);

    this.generator.draw();
    this.separator.redraw();
    this.grid.redraw();
    for (const block of this.blocks) {
      block.view.redraw();
    }
  }
}

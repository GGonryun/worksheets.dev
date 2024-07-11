import { grid } from '../settings';
import { Typography } from './typography';

export class ScoreKeeper {
  text: Typography;
  value: number;
  lines: number;
  blocks: number;
  constructor(scene: Phaser.Scene) {
    const { width } = scene.cameras.main;

    this.lines = 0;
    this.value = 0;
    this.blocks = 0;
    this.text = new Typography(scene, width * 0.5, 72, `${this.value}`, 48);
  }

  addLines(lines: number) {
    this.lines += lines;
    this.addScore(lines * grid.size.columns);
  }

  addBlocks(blocks: number) {
    this.blocks += blocks;
    this.addScore(blocks);
  }

  addScore(points: number) {
    this.value += points;
    this.update();
  }

  update() {
    this.value = Math.max(0, this.value);
    this.text.setText(`${this.value}`);
  }
}

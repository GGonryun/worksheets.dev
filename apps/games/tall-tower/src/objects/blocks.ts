import { Location } from '../types';
import { Block } from './block';

export class Blocks extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, count: number) {
    super(scene);

    scene.add.existing(this);
    for (let i = 0; i < count; i++) {
      this.add(new Block(this.scene, { column: i, row: 0 }));
    }
  }

  set({ column, row }: Location) {
    this.iterate((block, i) => {
      if (block instanceof Block) {
        block.set({
          column: column + i,
          row,
        });
      }
    });
  }

  iterate(callback: (block: Block, i: number) => void) {
    this.list.forEach((block, i) => {
      if (block instanceof Block) {
        callback(block, i);
      }
    });
    return this;
  }

  clone() {
    const blocks: Block[] = [];
    this.iterate((block) => {
      blocks.push(block.clone());
    });
    return blocks;
  }

  reduce() {
    // get rid of the rightmost block
    const block = this.list.pop();
    if (block) {
      block.destroy();
    }
  }

  get left(): Block | undefined {
    return this.list[0] as Block;
  }
}

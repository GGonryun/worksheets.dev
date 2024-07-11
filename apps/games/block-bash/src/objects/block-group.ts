import { ColorKey, grid } from '../settings';
import { BlockGroupGenerator } from './block-group-generator';
import { BlockGroupView } from './block-group-view';
import { Coordinate } from './coordinate';

export class BlockGroup extends Phaser.GameObjects.Container {
  generator: BlockGroupGenerator;
  view: BlockGroupView;
  coordinates: Coordinate[];
  tweens: Phaser.Tweens.Tween[];
  grabOffset = { x: 0, y: 0 };
  smallScale = 0.5;

  constructor(
    generator: BlockGroupGenerator,
    coordinates: Coordinate[],
    color: ColorKey
  ) {
    super(generator.scene);
    this.generator = generator;
    this.scene = generator.scene;
    this.coordinates = coordinates;
    this.scene.add.existing(this);
    this.tweens = [];

    this.setSize(grid.cell.width * 6, grid.cell.height * 6);

    this.setScale(this.smallScale);

    this.setInteractive();
    this.scene.input.setDraggable(this);

    this.view = new BlockGroupView(this.scene, coordinates, color);
    this.add(this.view);
  }

  size() {
    return this.coordinates.length;
  }

  clone(): BlockGroupView {
    return new BlockGroupView(this.scene, this.coordinates, this.view.color);
  }

  dragPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  select(grabOffset: { x: number; y: number }) {
    this.grabOffset = grabOffset;
    // bring the group to the top of the display list.
    this.scene.children.bringToTop(this);

    this.tweens.push(
      this.scene.tweens.add({
        targets: this.list,
        y: `-=${grid.dragOffset + grabOffset.y}`,
        x: `-=${grabOffset.x}`,
        duration: 150,
        ease: 'Power2',
      })
    );
    this.tweens.push(
      this.scene.tweens.add({
        targets: this,
        scaleX: 1,
        scaleY: 1,
        duration: 150,
        ease: 'Power2',
      })
    );
  }

  revert() {
    if (!this.input) {
      throw Error('input is undefined');
    }
    const x = this.input.dragStartX;
    const y = this.input.dragStartY;

    this.tweens.forEach((tween) => {
      tween.destroy();
    });
    this.tweens = [];

    this.tweens.push(
      this.scene.tweens.add({
        targets: this,
        x,
        y,
        scaleX: this.smallScale,
        scaleY: this.smallScale,
        duration: 150,
        ease: 'Power2',
      })
    );

    this.tweens.push(
      this.scene.tweens.add({
        targets: this.list,
        y: `+=${grid.dragOffset + this.grabOffset.y}`,
        x: `+=${this.grabOffset.x}`,
        duration: 150,
        ease: 'Power2',
      })
    );
  }

  get worldPosition() {
    return {
      x: this.x + this.generator.x,
      y: this.y + this.generator.y,
    };
  }
}

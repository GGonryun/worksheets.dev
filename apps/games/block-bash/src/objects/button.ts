import { ColorKey, theme } from '../settings';

export class Button {
  private fn: (() => void)[];
  enabled: boolean;
  graphic: Phaser.GameObjects.Graphics;
  sprite: Phaser.GameObjects.Sprite;
  options: {
    x: number;
    y: number;
    sizeX: number;
    sizeY: number;
    color: ColorKey;
  };
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    size:
      | {
          x: number;
          y: number;
        }
      | number,
    color: ColorKey,
    icon: { texture: string; scale: number; sound?: string }
  ) {
    this.fn = [];
    const sizeX = typeof size === 'number' ? size : size.x;
    const sizeY = typeof size === 'number' ? size : size.y;
    this.options = {
      x,
      y,
      sizeX,
      sizeY,
      color,
    };

    this.graphic = scene.add.graphics();

    this.graphic.on('pointerdown', () => {
      this.fn.forEach((fn) => fn());
      scene.sound.play(icon.sound ?? 'text');
    });

    this.sprite = scene.add
      .sprite(x + sizeX * 0.5, y + sizeY * 0.5, icon.texture)
      .setScale(icon.scale);

    this.draw();
    this.enabled = true;
  }

  draw() {
    const { x, y, sizeX, sizeY, color } = this.options;
    this.graphic.clear();
    this.graphic.fillStyle(theme.get().tiles[color], 1);
    this.graphic.fillRoundedRect(x, y, sizeX, sizeY, 16);
    this.graphic.setInteractive(
      new Phaser.Geom.Rectangle(x, y, sizeX, sizeY),
      Phaser.Geom.Rectangle.Contains
    );
  }

  onClick(fn: () => void) {
    this.fn.push(fn);

    return this;
  }

  disable() {
    const { x, y, sizeX, sizeY } = this.options;
    this.graphic.clear();
    this.graphic.fillStyle(0x888888, 1);
    this.graphic.fillRoundedRect(x, y, sizeX, sizeY, 16);
    this.graphic.removeInteractive();
    this.sprite.setTint(0x888888);
    this.enabled = false;
    return this;
  }
  enable() {
    this.draw();
    this.sprite.clearTint();
    this.enabled = true;

    return this;
  }
}

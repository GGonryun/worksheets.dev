import * as Phaser from 'phaser';

type BaseTypographyOptions<
  TColor extends string = string,
  TSize extends string = string,
  TFamily extends string = string
> = {
  x: number;
  y: number;
  text: string;
  color?: TColor;
  size?: TSize;
  family?: TFamily;
};

type ButtonOptions<
  TColor extends string = string,
  TSize extends string = string,
  TFamily extends string = string
> = BaseTypographyOptions<TColor, TSize, TFamily> & {
  onClick?: () => void;
};
type LinkOptions<
  TColor extends string = string,
  TSize extends string = string,
  TFamily extends string = string
> = BaseTypographyOptions<TColor, TSize, TFamily> & {
  url?: string;
};

export type TypographyOptions<
  TColor extends string = string,
  TSize extends string = string,
  TFamily extends string = string
> = ButtonOptions<TColor, TSize, TFamily> | LinkOptions<TColor, TSize, TFamily>;

const isButton = (options: TypographyOptions): options is ButtonOptions => {
  return (options as ButtonOptions).onClick !== undefined;
};

const isLink = (options: TypographyOptions): options is LinkOptions => {
  return (options as LinkOptions).url !== undefined;
};

export abstract class Typography<
  TColor extends string = string,
  TSize extends string = string,
  TFamily extends string = string
> extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    options: TypographyOptions<TColor, TSize, TFamily>
  ) {
    const { x, y, text, color, size, family } = options;
    super(scene, x, y, text, {});
    this.setStyle({
      fontFamily: this.toFontFamily(family),
      color: this.toColor(color),
      fontSize: this.toSize(size),
    });
    scene.add.existing(this);
    this.setResolution(3).setOrigin(0.5);
    if (isLink(options)) {
      this.setInteractive({ cursor: 'pointer' });
      this.on('pointerup', () => {
        window.open(options.url, '_blank');
      });
    } else if (isButton(options)) {
      this.setInteractive({ cursor: 'pointer' });
      this.on('pointerup', () => {
        options.onClick?.();
      });
    }
  }

  abstract toColor(color?: TColor): string;
  abstract toSize(size?: TSize): string;
  abstract toFontFamily(family?: TFamily): string;
}

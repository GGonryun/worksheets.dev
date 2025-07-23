import { toCSS } from '@worksheets/phaser/colors';
import { Typography, TypographyOptions } from '@worksheets/phaser/text';

import { ERROR_COLOR, SKY_BLUE_COLOR, WHITE_COLOR } from '../settings/colors';

type FontFamily = 'pixel';
type FontColor = 'sky-blue' | 'white' | 'error';
type FontSize = 'md' | 'lg';

export class PixelTypography extends Typography<
  FontColor,
  FontSize,
  FontFamily
> {
  constructor(
    scene: Phaser.Scene,
    options: TypographyOptions<FontColor, FontSize, FontFamily>
  ) {
    super(scene, options);
  }

  toColor(color?: FontColor): string {
    const map: Record<FontColor, string> = {
      'sky-blue': toCSS(SKY_BLUE_COLOR),
      white: toCSS(WHITE_COLOR),
      error: toCSS(ERROR_COLOR),
    };
    return map[color ?? 'white'];
  }

  toSize(size?: FontSize): string {
    const map: Record<FontSize, number> = {
      md: 16,
      lg: 32,
    };
    return `${map[size ?? 'md'] || 16}px`;
  }

  toFontFamily(family?: FontFamily): string {
    return family ?? 'pixel';
  }
}

import * as Phaser from 'phaser';

type Hex = `#${string}`;

type HexCode = {
  toString: (radix?: number) => string;
  toNumber: () => number;
  toCSS: () => Hex;
};

const newHexCode = (value: number): HexCode => {
  const toString = (radix = 16) => value.toString(radix);
  return {
    toString,
    toNumber: () => value,
    toCSS: () => `#${toString()}`,
  };
};

export const toHex = (color: Phaser.Display.Color): HexCode => {
  return newHexCode(color.color);
};

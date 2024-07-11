export const lightning = {
  blocksPerStrike: 15,
  defaultStrikes: 7,
  adStrikes: 6,
};
export const grid = {
  particlesPerBlock: 8,
  dragOffset: 64,
  cell: { width: 32, height: 32 },
  size: { rows: 11, columns: 11 },
};
export const tomato = '#FF5A47';

const light = {
  key: 'light' as const,
  background: 0xebfaff,
  grid: 0xd9ecfc,
  text: 'white',
  separator: 0xa7bad5,
  tiles: {
    orange: 0xff8148,
    blue: 0x75bfff,
    yellow: 0xffd426,
    pink: 0xff81e6,
    green: 0x02dc99,
  },
};

const dark = {
  key: 'dark' as const,
  background: 0x3a3937,
  grid: 0x5e5c5a,
  text: 'white',
  separator: 0x9d9c9b,
  tiles: {
    orange: 0xff8148,
    blue: 0x75bfff,
    yellow: 0xffd426,
    pink: 0xff81e6,
    green: 0x02dc99,
  },
};

export type Theme = typeof light | typeof dark;
export type ThemeKey = typeof dark.key | typeof light.key;

export type ColorKey = keyof typeof light.tiles & keyof typeof dark.tiles;
const keys: Record<ColorKey, boolean> = {
  orange: true,
  blue: true,
  yellow: true,
  pink: true,
  green: true,
};

export const colors: ColorKey[] = Object.keys(keys) as ColorKey[];

const themeBuilder = () => {
  let current: Theme = light;

  const set = (key: ThemeKey) => {
    current = key === 'light' ? light : dark;
  };

  const toggle = () => {
    set(current.key === light.key ? 'dark' : 'light');
  };

  const get = () => {
    return current;
  };

  return {
    toggle,
    set,
    get,
  };
};

export const theme = themeBuilder();

export const version = '1.0.2';

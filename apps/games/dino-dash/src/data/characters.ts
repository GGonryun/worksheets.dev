export const CHARACTER_KEY = {
  p1: 'p1',
  p2: 'p2',
  p3: 'p3',
  p4: 'p4',
};

export const CHARACTER_KEYS_ARRAY = Object.keys(
  CHARACTER_KEY
) as CharacterKey[];

export type CharacterKey = keyof typeof CHARACTER_KEY;
export type CharacterInfo = {
  name: string;
  price: number;
  achievement: string;
  sprites: {
    idle: {
      key: string;
      frames: number;
    };
    run: {
      key: string;
      frames: number;
    };
    height: number;
  };
  collider: {
    height: number;
    offset: number;
  };
};

export const CHARACTER: Record<CharacterKey, CharacterInfo> = {
  p1: {
    name: 'Timmy the T-Rex',
    achievement: '',
    price: 0,
    sprites: {
      idle: { key: 'p1_idle', frames: 4 },
      run: { key: 'p1_run', frames: 6 },
      height: 16,
    },
    collider: {
      height: 16,
      offset: 0,
    },
  },
  p2: {
    name: 'Billy the Brontosaurus',
    achievement: 'DINO_DASH_UNLOCK_BILLY',
    price: 25,
    sprites: {
      idle: { key: 'p2_idle', frames: 4 },
      run: { key: 'p2_run', frames: 4 },
      height: 32,
    },
    collider: {
      height: 20,
      offset: 12,
    },
  },
  p3: {
    name: 'Terry the Triceratops',
    achievement: 'DINO_DASH_UNLOCK_TERRY',
    price: 50,
    sprites: {
      idle: { key: 'p3_idle', frames: 4 },
      run: { key: 'p3_run', frames: 4 },
      height: 32,
    },
    collider: {
      height: 20,
      offset: 12,
    },
  },
  p4: {
    name: 'Carly the Carnotaurus',
    achievement: 'DINO_DASH_UNLOCK_CARLY',
    price: 100,
    sprites: {
      idle: { key: 'p4_idle', frames: 4 },
      run: { key: 'p4_run', frames: 6 },
      height: 32,
    },
    collider: {
      height: 20,
      offset: 12,
    },
  },
};

export const INDEX_TO_CHARACTER_KEY: Record<number, CharacterKey> = {
  0: 'p1',
  1: 'p2',
  2: 'p3',
  3: 'p4',
};

export const INDEX_TO_CHARACTER: Record<number, CharacterInfo> = {
  0: CHARACTER[INDEX_TO_CHARACTER_KEY[0]],
  1: CHARACTER[INDEX_TO_CHARACTER_KEY[1]],
  2: CHARACTER[INDEX_TO_CHARACTER_KEY[2]],
  3: CHARACTER[INDEX_TO_CHARACTER_KEY[3]],
};

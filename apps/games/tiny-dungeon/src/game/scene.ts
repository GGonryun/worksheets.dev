import { TypedEventEmitter } from '@worksheets/phaser/events';
import { assertNever } from '@worksheets/util/errors';
import { keysOf } from '@worksheets/util/objects';
import { waitFor } from '@worksheets/util/time';

export class GameScene extends Phaser.Scene {
  static Key = 'GameScene';
  map: Map;
  characterEvents: CharacterEventEmitter;
  characters: CharacterFactory;
  projectile: ProjectileFactory;
  floorMarker: FloorMarkerFactory;
  player: Character;
  enemy: Character;
  keyboardController: KeyboardController;
  touchController: TouchController;

  constructor() {
    super({
      key: GameScene.Key,
    });
  }

  create() {
    this.characterEvents = new TypedEventEmitter();

    this.map = newMap(this);
    this.characters = newCharacterFactory(this);
    this.floorMarker = newFloorMarkerFactory(this);
    this.projectile = newProjectileFactory(this);

    this.enemy = this.characters.create({
      type: 'bandit',
      startTile: new Phaser.Math.Vector2(3, 3),
    });
    this.player = this.characters.create({
      type: 'raider',
      startTile: new Phaser.Math.Vector2(1, 4),
    });

    this.keyboardController = newKeyboardController(this);
    // TODO: probably temporary?
    this.touchController = newTouchController(this);

    this.characterEvents.on('launch-projectile', newProjectileHandler(this));
  }
}

const newProjectileHandler =
  (scene: GameScene) => (opts: LaunchProjectileEvent) =>
    scene.projectile.create(opts);

type FloorMarkerFactory = ReturnType<typeof newFloorMarkerFactory>;
const newFloorMarkerFactory = (scene: GameScene) => {
  const group = scene.add.group();

  const create = (point: Point) => {
    const marker = scene.add
      .sprite(point.x, point.y, 'attack-marker')
      .setOrigin(0.5);
    group.add(marker);
    return marker;
  };

  return { create };
};

const newCurveComputer = (options: {
  source: Point;
  destination: Point;
  peak: number;
}) => {
  const { destination, source, peak } = options;

  let lastX = source.x;
  let lastY = source.y;

  const run = (t: number) => {
    const x = Phaser.Math.Interpolation.Linear([source.x, destination.x], t);
    const y = Phaser.Math.Interpolation.Bezier(
      [source.y, source.y - peak, source.y - peak, destination.y],
      t
    );
    const dx = x - lastX;
    const dy = y - lastY;
    const a = Math.atan2(dy, dx) + Math.PI / 2; // Rotation in radians
    lastX = x;
    lastY = y;

    return { x, y, a };
  };

  return { run };
};

type ProjectileFactory = ReturnType<typeof newProjectileFactory>;
const newProjectileFactory = (scene: GameScene) => {
  keysOf(PROJECTILE_CHARACTER_CONFIGS).forEach((key) => {
    const config = PROJECTILE_CHARACTER_CONFIGS[key].projectile;
    scene.anims.create({
      key: config.animationKey,
      frames: scene.anims.generateFrameNumbers(config.effectTexture, {
        start: 0,
        end: config.animationFrames,
      }),
      frameRate: 30,
      repeat: 0,
      hideOnComplete: true,
    });
  });

  const createEffect = ({
    destination,
    animationKey,
    effectTexture,
  }: {
    destination: Point;
    animationKey: string;
    effectTexture: string;
  }) => {
    const effect = scene.add
      .sprite(destination.x, destination.y, effectTexture)
      .setOrigin(0.5);
    effect.play(animationKey);
    effect.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      scene.time.delayedCall(1000, () => {
        effect.destroy();
      });
    });
  };

  const createShadow = ({
    source,
    destination,
    duration,
    throwDistance,
    projectileTexture,
  }: {
    source: Point;
    destination: Point;
    duration: number;
    throwDistance: number;
    projectileTexture: string;
  }) => {
    const shadow = scene.add
      .sprite(source.x, source.y, projectileTexture)
      .setOrigin(0.5)
      .setScale(0)
      .setTint(0x000000);

    // close distances are more angled towards the sky
    // this should probably be synchronized with the angle of the spear
    // but using distance is easier than calculating the projection.
    // using a projection would couple the shadow to the thrown spear
    const normalizeShadowScale = (t: number) => {
      const max = 72;
      const min = 0.5;
      const normalizedThrow = Math.min(max, throwDistance);
      const shadowScale = Math.max(min, normalizedThrow / max);
      const xs = [0.4, 0.7, 1, 0.8, 0.4].map((v) => v * shadowScale);
      const ys = [0.9, 1, 0.7].map((v) => v * shadowScale);
      const x = Phaser.Math.Interpolation.Linear(xs, t);
      const y = Phaser.Math.Interpolation.Linear(ys, t);
      return { x, y };
    };

    scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration,
      onUpdate: (tween) => {
        const v = tween.getValue();
        const x = Phaser.Math.Interpolation.Linear(
          [source.x, destination.x],
          v
        );
        const y = Phaser.Math.Interpolation.Linear(
          [source.y, destination.y],
          v
        );
        shadow.setPosition(x, y);
        shadow.setAlpha(1 - 0.25 * v);
        // look at the destination
        const angle = Phaser.Math.Angle.Between(
          shadow.x,
          shadow.y,
          destination.x,
          destination.y
        );
        shadow.setRotation(angle + Math.PI / 2);

        const scale = normalizeShadowScale(v);
        shadow.setScale(scale.x, scale.y);
      },
      onComplete: () => {
        shadow.destroy();
      },
    });
  };

  const createBallistic = (options: {
    source: Point;
    destination: Point;
    peak: number;
    duration: number;
    animationKey: string;
    projectileTexture: string;
    effectTexture: string;
  }) => {
    const {
      source,
      destination,
      duration,
      animationKey,
      effectTexture,
      projectileTexture,
    } = options;
    const marker = scene.floorMarker.create(destination);
    const sprite = scene.add
      .sprite(source.y, source.y, projectileTexture)
      .setOrigin(0.5);

    const computer = newCurveComputer(options);
    scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration,
      onStart: () => {
        const { x, y } = computer.run(0);
        sprite.setPosition(x, y);
        sprite.setRotation(0);
      },
      onUpdate: (tween) => {
        const v = tween.getValue();
        const { x, y, a } = computer.run(v);

        sprite.setPosition(x, y);
        sprite.setRotation(a);
      },
      onComplete: () => {
        sprite.destroy();
        marker.destroy();
        createEffect({ destination, animationKey, effectTexture });
      },
    });
  };

  const create = ({
    source,
    destination,
    projectile,
  }: LaunchProjectileEvent) => {
    const pointX = source.x + 4;
    const pointY = source.y + 4;

    const throwDistance = Math.abs(destination.x - pointX);
    const verticalDifference = pointY - destination.y;
    const peakHeight = Math.max(
      projectile.peak + 34 - throwDistance * 0.5 + verticalDifference * 0.75,
      projectile.peak
    );
    const duration = projectile.speed + throwDistance * 5;

    createBallistic({
      ...projectile,
      source: {
        x: pointX,
        y: pointY,
      },
      destination,
      duration,
      peak: peakHeight,
    });
    createShadow({
      ...projectile,
      source: {
        x: pointX,
        y: pointY,
      },
      throwDistance,
      destination,
      duration,
    });
  };

  return { create };
};

type Map = ReturnType<typeof newMap>;
const newMap = (scene: Phaser.Scene) => {
  const init = () => {
    const map = scene.add.tilemap('map-1');
    const tiles = map.addTilesetImage('grass');
    if (!tiles) throw new Error('Failed to add tileset image');
    const layer = map.createLayer(0, tiles, 0, 0);
    if (!layer) throw new Error('Failed to create layer');
    map.setCollision([7, 8, 9, 10, 11, 13, 14, 15]);
    return layer;
  };

  const layer = init();

  const TILE_MOVEMENT: Record<Direction, Phaser.Math.Vector2> = {
    up: new Phaser.Math.Vector2(0, -1),
    down: new Phaser.Math.Vector2(0, 1),
    left: new Phaser.Math.Vector2(-1, 0),
    right: new Phaser.Math.Vector2(1, 0),
  };

  const getNeighbor = (
    character: Character,
    direction: Direction
  ): Phaser.Tilemaps.Tile => {
    const currentTile = layer.getTileAtWorldXY(
      character.body.x,
      character.body.y
    );
    if (!currentTile) throw new Error('Player is not on a tile');

    const movement = TILE_MOVEMENT[direction];
    if (!movement) throw new Error(`Invalid direction: ${direction}`);

    const nextTile = layer.getTileAt(
      currentTile.x + movement.x,
      currentTile.y + movement.y
    );
    if (!nextTile) throw new Error("The tile we are moving to doesn't exist");

    return nextTile;
  };

  const getDirection = (character: Point, to: Phaser.Tilemaps.Tile) => {
    const from = layer.getTileAtWorldXY(character.x, character.y);
    const xDiff = to.x - from.x;
    const yDiff = to.y - from.y;
    if (xDiff === 0 && yDiff < 0) return 'up';
    if (xDiff === 0 && yDiff > 0) return 'down';
    if (xDiff < 0 && yDiff === 0) return 'left';
    if (xDiff > 0 && yDiff === 0) return 'right';

    // is top left quadrant
    if (xDiff < 0 && yDiff < 0) {
      return Math.abs(xDiff) > Math.abs(yDiff) ? 'left' : 'up';
    }
    // is top right quadrant
    if (xDiff > 0 && yDiff < 0) {
      return xDiff > Math.abs(yDiff) ? 'right' : 'up';
    }
    // is bottom left quadrant
    if (xDiff < 0 && yDiff > 0) {
      return Math.abs(xDiff) > yDiff ? 'left' : 'down';
    }
    // is bottom right quadrant
    if (xDiff > 0 && yDiff > 0) {
      return xDiff > yDiff ? 'right' : 'down';
    }

    throw new Error('Invalid direction');
  };

  return { layer, tileSize: 8, getNeighbor, getDirection };
};

type CharacterFactory = ReturnType<typeof newCharacterFactory>;
type CharacterType =
  | 'knight'
  | 'mage'
  | 'bandit'
  | 'hunter'
  | 'rocketeer'
  | 'raider';
type MeleeCharacterType = 'knight' | 'bandit' | 'raider';
type ProjectileCharacterType = 'mage' | 'hunter' | 'rocketeer';
type BaseCharacter = {
  type: CharacterType;
  body: Phaser.GameObjects.Container;
  sprite: Phaser.GameObjects.Sprite;
  id: string;
  speed: number; // movement delay in ms
  offset: Phaser.Math.Vector2;
  reset: (direction: Direction) => void;
};
type CharacterBehaviors = {
  move: (tile: Phaser.Tilemaps.Tile) => Promise<void>;
  attack: (tile: Phaser.Tilemaps.Tile) => Promise<void>;
};
type Character = BaseCharacter & CharacterBehaviors;
type Point = {
  x: number;
  y: number;
};

type ProjectileType = 'spear' | 'magic' | 'rocket';
type LaunchProjectileEvent = {
  projectile: ProjectileAttackConfig['projectile'];
  source: Point;
  destination: Point;
};

type CharacterEventEmitter = TypedEventEmitter<{
  'launch-projectile': [LaunchProjectileEvent];
}>;

const newCharacterFactory = (scene: GameScene) => {
  const map = scene.map;
  const characters: Record<string, Character> = {};

  const create = ({
    type,
    startTile,
  }: {
    type: CharacterType;
    startTile: Phaser.Math.Vector2;
  }) => {
    const texture = `${type}-base`;
    const { offset } = CHARACTER_CONFIGS[type];
    const startPoint = map.layer.tileToWorldXY(startTile.x, startTile.y);

    const body = scene.add.container(startPoint.x, startPoint.y).setSize(8, 8);
    const sprite = scene.add
      .sprite(offset.x, offset.y, texture, 0)
      .setOrigin(0);

    body.add(sprite);

    const id = Phaser.Utils.String.UUID();

    const base: BaseCharacter = {
      id,
      type,
      body,
      sprite,
      offset,
      reset: (direction: Direction) => {
        sprite.setPosition(offset.x, offset.y);
        sprite.setTexture(texture);
        sprite.setFrame(CHARACTER_DIRECTION_FRAMES[direction]);
      },
      speed: 100,
    };

    const behaviors: CharacterBehaviors = {
      move: newCharacterMovementController(scene, base),
      attack: newCharacterAttackController(scene, base),
    };

    const character = {
      ...base,
      ...behaviors,
    };

    return (characters[id] = character);
  };

  const findOccupant = (tile: Phaser.Tilemaps.Tile) => {
    return Object.values(characters).find((character) => {
      const loc = map.layer.getTileAtWorldXY(
        character.body.x,
        character.body.y
      );
      return loc.x === tile.x && loc.y === tile.y;
    });
  };

  return { create, findOccupant, characters };
};

const newCharacterMovementController = (
  scene: GameScene,
  character: BaseCharacter
) => {
  const { map } = scene;
  return async (neighbor: Phaser.Tilemaps.Tile): Promise<void> => {
    const direction = map.getDirection(character.body, neighbor);

    character.reset(direction);

    if (neighbor.properties.isWall) return;
    const bounds = neighbor.getBounds() as Phaser.GameObjects.Rectangle;

    return new Promise((resolve) => {
      scene.tweens.add({
        x: bounds.x,
        y: bounds.y,
        targets: character.body,
        duration: character.speed,
        ease: Phaser.Math.Easing.Cubic.InOut,
        onComplete: () => {
          resolve();
        },
      });
    });
  };
};

const newCharacterAttackController = (
  scene: GameScene,
  character: BaseCharacter
) => {
  switch (character.type) {
    case 'knight':
    case 'bandit':
    case 'raider':
      return newMeleeAttackController(scene, {
        character,
        attack: MELEE_CHARACTER_CONFIGS[character.type],
      });

    case 'mage':
    case 'hunter':
    case 'rocketeer':
      return newProjectileAttackController(scene, {
        character,
        attack: PROJECTILE_CHARACTER_CONFIGS[character.type],
      });
    default:
      throw assertNever(
        character.type,
        `Invalid character type: ${character.type}.`
      );
  }
};

type CharacterConfig = {
  offset: Phaser.Math.Vector2;
};
const CHARACTER_CONFIGS: Record<CharacterType, CharacterConfig> = {
  knight: { offset: new Phaser.Math.Vector2(-1, -1) },
  bandit: { offset: new Phaser.Math.Vector2(-1, -1) },
  mage: { offset: new Phaser.Math.Vector2(-1, -1) },
  hunter: { offset: new Phaser.Math.Vector2(-1, -2) },
  rocketeer: { offset: new Phaser.Math.Vector2(-2, -5) },
  raider: { offset: new Phaser.Math.Vector2(-2, -3) },
};

type MeleeAnimationConfig = {
  x: number;
  y: number;
  start: { x?: string; y?: string };
  end: {
    x?: string;
    y?: string;
  };
};

type MeleeAttackConfig = { animation: Record<Direction, MeleeAnimationConfig> };

const MELEE_CHARACTER_CONFIGS: Record<MeleeCharacterType, MeleeAttackConfig> = {
  knight: {
    animation: {
      down: {
        x: -5,
        y: -3,
        start: { y: '+=1' },
        end: { y: '-=3' },
      },
      up: {
        x: -5,
        y: -7,
        start: { y: '-=1' },
        end: { y: '+=3' },
      },
      left: {
        x: -7,
        y: -5,
        start: { x: '-=1' },
        end: { x: '+=3' },
      },
      right: {
        x: -3,
        y: -5,
        start: { x: '+=1' },
        end: { x: '-=3' },
      },
    },
  },
  raider: {
    animation: {
      down: {
        x: -13,
        y: -9,
        start: { y: '+=3' },
        end: { y: '-=5' },
      },
      up: {
        x: -13,
        y: -13,
        start: { y: '-=3' },
        end: { y: '+=5' },
      },
      left: {
        x: -13,
        y: -13,
        start: { x: '-=3' },
        end: { x: '+=5' },
      },
      right: {
        x: -9,
        y: -11,
        start: { x: '+=3' },
        end: { x: '-=5' },
      },
    },
  },
  bandit: {
    animation: {
      down: {
        x: -3,
        y: -1,
        start: { y: '+=1' },
        end: { y: '-=2' },
      },
      up: {
        x: -1,
        y: -5,
        start: { y: '-=1' },
        end: { y: '+=2' },
      },
      left: {
        x: -3,
        y: -5,
        start: { x: '-=1' },
        end: { x: '+=2' },
      },
      right: {
        x: -1,
        y: -3,
        start: { x: '+=1' },
        end: { x: '-=2' },
      },
    },
  },
};

const PROJECTILE_CHARACTER_CONFIGS: Record<
  ProjectileCharacterType,
  ProjectileAttackConfig
> = {
  hunter: {
    delay: 500,
    offset: new Phaser.Math.Vector2(-2, -2),
    projectile: {
      type: 'spear',
      offset: { x: -1, y: -2 },
      speed: 1000,
      peak: 32,
      projectileTexture: 'hunter-projectile',
      effectTexture: 'hunter-projectile-effect',
      animationKey: 'hunter-projectile-explode',
      animationFrames: 4,
    },
  },
  mage: {
    delay: 350,
    offset: new Phaser.Math.Vector2(-1, -5),
    projectile: {
      type: 'magic',
      offset: { x: 0, y: -6 },
      speed: 1750,
      peak: 16,
      projectileTexture: 'mage-projectile',
      effectTexture: 'mage-projectile-effect',
      animationKey: 'mage-projectile-explode',
      animationFrames: 3,
    },
  },
  rocketeer: {
    delay: 200,
    offset: new Phaser.Math.Vector2(-2, -8),
    projectile: {
      type: 'rocket',
      offset: {
        left: { x: 3, y: -10 },
        up: { x: -0, y: -10 },
        down: { x: -0, y: -12 },
        right: { x: -3, y: -10 },
      },
      speed: 2500,
      peak: 100,
      projectileTexture: 'rocketeer-projectile',
      effectTexture: 'rocketeer-projectile-effect',
      animationKey: 'rocketeer-projectile-explode',
      animationFrames: 3,
    },
  },
};
const CHARACTER_DIRECTION_FRAMES: Record<Direction, number> = {
  down: 0,
  up: 1,
  left: 2,
  right: 3,
};

const newMeleeAttackController = (
  scene: GameScene,
  { character, attack }: { character: BaseCharacter; attack: MeleeAttackConfig }
) => {
  const { map } = scene;

  return async (neighbor: Phaser.Tilemaps.Tile): Promise<void> => {
    const direction = map.getDirection(character.body, neighbor);
    const { start, x, y, end } = attack.animation[direction];
    return new Promise((resolve) =>
      scene.tweens.add({
        ...start,
        targets: character.sprite,
        duration: 75,
        ease: Phaser.Math.Easing.Back.Out,
        onStart: () => {
          character.sprite.setPosition(x, y);
          character.sprite.setTexture(`${character.type}-attack`);
          character.sprite.setFrame(CHARACTER_DIRECTION_FRAMES[direction]);
        },
        onComplete: () => {
          scene.tweens.add({
            ...end,
            targets: character.sprite,
            duration: 125,
            ease: Phaser.Math.Easing.Back.Out,
            onComplete: () => {
              character.reset(direction);
              resolve();
            },
          });
        },
      })
    );
  };
};

type ProjectileOptions = {
  offset: Point | Record<Direction, Point>;
  type: ProjectileType;
  speed: number;
  peak: number;
  projectileTexture: string;
  effectTexture: string;
  animationKey: string;
  animationFrames: number;
};
type ProjectileAttackConfig = {
  delay: number;
  offset: Point;
  projectile: ProjectileOptions;
};

const newProjectileAttackController = (
  scene: GameScene,
  {
    attack,
    character,
  }: { character: BaseCharacter; attack: ProjectileAttackConfig }
) => {
  const { map, characterEvents } = scene;

  return async (target: Phaser.Tilemaps.Tile): Promise<void> => {
    const direction = map.getDirection(character.body, target);
    character.sprite.setTexture(`${character.type}-attack`);
    character.sprite.setFrame(CHARACTER_DIRECTION_FRAMES[direction]);
    character.sprite.setPosition(attack.offset.x, attack.offset.y);

    await waitFor(attack.delay);

    const offset = computeProjectileOffset(attack.projectile.offset, direction);

    characterEvents.emit('launch-projectile', {
      source: {
        x: character.body.x + offset.x,
        y: character.body.y + offset.y,
      },
      destination: {
        x: target.getCenterX(),
        y: target.getCenterY(),
      },
      projectile: attack.projectile,
    });

    character.reset(direction);

    return;
  };
};

const computeProjectileOffset = (
  offset: Point | Record<Direction, Point>,
  direction: Direction
) => ('x' in offset ? offset : offset[direction]);

export type CharacterProcessor = ReturnType<typeof newKnightProcessor>;
export type CharacterState = 'idle' | 'moving' | 'attacking';

const newKnightProcessor = (scene: GameScene, character: Character) => {
  const { map, characters } = scene;
  let state: CharacterState = 'idle';

  const execute = async (direction: Direction) => {
    if (state !== 'idle') return;

    const neighbor = map.getNeighbor(character, direction);
    if (!neighbor) return;

    const occupant = characters.findOccupant(neighbor);
    if (occupant && occupant.id !== character.id) {
      state = 'attacking';
      await character.attack(neighbor);
    } else {
      state = 'moving';
      await character.move(neighbor);
    }
    state = 'idle';
  };

  return {
    execute,
  };
};

type KeyboardController = ReturnType<typeof newKeyboardController>;
const newKeyboardController = (scene: GameScene) => {
  const processor = newKnightProcessor(scene, scene.player);

  scene.input.keyboard?.on('keydown-UP', async () => {
    processor.execute('up');
  });
  scene.input.keyboard?.on('keydown-DOWN', () => {
    processor.execute('down');
  });
  scene.input.keyboard?.on('keydown-LEFT', () => {
    processor.execute('left');
  });
  scene.input.keyboard?.on('keydown-RIGHT', () => {
    processor.execute('right');
  });
};

type Direction = 'up' | 'down' | 'left' | 'right';

type TouchController = ReturnType<typeof newTouchController>;
const newTouchController = (scene: GameScene) => {
  // capture touch events
  scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
    const { x, y } = pointer;
    const tile = scene.map.layer.getTileAtWorldXY(x, y);
    if (!tile) return;
    scene.player.attack(tile);
  });
};

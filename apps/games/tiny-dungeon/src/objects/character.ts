import { Direction, Point } from '@worksheets/phaser/types';
import { assertNever } from '@worksheets/util/errors';
import { waitFor } from '@worksheets/util/time';

import { GameScene } from '../scenes/game';
import { DAMAGE_TINT_COLOR } from '../settings/theme';
import { AnimationConfig } from './animations';
import { PROJECTILE_CHARACTER_CONFIGS, ProjectileType } from './projectiles';

export type CharacterState = 'idle' | 'moving';
export type Characters = ReturnType<typeof newCharacters>;
export type CharacterType =
  | 'knight'
  | 'mage'
  | 'bandit'
  | 'hunter'
  | 'rocketeer'
  | 'raider';
export type MeleeCharacterType = 'knight' | 'bandit' | 'raider';
export type ProjectileCharacterType = 'mage' | 'hunter' | 'rocketeer';
export type EnemyCharacterType = Exclude<
  CharacterType,
  'bandit' | 'raider' | 'knight'
>;
export type BaseCharacter = {
  type: CharacterType;
  body: Phaser.GameObjects.Container;
  sprite: Phaser.GameObjects.Sprite;
  id: string;
  speed: number; // movement delay in ms
  offset: Phaser.Math.Vector2;
  reset: (direction: Direction) => void;
  getTile: () => Phaser.Tilemaps.Tile;
  damage: () => void;
};
export type CharacterBehaviors = {
  move: (direction: Direction) => Promise<void>;
  attack: (tile: Phaser.Tilemaps.Tile) => Promise<Phaser.Tilemaps.Tile[]>;
};
export type Character = BaseCharacter & CharacterBehaviors;

export type CharacterConfig = {
  offset: Phaser.Math.Vector2;
};

export type MeleeAnimationConfig = {
  x: number;
  y: number;
  start: { x?: string; y?: string };
  end: {
    x?: string;
    y?: string;
  };
};

export type MeleeAttackConfig = {
  animation: Record<Direction, MeleeAnimationConfig>;
  speed: number;
  range: number;
};

export type ProjectileOptions = {
  offset: Point | Record<Direction, Point>;
  type: ProjectileType;
  speed: number;
  peak: number;
  projectileTexture: string;
  animation: AnimationConfig;
};

export type ProjectileAttackConfig = {
  delay: number;
  offset: Point;
  projectile: ProjectileOptions;
};

export type EnemyController = (
  scene: GameScene,
  enemy: Character,
  config: EnemyControllerConfig
) => void;

export type EnemyControllerConfig = {
  decision: { min: number; max: number };
  move: { min: number; max: number; count: number };
  attack: { min: number; max: number; count: number };
};

const MELEE_CHARACTER_CONFIGS: Record<MeleeCharacterType, MeleeAttackConfig> = {
  knight: {
    speed: 100,
    range: 1,
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
    speed: 100,
    range: 2,
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
    speed: 75,
    range: 1,
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

const CHARACTER_CONFIGS: Record<CharacterType, CharacterConfig> = {
  knight: { offset: new Phaser.Math.Vector2(-1, -1) },
  bandit: { offset: new Phaser.Math.Vector2(-1, -1) },
  mage: { offset: new Phaser.Math.Vector2(-1, -1) },
  hunter: { offset: new Phaser.Math.Vector2(-1, -2) },
  rocketeer: { offset: new Phaser.Math.Vector2(-2, -5) },
  raider: { offset: new Phaser.Math.Vector2(-2, -3) },
};

const CHARACTER_DIRECTION_FRAMES: Record<Direction, number> = {
  down: 0,
  up: 1,
  left: 2,
  right: 3,
};

export const newCharacters = (scene: GameScene) => {
  const map = scene.map;
  const bodies = scene.add.group();
  const sprites = scene.add.group();
  const characters: Record<string, Character> = {};

  const create = ({
    type,
    spawn,
  }: {
    type: CharacterType;
    spawn: Phaser.Tilemaps.Tile;
  }) => {
    const texture = `${type}-base`;
    const { offset } = CHARACTER_CONFIGS[type];
    const point = map.layer.tileToWorldXY(spawn.x, spawn.y);

    const body = scene.add.container(point.x, point.y).setSize(8, 8);
    bodies.add(body);
    const sprite = scene.add
      .sprite(offset.x, offset.y, texture, 0)
      .setOrigin(0);
    sprites.add(sprite);

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
      getTile: () => {
        return map.layer.getTileAtWorldXY(body.x, body.y);
      },
      damage: () => {
        // make the character sprite flash red
        scene.tweens.addCounter({
          from: 0,
          to: 1,
          duration: 100,
          repeat: 3,
          onStart: () => {
            sprite.setTint(DAMAGE_TINT_COLOR.color);
          },
          onUpdate: (tween) => {
            const v = tween.getValue();
            sprite.setAlpha(1 - v);
          },
          onComplete: () => {
            sprite.clearTint();
            sprite.setAlpha(1);
          },
        });
      },
      speed: 100,
    };

    const newCharacterMover = (scene: GameScene, character: BaseCharacter) => {
      const move = newCharacterMovementController(scene, base);

      const { map } = scene;
      let state: CharacterState = 'idle';

      return async (direction: Direction) => {
        if (state !== 'idle') return;

        const neighbor = map.getNeighbor(character, direction);
        if (!neighbor) return;

        state = 'moving';
        await move(neighbor);
        state = 'idle';
      };
    };

    const behaviors: CharacterBehaviors = {
      move: newCharacterMover(scene, base),
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
      const loc = character.getTile();
      return loc.x === tile.x && loc.y === tile.y;
    });
  };

  return {
    create,
    findOccupant,
    characters,
  };
};

const newCharacterMovementController = (
  scene: GameScene,
  character: BaseCharacter
) => {
  const { map } = scene;

  return async (
    neighbor: Phaser.Tilemaps.Tile
  ): Promise<Phaser.Tilemaps.Tile | undefined> => {
    const direction = map.getDirection(character.body, neighbor);
    if (!direction) return undefined;

    character.reset(direction);

    if (neighbor.properties.isWall) return undefined;
    const bounds = neighbor.getBounds() as Phaser.GameObjects.Rectangle;

    return new Promise((resolve) => {
      scene.tweens.add({
        x: bounds.x,
        y: bounds.y,
        targets: character.body,
        duration: character.speed,
        ease: Phaser.Math.Easing.Cubic.InOut,
        onComplete: () => {
          resolve(neighbor);
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

const computeProjectileOffset = (
  offset: Point | Record<Direction, Point>,
  direction: Direction
) => ('x' in offset ? offset : offset[direction]);

const newProjectileAttackController = (
  scene: GameScene,
  {
    attack,
    character,
  }: { character: BaseCharacter; attack: ProjectileAttackConfig }
) => {
  const { map, gameEvents } = scene;

  return async (
    target: Phaser.Tilemaps.Tile
  ): Promise<Phaser.Tilemaps.Tile[]> => {
    const direction = map.getDirection(character.body, target);
    if (!direction) return [];
    character.sprite.setTexture(`${character.type}-attack`);
    character.sprite.setFrame(CHARACTER_DIRECTION_FRAMES[direction]);
    character.sprite.setPosition(attack.offset.x, attack.offset.y);

    await waitFor(attack.delay);

    const offset = computeProjectileOffset(attack.projectile.offset, direction);

    gameEvents.emit('launch-projectile', {
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

    return [target];
  };
};

const newMeleeAttackController = (
  scene: GameScene,
  { character, attack }: { character: BaseCharacter; attack: MeleeAttackConfig }
) => {
  const { map } = scene;

  return async (
    neighbor: Phaser.Tilemaps.Tile
  ): Promise<Phaser.Tilemaps.Tile[]> => {
    const direction = map.getDirection(character.body, neighbor);
    if (!direction) return [];
    const { start, x, y, end } = attack.animation[direction];
    return new Promise((resolve) =>
      scene.tweens.add({
        ...start,
        targets: character.sprite,
        duration: attack.speed,
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
              resolve(
                map.getTilesInRange({
                  start: neighbor,
                  direction,
                  range: attack.range,
                })
              );
            },
          });
        },
      })
    );
  };
};

export const newProjectileEnemyController: EnemyController = (
  scene,
  enemy,
  config
) => {
  const randomTime = (min: number, max: number) => {
    return Phaser.Math.Between(min, max);
  };

  const randomlyAttack = async () => {
    for (let i = 0; i < config.attack.count; i++) {
      await waitFor(randomTime(config.attack.min, config.attack.max));
      const tile = scene.map.tiles.random();
      if (tile) {
        enemy.attack(tile);
      }
    }
  };

  const randomlyMove = async () => {
    for (let i = 0; i < config.move.count; i++) {
      await waitFor(randomTime(config.move.min, config.move.max));
      const directions: Direction[] = ['up', 'down', 'left', 'right'];
      const direction = Phaser.Utils.Array.GetRandom(directions);
      enemy.move(direction);
    }
  };

  const randomDecision = async () => {
    // pick a random action.
    const actions = ['move', 'attack'];
    const action = Phaser.Utils.Array.GetRandom(actions);
    if (action === 'move') {
      await randomlyMove();
    } else if (action === 'attack') {
      await randomlyAttack();
    } else {
      throw new Error(`Invalid action: ${action}`);
    }

    decide();
  };

  const decide = () =>
    scene.time.delayedCall(
      randomTime(config.decision.min, config.decision.max),
      randomDecision
    );

  decide();
};

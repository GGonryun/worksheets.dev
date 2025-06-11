import { TypedEventEmitter } from '@worksheets/phaser/events';
import { Direction, Point } from '@worksheets/phaser/types';
import { keysOf } from '@worksheets/util/objects';
import { SECONDS } from '@worksheets/util/time';

import { addAnimation } from '../objects/animations';
import {
  Character,
  Characters,
  EnemyCharacterType,
  EnemyController,
  EnemyControllerConfig,
  newCharacters,
  newProjectileEnemyController,
} from '../objects/character';
import {
  GamePad,
  newGamePad,
  newKeyboardController,
  newTouchController,
} from '../objects/controllers';
import {
  GameEventEmitter,
  LaunchProjectileEvent,
  ProjectileHitEvent,
} from '../objects/events';
import { Map, newMap } from '../objects/map';
import { newProjectiles, Projectiles } from '../objects/projectiles';
import { newText } from '../objects/text';
import { GAME_WIDTH } from '../settings/game';
import { GameOverScene, newGameOverPayload } from './game-over';

export class GameScene extends Phaser.Scene {
  static Key = 'GameScene';
  map: Map;
  gameEvents: GameEventEmitter;
  characters: Characters;
  enemies: Enemies;
  projectiles: Projectiles;
  floorMarkers: FloorMarkers;
  player: Character;
  gamePad: GamePad;
  score: Score;
  health: Health;
  clock: Clock;
  coins: Coins;
  continued: boolean;

  constructor() {
    super({
      key: GameScene.Key,
    });
  }

  create() {
    this.continued = false;
    this.gameEvents = new TypedEventEmitter();

    this.map = newMap(this);
    this.characters = newCharacters(this);
    this.floorMarkers = newFloorMarkers(this);
    this.projectiles = newProjectiles(this);

    this.player = this.characters.create({
      type: 'knight',
      spawn: this.map.tiles.random(),
    });

    this.gamePad = newGamePad(this);
    newKeyboardController(this);
    newTouchController(this);

    this.gameEvents.on('launch-projectile', newProjectileHandler(this));
    this.gameEvents.on('increment-score', newScoreChangeHandler(this));
    this.gameEvents.on('damage-dealt', newDamageDealtHandler(this));
    this.gameEvents.on('projectile-hit', newProjectileHitHandler(this));
    this.gameEvents.on('game-over', newGameOverHandler(this));
    this.gameEvents.on('input-move', newInputMoveHandler(this));
    this.gameEvents.on('resume-game', newResumeGameHandler(this));

    this.events.on(Phaser.Scenes.Events.RESUME, () => {
      this.gameEvents.emit('resume-game');
    });

    // on esc key press, restart the game
    this.input.keyboard?.on('keydown-ESC', () => {
      this.gameEvents.emit('game-over');
    });

    this.score = newScore(this);
    this.health = newHealth(this);
    this.clock = newClock(this);
    this.coins = newCoins(this);
    this.enemies = newEnemies(this);

    this.coins.spawn();
    this.enemies.spawn();
  }
}

type Enemies = ReturnType<typeof newEnemies>;
const newEnemies = (scene: GameScene) => {
  const types: Record<EnemyCharacterType, number> = {
    hunter: 0,
    mage: 0,
    rocketeer: 0,
  };
  const configs: Record<EnemyCharacterType, EnemyControllerConfig> = {
    hunter: {
      decision: { min: 100, max: 300 },
      move: { min: 100, max: 300, count: 1 },
      attack: { min: 100, max: 300, count: 3 },
    },
    mage: {
      decision: { min: 250, max: 1000 },
      move: { min: 250, max: 500, count: 2 },
      attack: { min: 10, max: 100, count: 6 },
    },
    rocketeer: {
      decision: { min: 500, max: 2000 },
      move: { min: 250, max: 500, count: 1 },
      attack: { min: 10, max: 250, count: 12 },
    },
    // only decision speed matters for melee enemies
  };

  let index = 0;
  const keys = keysOf(configs);
  const controllers: Record<EnemyCharacterType, EnemyController> = {
    hunter: newProjectileEnemyController,
    mage: newProjectileEnemyController,
    rocketeer: newProjectileEnemyController,
  };

  const nextKey = (): EnemyCharacterType => {
    if (index >= keys.length) {
      index = 0;
    }
    return keys[index++];
  };

  const spawn = (key: EnemyCharacterType = nextKey()) => {
    const controller = controllers[key];
    const enemy = scene.characters.create({
      type: key,
      spawn: scene.map.tiles.random(),
    });
    const config = configs[key];
    controller(scene, enemy, config);
    types[key] += 1;
  };

  const reset = () => {
    index = 0;
  };

  return { spawn, reset, SPAWN_INTERVAL: 10, types: () => ({ ...types }) };
};

type Coins = ReturnType<typeof newCoins>;
const newCoins = (scene: GameScene) => {
  let collected = 0;
  let coin: Phaser.GameObjects.Sprite;

  const animationKey = 'coin';

  addAnimation(scene, {
    key: animationKey,
    texture: 'coin',
    animationFrames: 7,
    frameRate: 4,
    repeat: -1,
    hideOnComplete: false,
  });

  const create = ({ x, y }: Point) => {
    const sprite = scene.add
      .sprite(x, y, animationKey)
      .setScale(1)
      .setOrigin(0);
    sprite.play(animationKey);
    return sprite;
  };

  const destroy = () => {
    if (coin) {
      coin.setVisible(false);
      coin.destroy();
    }
  };

  const spawn = () => {
    const coordinate = scene.map.randomCoordinate();
    const { x, y } = scene.map.toWorldXY(coordinate);
    coin = create({ x, y });
    return coin;
  };

  const collect = () => {
    destroy();
    spawn();
    collected += 1;
    scene.gameEvents.emit('increment-score', 1);
    scene.sound.play('coin');
  };

  const intersects = (tile: Phaser.Tilemaps.Tile) => {
    if (!coin) return false;
    // check if the current coin's coordinates match the tile's coordinates
    const coinTile = scene.map.getTile(coin);
    if (!scene.map.tiles.areEqual(coinTile, tile)) return false;

    collect();
    return true;
  };

  return { intersects, spawn, key: animationKey, collected: () => collected };
};

const newInputMoveHandler =
  (scene: GameScene) => async (direction: Direction) => {
    await scene.player.move(direction);
    scene.gamePad.animate(direction);
    const location = scene.player.getTile();
    scene.coins.intersects(location);
    scene.sound.play('walk', { volume: 0.3 });
  };

const newResumeGameHandler = (scene: GameScene) => () => {
  scene.gamePad.show();
  scene.health.show();
  scene.score.show();
  scene.health.recover();
  scene.continued = true;
};

const newGameOverHandler = (scene: GameScene) => () => {
  scene.scene.launch(
    GameOverScene.Key,
    newGameOverPayload({
      score: scene.score.current(),
      continued: scene.continued,
      enemies: scene.enemies.types(),
      clockTicks: scene.clock.ticks(),
      coinsCollected: scene.coins.collected(),
    })
  );
  scene.gamePad.hide();
  scene.score.hide();
  scene.health.hide();
  scene.scene.pause();
};

const newProjectileHitHandler =
  (scene: GameScene) =>
  ({ tile, type }: ProjectileHitEvent) => {
    scene.sound.play(type, { volume: type === 'magic' ? 0.25 : 0.4 });
    const isOccupiedByPlayer = (tiles: Phaser.Tilemaps.Tile[]) => {
      const tileHasPlayer = (tile: Phaser.Tilemaps.Tile) => {
        const occupant = scene.characters.findOccupant(tile);
        return occupant && occupant.id === scene.player.id;
      };
      return tiles.some((tile) => tileHasPlayer(tile));
    };
    if (isOccupiedByPlayer([tile])) {
      scene.gameEvents.emit('damage-dealt', 1);
    }
  };

type Score = ReturnType<typeof newScore>;
const newScore = (scene: GameScene) => {
  let score = 0;
  const label = 'score';

  const toString = () => `${label}: ${score}`;

  const text = newText(scene, {
    text: toString(),
    x: scene.map.x + 8,
    y: scene.map.y - 8,
    size: 'small',
    origin: 0,
  });

  return {
    current: () => score,
    hide: () => {
      text.setVisible(false);
    },
    show: () => {
      text.setVisible(true);
    },
    increment: (amount: number) => {
      score += amount;
      text.setText(toString());
    },
  };
};

type Health = ReturnType<typeof newHealth>;
const newHealth = (scene: GameScene) => {
  const RECOVER_HEALTH = 2;
  const startingHealth = 3;
  let hp = startingHealth;
  const offset = {
    x: scene.map.x + 13,
    y: scene.map.y - 5,
  };

  const container = scene.add.container(GAME_WIDTH - offset.x, offset.y);

  for (let i = 0; i < startingHealth; i++) {
    const heart = scene.make.sprite({
      key: 'health',
      frame: 0,
      x: -i * 6,
      y: 0,
    });
    heart.setOrigin(0);
    container.add(heart);
  }

  const updateHeart = (heart: Phaser.GameObjects.GameObject, index: number) => {
    if (heart instanceof Phaser.GameObjects.Sprite) {
      if (index < hp) {
        heart.setFrame(0); // full heart
        heart.setAlpha(1);
      } else {
        heart.setFrame(2); // empty heart
        heart.setAlpha(0.5);
      }
    }
  };

  const decrement = (amount: number) => {
    hp -= amount;
    if (hp < 0) hp = 0;

    container.list.forEach(updateHeart);

    if (hp <= 0) {
      scene.gameEvents.emit('game-over');
    }
  };

  return {
    decrement,
    hide: () => {
      container.setVisible(false);
    },
    show: () => {
      container.setVisible(true);
    },
    recover: () => {
      hp = RECOVER_HEALTH;
      container.list.forEach(updateHeart);
    },
  };
};

type Clock = ReturnType<typeof newClock>;
const newClock = (scene: GameScene) => {
  let ticks = 0;
  const SCORE_INTERVAL = 3;

  scene.time.addEvent({
    delay: 1 * SECONDS,
    loop: true,
    callback: () => {
      ticks += 1;
      if (ticks % SCORE_INTERVAL === 0) {
        scene.gameEvents.emit('increment-score', 1);
      }
    },
  });

  return {
    ticks: () => ticks,
  };
};

const newScoreChangeHandler = (scene: GameScene) => (amount: number) => {
  scene.score.increment(amount);

  const current = scene.score.current();
  if (current % scene.enemies.SPAWN_INTERVAL === 0) {
    scene.enemies.spawn();
  }
};

const newDamageDealtHandler = (scene: GameScene) => (damage: number) => {
  scene.health.decrement(damage);
  scene.player.damage();
};

const newProjectileHandler =
  (scene: GameScene) => (opts: LaunchProjectileEvent) =>
    scene.projectiles.create(opts);

type FloorMarkers = ReturnType<typeof newFloorMarkers>;
const newFloorMarkers = (scene: GameScene) => {
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

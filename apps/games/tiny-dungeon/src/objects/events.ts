import { TypedEventEmitter } from '@worksheets/phaser/events';
import { Direction, Point } from '@worksheets/phaser/types';

import { ProjectileAttackConfig } from './character';
import { ProjectileType } from './projectiles';

export type LaunchProjectileEvent = {
  projectile: ProjectileAttackConfig['projectile'];
  source: Point;
  destination: Point;
};

export type ProjectileHitEvent = {
  type: ProjectileType;
  tile: Phaser.Tilemaps.Tile;
};

export type GameEventEmitter = TypedEventEmitter<{
  'increment-score': [number];
  'damage-dealt': [number];
  'projectile-hit': [ProjectileHitEvent];
  'game-over': [];
  'launch-projectile': [LaunchProjectileEvent];
  'input-move': [Direction];
  'resume-game': [];
}>;

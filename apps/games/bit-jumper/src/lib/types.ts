export type PlatformType =
  | 'basic'
  | 'spring'
  | 'sliding'
  | 'breaking'
  | 'floor';

export type EnemyType = 'spiker' | 'chomper' | 'floater';

export type PowerUpType = 'balloon' | 'helicopter' | 'rocket';

export type GameOverPayload = {
  score: number;
  death: DeathReason;
  powerUps: Record<PowerUpType, number>;
  smashed: number;
};

export type DeathReason = EnemyType | 'fall';

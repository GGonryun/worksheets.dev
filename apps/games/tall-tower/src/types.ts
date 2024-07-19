export type Location = {
  column: number;
  row: number;
};

export type GameOverPayload = {
  height: number;
  blocks: number;
  placements: Record<number, number>;
};

export type RexDropShadowPipeline = {
  add: (
    gameObject: Phaser.GameObjects.GameObject,
    config: {
      angle: number;
      distance: number;
      shadowColor: number;
      alpha: number;
      blur: number;
    }
  ) => void;
};

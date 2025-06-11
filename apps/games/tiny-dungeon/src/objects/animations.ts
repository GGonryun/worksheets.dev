export type AnimationConfig = {
  key: string;
  animationFrames: number;
  frameRate: number;
  texture: string;
  repeat: number;
  hideOnComplete?: boolean;
};

export const addAnimation = (scene: Phaser.Scene, config: AnimationConfig) => {
  if (scene.anims.exists(config.key)) return;

  scene.anims.create({
    key: config.key,
    frames: scene.anims.generateFrameNumbers(config.texture, {
      start: 0,
      end: config.animationFrames,
    }),
    frameRate: config.frameRate,
    repeat: config.repeat,
    hideOnComplete: config.hideOnComplete,
  });
};

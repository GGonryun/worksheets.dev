export const newFlashingTween = (
  scene: Phaser.Scene,
  object: Phaser.GameObjects.Components.Alpha
) =>
  scene.tweens.addCounter({
    to: 1,
    from: 0,
    duration: 500,
    ease: Phaser.Math.Easing.Cubic.InOut,
    yoyo: true,
    repeat: -1,
    onUpdate: (tween) => {
      const v = tween.getValue();
      object.setAlpha(1 - v * 0.5);
    },
  });

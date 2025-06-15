export const fade = async (
  camera: Phaser.Cameras.Scene2D.Camera,
  options: {
    direction: 'in' | 'out';
    duration: number;
  }
) => {
  const behavior = options.direction === 'in' ? camera.fadeIn : camera.fadeOut;
  return await new Promise((resolve) =>
    behavior.bind(camera)(
      options.duration,
      0,
      0,
      0,
      (_camera: unknown, progress: number) => {
        if (progress === 1) {
          resolve(progress);
        }
      }
    )
  );
};

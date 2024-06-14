export const setWallpaper = (scene: Phaser.Scene) => (wallpaper: string) => {
  const { width, height } = scene.cameras.main;

  const image = scene.add.image(width / 2, height / 2, wallpaper);
  const scaleX = width / image.width;
  const scaleY = height / image.height;
  const scale = Math.max(scaleX, scaleY);

  image.setScale(scale).setScrollFactor(0);
};

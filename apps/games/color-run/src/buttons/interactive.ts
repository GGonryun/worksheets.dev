export const createInteractiveButton =
  (scene: Phaser.Scene) =>
  (x: number, y: number, image: string, callback: () => void) => {
    const button = scene.add.image(x, y, image);
    button.setInteractive();
    button.on("pointerdown", callback);
  };

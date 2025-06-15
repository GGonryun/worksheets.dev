export const objectBounce = (
  scene: Phaser.Scene,
  text: Phaser.GameObjects.Text,
  height = 5
) => {
  scene.tweens.add({
    targets: text,
    y: `-=${height}`,
    duration: 150,
    yoyo: true,
    ease: Phaser.Math.Easing.Bounce.InOut,
    repeat: -1,
  });
};

export const colorSpasm = (
  scene: Phaser.Scene,
  text: Phaser.GameObjects.Text
) => {
  // white, black, yellow, red, green, blue, purple, teal
  const colorOptions = [
    '#ffffff',
    '#000000',
    '#ffff00',
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ff00ff',
    '#00ffff',
  ];

  scene.time.addEvent({
    delay: 100,
    callback: () => {
      const color = text.style.color as string;
      const index = colorOptions.indexOf(color);
      text.setColor(colorOptions[(index + 1) % colorOptions.length]);
    },
    callbackScope: text,
    loop: true,
  });
};

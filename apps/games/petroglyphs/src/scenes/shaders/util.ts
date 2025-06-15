export const isWebGL = (
  renderer:
    | Phaser.Renderer.WebGL.WebGLRenderer
    | Phaser.Renderer.Canvas.CanvasRenderer
): renderer is Phaser.Renderer.WebGL.WebGLRenderer => {
  return renderer.type === Phaser.WEBGL;
};

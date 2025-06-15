import { COLORS_HEX, ORB_TYPE_TO_COLOR } from '../combat/constants';
import { isWebGL } from '../shaders/util';
import { ORB_SPRITES, OrbType } from './data';

export class OrbGlow extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    { x, y, type }: { x: number; y: number; type: OrbType }
  ) {
    super(scene, x, y, ORB_SPRITES[type]);
    this.setAlpha(0.5); // Adjust the glow opacity
    this.setScale(1); // Scale up the glow to make it bigger than the orb

    this.blendMode = Phaser.BlendModes.ADD; // Use ADD blend mode to make it glow

    if (!isWebGL(this.scene.game.renderer)) {
      throw new Error('Glow effect requires WebGL');
    }

    this.postFX.addGlow(
      COLORS_HEX[ORB_TYPE_TO_COLOR[type]],
      4,
      0,
      false,
      0.1,
      5
    );
  }
}

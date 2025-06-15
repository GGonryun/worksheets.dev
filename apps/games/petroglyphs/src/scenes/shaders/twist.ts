/* eslint-disable @typescript-eslint/no-unused-vars */
import { GAME_HEIGHT, GAME_WIDTH } from '../../settings';
import { isWebGL } from './util';

const fragShader3 = `
    precision mediump float;

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform sampler2D u_texture;
    uniform vec2 u_rotationCenter; // Custom center of rotation
    varying vec2 outTexCoord;

    void main() {
        // Transform from [0,1] to [-1,1] coordinate space
        vec2 uv = outTexCoord * 2.0 - 1.0;
        
        // Calculate the distance from the custom center of rotation
        vec2 delta = uv - u_rotationCenter; // Vector from rotation center
        float radius = length(delta);  // Distance from the center
        float angle = atan(delta.y, delta.x);  // Angle relative to the custom center
        
        // Gradual twist factor: stronger effect in the center
        float twistStrength = 1.0 - exp(-radius * 6.0);  // Stronger effect at the center, decays with distance
        
        // Twist the angle over time with stronger effect near the center
        float twistAmount = (u_time * 0.5) * (1.0 - radius);  // Twist is stronger in the center, weaker at edges
        
        // Apply the twisting effect to the angle (but only for pixels close to the center)
        float newAngle = angle + twistAmount;  // Increase the angle based on the twist amount
        vec2 twistedUV = u_rotationCenter + vec2(cos(newAngle), sin(newAngle)) * radius;  // Apply the new angle, maintaining the radius

        // Convert back to normalized coordinates for texture sampling
        vec2 newTexCoords = (twistedUV + 1.0) / 2.0;

        // Sample the texture with the twisted coordinates
        vec4 color = texture2D(u_texture, newTexCoords);
        gl_FragColor = color;
    }
`;

export class TwistEffectPipeline extends Phaser.Renderer.WebGL.Pipelines
  .SinglePipeline {
  static Key = 'TwistEffectPipeline';
  elapsed: number;
  enabled: boolean;
  constructor(game: Phaser.Game) {
    super({
      game: game,
      fragShader: fragShader3,
    });
    this.enabled = false;
    this.elapsed = 0;
  }

  static get(scene: Phaser.Scene): TwistEffectPipeline {
    if (!isWebGL(scene.game.renderer)) throw new Error('WebGL not supported');

    const pipe = scene.game.renderer.pipelines.get(
      TwistEffectPipeline.Key
    ) as TwistEffectPipeline;
    if (!pipe) throw new Error('Pipeline not found, did you call load?');

    return pipe;
  }

  static load(scene: Phaser.Scene) {
    if (!isWebGL(scene.game.renderer)) throw new Error('WebGL not supported');

    scene.game.renderer.pipelines.add(
      TwistEffectPipeline.Key,
      new TwistEffectPipeline(scene.game)
    );
    return this;
  }

  onBind() {
    // Use set2f to set the resolution of the canvas
    this.set2f('u_resolution', Number(GAME_WIDTH), Number(GAME_HEIGHT));
    // Set the custom rotation center (e.g., the center of the screen or another point)
    this.set2f('u_rotationCenter', 0, -0.85); // The center of the screen (can be changed)
  }

  onUpdate(delta: number) {
    if (!this.enabled) return;
    this.elapsed += delta;
    this.set1f('u_time', this.elapsed * 0.0001);
  }
}

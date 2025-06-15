import { isWebGL } from './util';

const noiseShader = `
precision highp float;  // Set high precision globally for floats
precision highp int;    // Ensure integers are also high precision

uniform float uProgress;    // 0.0 to 1.0 dissolve progress
uniform sampler2D uTexture; // Texture to dissolve
uniform vec2 uRes;   // Texture resolution
varying vec2 outTexCoord;   // Texture coordinate

// Random noise generator
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// 2D noise function
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = clamp(outTexCoord, 0.0, 1.0);
    vec4 color = texture2D(uTexture, uv);

    // Scale noise with resolution
    float strength = noise(uv * uRes / 100.0);

    // Smooth dissolve edge
    float alpha = smoothstep(uProgress - 0.1, uProgress, strength);

    if (alpha < 0.1) {
        discard;
    }

    gl_FragColor = vec4(color.rgb, alpha);
}
`;

export class NoiseShaderPipeline extends Phaser.Renderer.WebGL.Pipelines
  .SinglePipeline {
  static Key = 'NoiseShaderPipeline';
  constructor(game: Phaser.Game) {
    super({
      game,
      fragShader: noiseShader,
    });
  }
  static get(scene: Phaser.Scene): NoiseShaderPipeline {
    if (!isWebGL(scene.game.renderer)) {
      throw new Error('Noise shader requires WebGL');
    }

    const pipe = scene.game.renderer.pipelines.get(
      NoiseShaderPipeline.Key
    ) as NoiseShaderPipeline;
    if (!pipe) {
      throw new Error('Noise shader not found');
    }
    return pipe;
  }

  static load(scene: Phaser.Scene) {
    if (!isWebGL(scene.game.renderer)) {
      throw new Error('Noise shader requires WebGL');
    }

    scene.game.renderer.pipelines.add(
      NoiseShaderPipeline.Key,
      new NoiseShaderPipeline(scene.game)
    );
  }

  onUpdate(progress: number) {
    this.set1f('uProgress', progress);
  }

  onInit(width: number, height: number) {
    this.set2f('uRes', width, height);
  }
}

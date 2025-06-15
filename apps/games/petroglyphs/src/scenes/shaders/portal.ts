/* eslint-disable @typescript-eslint/no-unused-vars */
import { isWebGL } from './util';

const fragShader5 = `precision highp float;

uniform float u_time;           // Time elapsed
uniform vec2 u_resolution;      // Resolution of the screen
uniform vec2 u_sprite_pos;      // Sprite position in screen space
uniform float u_alpha;          // Custom alpha value


vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
  }

float fbm3d(vec3 x, const in int it) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100);

    
    for (int i = 0; i < 32; ++i) {
        if(i<it) {
            v += a * snoise(x);
            x = x * 2.0 + shift;
            a *= 0.5;
        }
    }
    return v;
}

void main() {
    // Normalized pixel coordinates (from 0 to 1) and (from -1 to 1)
    vec2 uv = (gl_FragCoord.xy - u_resolution.xy * 0.5) / u_resolution.y;

    // Offset the UV based on sprite position
    vec2 offset = (u_sprite_pos / u_resolution.xy) - 0.5; // Convert sprite position to [-0.5, 0.5] range
    uv -= offset; // Adjust UV based on sprite position

    // Perform noise and fractal generation
    vec2 st = vec2(
        length(uv) * 1.5,
        atan(uv.y, uv.x)
    );

    st.y += st.x * 1.1;
        
    float x = fbm3d(
        vec3(
            sin(st.y),
            cos(st.y),
            pow(st.x, 0.3) + u_time * 0.1
        ),
        3
    );

    float y = fbm3d(
        vec3(
            cos(1.0 - st.y),
            sin(1.0 - st.y),
            pow(st.x, 0.5) + u_time * 0.1
        ),
        4
    );
    
    float r = fbm3d(
        vec3(
            x,
            y,
            st.x + u_time * 0.3
        ),
        5
    );
    r = fbm3d(
        vec3(
            r - x,
            r - y,
            r + u_time * 0.3
        ),
        6
    );
    
    float c = (r + st.x * 5.0) / 6.0;
    
    // Calculate color
    vec4 color = vec4(
        smoothstep(0.03, 0.6, c),
        smoothstep(0.13, 0.6, c),
        smoothstep(0.03, 0.6, c),
        u_alpha
    );

    // Tolerance for white detection (closer to 1 means stricter detection of white)
    float whiteThreshold = 0.7;
    if (color.r > whiteThreshold && color.g > whiteThreshold && color.b > whiteThreshold) {
        color.a = 0.0;  // Set alpha to 0 (transparent)
    }

    // Ensure background transparency
    if (color.a == 0.0) {
        discard; // If alpha is 0, discard the pixel to ensure full transparency
    }

    gl_FragColor = vec4(color.rgb, u_alpha);
}
`;
export class PortalShaderPipeline extends Phaser.Renderer.WebGL.Pipelines
  .SinglePipeline {
  static Key = 'PortalPipeline';
  constructor(game: Phaser.Game) {
    super({
      game: game,
      fragShader: fragShader5,
    });
  }

  static get(scene: Phaser.Scene): PortalShaderPipeline {
    if (!isWebGL(scene.game.renderer)) throw new Error('WebGL not supported');

    const pipe = scene.game.renderer.pipelines.get(
      PortalShaderPipeline.Key
    ) as PortalShaderPipeline;
    if (!pipe) throw new Error('Pipeline not found, did you call load?');

    return pipe;
  }

  static load(scene: Phaser.Scene) {
    if (!isWebGL(scene.game.renderer)) throw new Error('WebGL not supported');

    scene.game.renderer.pipelines.add(
      PortalShaderPipeline.Key,
      new PortalShaderPipeline(scene.game)
    );
  }

  onUpdate(time: number) {
    this.set1f('u_time', time * 0.0005);
  }

  updatePosition(x: number, y: number) {
    this.set2f('u_sprite_pos', x, y);
  }

  updateSize(width: number, height: number) {
    this.set2f('u_resolution', width, height);
  }

  updateAlpha(alpha: number) {
    this.set1f('u_alpha', alpha);
  }
}

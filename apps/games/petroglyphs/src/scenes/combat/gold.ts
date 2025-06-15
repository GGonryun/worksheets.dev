import { ElementDepths } from './constants';
import { PARTICLE_TEXTURES } from './particles';

export type GoldPouchOptions = {
  gold: number;
};
export class GoldPouch {
  scene: Phaser.Scene;
  container: Phaser.GameObjects.Container;
  text: Phaser.GameObjects.Text;
  options: GoldPouchOptions;
  particles: Phaser.GameObjects.Particles.ParticleEmitter;
  sprite: Phaser.GameObjects.Sprite;
  constructor(scene: Phaser.Scene, options: GoldPouchOptions) {
    this.scene = scene;
    this.options = options;
  }

  create() {
    this.container = this.scene.add.container(612, 1260);
    this.container.setDepth(ElementDepths.CARD);

    this.sprite = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'icons-gold');
    this.sprite.setScale(0.31);
    this.container.add(this.sprite);

    this.text = new Phaser.GameObjects.Text(this.scene, 44, -1, `?`, {
      color: '#000000',
      fontSize: '28px',
      fontFamily: 'Arial',
      fontStyle: 'bold',
    });
    this.text.setOrigin(0.5, 0.5);
    this.container.add(this.text);
    this.update();

    this.particles = new Phaser.GameObjects.Particles.ParticleEmitter(
      this.scene,
      0,
      0,
      PARTICLE_TEXTURES['YELLOW'],
      {
        x: 0,
        y: 0,
        speed: { random: [50, 200] },
        lifespan: { random: [100, 500] },
        scale: { random: true, start: 1, end: 0 },
        rotate: { min: 0, max: 360 },
        angle: { min: 0, max: 360 },
        emitting: false,
      }
    );
    this.container.add(this.particles);
  }

  getWorldPosition() {
    const matrix = this.sprite.getWorldTransformMatrix();
    const decomposed = matrix.decomposeMatrix();
    return {
      x: decomposed.translateX,
      y: decomposed.translateY,
    };
  }
  increment(amount: number) {
    this.options.gold += amount;
    this.particles.explode(50);
    this.update();
  }

  update() {
    this.text.setText(`${this.options.gold}`);
  }
}

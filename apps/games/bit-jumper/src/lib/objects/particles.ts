export class Particles {
  static FLOOR_DEATH = 'floor_death';
  static IMPACT_DEATH = 'impact_death';
  static DOTS = 'explode_dots';
  static RINGS = 'explode_rings';
  static EXHAUST = 'rocket_exhaust';
  constructor(scene: Phaser.Scene, x: number, y: number) {
    const exhaust = new Phaser.GameObjects.Particles.ParticleEmitter(
      scene,
      x,
      y,
      'dot',
      {
        lifespan: 1000,
        speedX: { min: -30, max: 30 },
        scale: { min: 0.1, max: 2.5 },
        alpha: 1,
        emitting: false,
      }
    );

    const dots = new Phaser.GameObjects.Particles.ParticleEmitter(
      scene,
      x,
      y,
      'dot',
      {
        lifespan: 1000,
        speedX: { min: -50, max: 50 },
        speedY: { min: -10, max: -40 },
        scale: { min: 0.5, max: 2 },
        alpha: { start: 1, end: 0 },
        gravityY: 200,
        emitting: false,
      }
    );

    const rings = new Phaser.GameObjects.Particles.ParticleEmitter(
      scene,
      x,
      y,
      'ring',
      {
        lifespan: 150,
        scale: { start: 0, end: 1.25 },
        alpha: { start: 1, end: 0 },
        emitting: false,
      }
    );

    const impact = new Phaser.GameObjects.Particles.ParticleEmitter(
      scene,
      x,
      y,
      'dot',
      {
        lifespan: 3000,
        speedX: { min: -100, max: 100 },
        speedY: { min: -150, max: 50 },
        scale: { min: 0.5, max: 2 },
        alpha: { start: 1, end: 0 },
        gravityY: 100,
        emitting: false,
      }
    );
    const floor = new Phaser.GameObjects.Particles.ParticleEmitter(
      scene,
      x,
      y,
      'dot',
      {
        lifespan: 3000,
        speedX: { min: -100, max: 100 },
        speedY: { min: -300, max: 0 },
        scale: { min: 0.5, max: 2 },
        alpha: { start: 1, end: 0 },
        gravityY: 200,
        emitting: false,
      }
    );

    scene.add.existing(dots);
    scene.add.existing(rings);
    scene.add.existing(exhaust);
    scene.add.existing(impact);
    scene.add.existing(floor);

    scene.events.on(
      Particles.DOTS,
      (quantity: number, x: number, y: number) => {
        dots.explode(quantity, x, y);
      }
    );

    scene.events.on(Particles.RINGS, (x: number, y: number) => {
      rings.emitParticleAt(x, y);
    });

    scene.events.on(
      Particles.EXHAUST,
      (quantity: number, x: number, y: number) => {
        exhaust.explode(quantity, x, y);
      }
    );

    scene.events.on(
      Particles.IMPACT_DEATH,
      (quantity: number, x: number, y: number) => {
        impact.explode(quantity, x, y);
      }
    );

    scene.events.on(
      Particles.FLOOR_DEATH,
      (quantity: number, x: number, y: number) => {
        floor.explode(quantity, x, y);
      }
    );

    scene.events.on('shutdown', () => {
      scene.events.off(Particles.DOTS);
      scene.events.off(Particles.RINGS);
      scene.events.off(Particles.EXHAUST);
      scene.events.off(Particles.IMPACT_DEATH);
      scene.events.off(Particles.FLOOR_DEATH);
      scene.events.off('shutdown');
    });
  }
}

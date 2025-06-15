import { TypedEventEmitter } from '@worksheets/phaser/events';
import { Point } from '@worksheets/phaser/types';
import { assertNever } from '@worksheets/util/errors';
import { entriesOf } from '@worksheets/util/objects';

import {
  ElementDepths,
  ORB_ABSORPTION_DELAY,
  ORB_ABSORPTION_SPEED,
} from '../combat/constants';
import {
  PARTICLE_TEXTURES,
  Particles,
  randomizeHalfPoint,
} from '../combat/particles';
import { PortalController } from '../portal/portal';
import { OrbType } from './data';
import { Orb } from './orb';

export class OrbParticles extends Phaser.GameObjects.Container {
  emitters: Record<OrbType, Phaser.GameObjects.Particles.ParticleEmitter>;
  options = {
    quantity: 1,
    speed: 100,
    lifespan: Particles.DURATION,
    scale: { random: true, start: 0.2, end: 0 },
    frequency: 100,
    alpha: { start: 1, end: 0 },
    emitting: false,
    blendMode: Phaser.BlendModes.ADD,
  };
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.setDepth(ElementDepths.PARTICLES);
    this.emitters = {} as Record<
      OrbType,
      Phaser.GameObjects.Particles.ParticleEmitter
    >;
  }

  get(type: OrbType) {
    const got = this.emitters[type];

    if (got) return got;

    const emitter = new Phaser.GameObjects.Particles.ParticleEmitter(
      this.scene,
      0,
      0,
      PARTICLE_TEXTURES[type],
      this.options
    );
    this.add(emitter);
    this.emitters[type] = emitter;
    return emitter;
  }
}

export class Orbs extends Phaser.GameObjects.Container {
  scene: Phaser.Scene;
  orbs: Orb[];
  portal: Point;
  events: TypedEventEmitter<{
    'send-mana': [{ orb: OrbType; amount: number }];
    'orbs-absorbed': [Record<OrbType, number>];
  }>;
  timeout: NodeJS.Timeout | null;
  particles: OrbParticles;
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene = scene;
    this.orbs = [];
    this.events = new TypedEventEmitter();
    this.portal = PortalController.PortalPoint;

    this.particles = new OrbParticles(scene);
    this.add(this.particles);

    this.setDepth(ElementDepths.PARTICLES);
  }

  orb({ point, type }: { type: OrbType; point: Point }) {
    if (type == null) {
      console.error('type is null, defaulting to GREY orb', type);
      type = 'GREY';
    }
    const orb = new Orb(this.scene, point.x, point.y, type);
    this.add(orb);
    this.orbs.push(orb);
    this.done();
  }

  async absorb(): Promise<Record<OrbType, number>> {
    const map: Record<OrbType, number> = {
      RED: 0,
      GREEN: 0,
      BLUE: 0,
      YELLOW: 0,
      PURPLE: 0,
      GREY: 0,
    };

    const promises: Promise<unknown>[] = [];
    for (const orb of this.orbs) {
      if (orb.type === undefined) {
        console.error('orb type is undefined', orb);
        continue;
      }
      map[orb.type]++;

      const half = randomizeHalfPoint(this.portal);
      const xVals = [
        orb.x,
        half.x,
        this.portal.x + Phaser.Math.RND.between(-10, 10),
        this.portal.x,
      ];
      const yVals = [
        orb.y,
        half.y,
        this.portal.y + Phaser.Math.RND.between(-10, 10),
        this.portal.y,
      ];

      promises.push(
        new Promise((resolve) => {
          this.scene.tweens.chain({
            targets: orb,
            tweens: [
              {
                scale: orb.scale * 1.4,
                ease: Phaser.Math.Easing.Back.In,
                duration: (1 * ORB_ABSORPTION_SPEED) / 3,
              },
              {
                scale: 0,
                ease: Phaser.Math.Easing.Cubic.InOut,
                duration: (2 * ORB_ABSORPTION_SPEED) / 3,
              },
            ],
          });
          this.scene.tweens.addCounter({
            from: 0,
            to: 1,
            duration: ORB_ABSORPTION_SPEED,
            onStart: () => {
              orb.particles.destroy();
            },
            onComplete: () => {
              orb.destroy();
              this.remove(orb);
              resolve(true);
            },
            onUpdate: (tween) => {
              const v = tween.getValue();
              const x = Phaser.Math.Interpolation.CatmullRom(xVals, v);
              const y = Phaser.Math.Interpolation.CatmullRom(yVals, v);
              orb.setPosition(x, y);
              const emitter = this.particles.get(orb.type);
              emitter.emitParticleAt(x, y);
            },
          });
        })
      );
    }
    this.orbs = [];

    await Promise.all(promises);

    return map;
  }

  done() {
    // fire off an event that waits for 1 second before calling the done event.
    // if the orb call is called again, the original event is cancelled.
    // and the timer is reset.
    const timeout = this.timeout;
    if (timeout) {
      clearTimeout(timeout);
    }
    this.timeout = setTimeout(() => {
      this.processOrbs();
    }, ORB_ABSORPTION_DELAY);
  }

  async processOrbs() {
    // process orbs
    const orbs = await this.absorb();
    this.events.emit('orbs-absorbed', orbs);
    const totalOrbs = Object.values(orbs).reduce(
      (acc, val) => acc + (val ?? 0),
      0
    );
    if (totalOrbs > 0) {
      const entries = entriesOf(orbs);

      for (const [orb, amount] of entries) {
        if (amount === 0) continue;

        switch (orb) {
          case 'RED':
          case 'YELLOW':
          case 'GREEN':
          case 'BLUE':
          case 'PURPLE':
          case 'GREY':
            this.events.emit('send-mana', { orb, amount });
            break;
          default:
            throw assertNever(orb);
        }
      }
    }
  }
}

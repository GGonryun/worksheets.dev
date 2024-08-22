import { Enemies, Enemy } from './enemies';
import { Particles } from './particles';
import { BreakingPlatform, Platform, Platforms, Spring } from './platforms';
import { Player } from './player';
import { Balloon, Helicopter, PowerUp, PowerUps, Rocket } from './power-ups';

export class Collisions {
  scene: Phaser.Scene;
  powerUps: PowerUps;
  constructor(
    scene: Phaser.Scene,
    player: Player,
    platforms: Platforms,
    powerUps: PowerUps,
    enemies: Enemies
  ) {
    this.scene = scene;
    scene.physics.add.collider(
      player,
      platforms,
      this.onPlatformsCollide,
      undefined,
      this
    );

    scene.physics.add.overlap(
      player,
      powerUps,
      this.onPowerUpsOverlap,
      undefined,
      this
    );

    scene.physics.add.overlap(
      player,
      enemies,
      this.onEnemiesOverlap,
      undefined,
      this
    );
  }

  onPlatformsCollide(
    a: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
    b: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    if (a instanceof Player) {
      if (!a.jumping) {
        if (b instanceof Platform) {
          if (a.body.touching.down) {
            if (b instanceof BreakingPlatform) {
              const { x, y } = b.center();
              this.scene.sound.play('break');
              this.scene.events.emit(
                Particles.DOTS,
                BreakingPlatform.PARTICLE_QUANTITY,
                x,
                y
              );
              b.terminate();
            } else if (b instanceof Spring) {
              this.scene.sound.play('spring');
              b.launch(a);
            } else {
              this.scene.sound.play('jump');
              a.jump();
            }
          }
        }
      }
    }
  }

  onPowerUpsOverlap(
    a: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
    b: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    if (a instanceof Player) {
      if (b instanceof PowerUp) {
        if (a.powering) return;

        if (b instanceof Helicopter) {
          a.helicopter();
        } else if (b instanceof Balloon) {
          a.balloon();
        } else if (b instanceof Rocket) {
          a.rocket();
        }

        b.terminate();
      }
    }
  }

  onEnemiesOverlap(
    a: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
    b: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    if (a instanceof Player) {
      if (b instanceof Enemy) {
        if (a.powering) {
          this.scene.events.emit(
            Particles.IMPACT_DEATH,
            Enemy.PARTICLE_QUANTITY,
            b.x,
            b.y
          );
          this.scene.sound.play('smash');
          a.emit(Player.EVENT_SMASH_ENEMY, b.type);
          b.terminate();
        } else {
          this.scene.events.emit(
            Particles.IMPACT_DEATH,
            Player.IMPACT_DEATH_PARTICLE_QUANTITY,
            a.x,
            a.y
          );
          a.explode(b.type);
        }
      }
    }
  }
}

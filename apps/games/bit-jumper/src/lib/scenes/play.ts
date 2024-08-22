import Phaser from 'phaser';

import { Collisions } from '../objects/collisions';
import { Controller } from '../objects/controller';
import { Enemies } from '../objects/enemies';
import { Observer } from '../objects/observer';
import { Particles } from '../objects/particles';
import { Platforms } from '../objects/platforms';
import { Player } from '../objects/player';
import { PowerUps } from '../objects/power-ups';
import { DeathReason, GameOverPayload, PowerUpType } from '../types';
import { End } from './end';
import { ScorePlane } from './score-plane';

export class Play extends Phaser.Scene {
  static readonly KEY = 'play';
  static readonly GAME_OVER_DELAY = 3000;
  particles: Particles;
  player: Player;
  controller: Controller;
  observer: Observer;
  collisions: Collisions;
  platforms: Platforms;
  powerUps: PowerUps;
  enemies: Enemies;

  constructor() {
    super(Play.KEY);
  }

  create() {
    const { width, height } = this.sys.game.canvas;
    this.particles = new Particles(this, 0, 0);
    this.player = new Player(this, width / 1.25, height / 1.5);
    this.observer = new Observer(this, this.player);
    this.platforms = new Platforms(this, this.observer);
    this.controller = new Controller(this, this.player);
    this.powerUps = new PowerUps(this);
    this.enemies = new Enemies(this);
    this.collisions = new Collisions(
      this,
      this.player,
      this.platforms,
      this.powerUps,
      this.enemies
    );

    this.scene.launch(ScorePlane.KEY);
    this.connect();
    this.cleanup();
  }

  connect() {
    const scorePlane = this.scene.get(ScorePlane.KEY) as ScorePlane;
    this.time.delayedCall(250, () => {
      this.controller.enable();
    });

    this.platforms.on(Platforms.SPAWN_EVENT, (x: number, y: number) => {
      const luck = Phaser.Math.Between(0, 100);
      if (luck > PowerUps.SPAWN_CHANCE) return;

      this.powerUps.spawn(x, y);
    });

    this.platforms.on(Platforms.SPAWN_EVENT, (x: number, y: number) => {
      const luck = Phaser.Math.Between(0, 100);
      if (luck > Enemies.SPAWN_CHANCE) return;

      this.enemies.spawn(x, y);
    });

    this.observer.events.on(Observer.EVENT_APEX_CHANGE, (apex: number) => {
      if (apex < 0) {
        const score = Math.floor(Math.abs(apex));
        this.scene
          .get(ScorePlane.KEY)
          .events.emit(ScorePlane.EVENT_UPDATE_SCORE, score);
      }
    });

    this.player.on(Player.EVENT_DEATH, (reason: DeathReason) => {
      this.time.delayedCall(Play.GAME_OVER_DELAY, () => {
        const payload: GameOverPayload = {
          death: reason,
          score: scorePlane.score,
          powerUps: scorePlane.powerUps,
          smashed: scorePlane.smashed,
        };
        this.scene.stop(ScorePlane.KEY);
        this.scene.start(End.KEY, payload);
      });
    });

    this.player.on(Player.EVENT_POWER_UP_START, (key: PowerUpType) => {
      scorePlane.events.emit(ScorePlane.EVENT_POWER_UP, key);
    });

    this.player.on(Player.EVENT_SMASH_ENEMY, () => {
      scorePlane.events.emit(ScorePlane.EVENT_SMASH_ENEMY);
    });
  }

  update() {
    this.controller.update();
    this.observer.update();
    this.platforms.update();
    this.enemies.update();
  }

  cleanup() {
    this.events.on('shutdown', () => {
      this.observer.cleanup();
      this.platforms.off(Platforms.SPAWN_EVENT);
    });
  }
}

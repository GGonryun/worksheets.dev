import { Player } from './player';

export class Observer {
  static POWER_UP_SCREEN_OFFSET = 130;
  static DEFAULT_SCREEN_OFFSET = 90;
  static DEFAULT_STARTING_APEX = 60;
  static DEFAULT_SCREEN_INTERPOLATION = 0.05;
  static EVENT_APEX_CHANGE = 'apex-change';
  apex: number;
  scene: Phaser.Scene;
  main: Phaser.Cameras.Scene2D.Camera;
  player: Player;
  screenOffset: number;
  interpolation: number;
  events: Phaser.Events.EventEmitter;

  constructor(scene: Phaser.Scene, player: Player) {
    this.events = new Phaser.Events.EventEmitter();
    this.scene = scene;
    this.main = scene.cameras.main;
    this.player = player;
    this.apex = Observer.DEFAULT_STARTING_APEX;
    this.screenOffset = Observer.DEFAULT_SCREEN_OFFSET;
    this.interpolation = Observer.DEFAULT_SCREEN_INTERPOLATION;

    this.player.on(Player.EVENT_POWER_UP_START, () => {
      this.screenOffset = Observer.POWER_UP_SCREEN_OFFSET;
    });

    this.player.on(Player.EVENT_POWER_UP_OVER, () => {
      this.screenOffset = Observer.DEFAULT_SCREEN_OFFSET;
    });
  }

  cleanup() {
    this.player.off(Player.EVENT_POWER_UP_START);
    this.player.off(Player.EVENT_POWER_UP_OVER);
  }

  update() {
    if (this.player.y < this.apex) {
      this.apex = this.player.y;

      this.main.scrollY = Phaser.Math.Linear(
        this.main.scrollY,
        this.apex - this.screenOffset,
        this.interpolation
      );

      this.events.emit(Observer.EVENT_APEX_CHANGE, this.apex);
    }
  }
}

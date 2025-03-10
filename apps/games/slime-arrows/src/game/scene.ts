import { TypedEventEmitter } from '@worksheets/phaser/events';
import { PlayerJoystick, PlayerKeyboard } from '@worksheets/phaser/movement';
import { CharityGamesPlugin } from '@worksheets/phaser/plugins';
import { DirectionalInput, Movement } from '@worksheets/phaser/types';

import { OutlinePipelineSystem } from '../plugins/outline';
import { ElementDepth } from '../util/depth';
import { newArrowFactory } from './arrows';
import { newGameBackground } from './background';
import { BowEventEmitter, newBowFactory } from './bow';
import { newCreditsScreen, newGameOverScreen, newStartGameScreen } from './gui';
import { newScoreKeeper, ScoreEventEmitter } from './score';
import { Slime } from './slime';
import { ARROW_OBJECT_TYPE, SceneEventEmitter } from './types';

export class GameScene extends Phaser.Scene {
  static KEY = 'game';
  outline: OutlinePipelineSystem;
  cursors: DirectionalInput;
  player: Slime;
  joystick: PlayerJoystick;
  keyboard: PlayerKeyboard;
  bowFactory: ReturnType<typeof newBowFactory>;
  scoreKeeper: ReturnType<typeof newScoreKeeper>;
  startScreen: ReturnType<typeof newStartGameScreen>;
  creditsScreen: ReturnType<typeof newCreditsScreen>;
  gameOverScreen: ReturnType<typeof newGameOverScreen>;
  playing: boolean;
  sceneEvents: SceneEventEmitter;
  server: CharityGamesPlugin;

  constructor() {
    super(GameScene.KEY);
  }

  preload() {
    Slime.preload(this);
    this.server = CharityGamesPlugin.find(this);
  }

  create() {
    this.playing = false;

    this.sound.play('bgm', {
      loop: true,
      volume: 0.4,
    });

    const bowEvents: BowEventEmitter = new TypedEventEmitter();
    const scoreEvents: ScoreEventEmitter = new TypedEventEmitter();

    this.sceneEvents = new TypedEventEmitter();
    this.outline = new OutlinePipelineSystem(this);

    this.scoreKeeper = newScoreKeeper(this, scoreEvents);
    this.startScreen = newStartGameScreen(this, this.sceneEvents);
    this.creditsScreen = newCreditsScreen(this, this.sceneEvents);
    this.gameOverScreen = newGameOverScreen(this, this.sceneEvents);

    this.startScreen.show();

    newGameBackground(this);

    this.createPlayer();

    this.createControllers();

    this.bowFactory = newBowFactory(this, this.player, bowEvents);

    const arrows = this.physics.add.group({
      defaultKey: 'bow-and-arrow',
      defaultFrame: 2,
      collideWorldBounds: true,
    });
    const arrowFactory = newArrowFactory(arrows);

    bowEvents.on('fire', (options) => {
      arrowFactory.create(options);
      this.sound.play('arrow', { volume: 0.8 });
    });

    this.physics.add.overlap(
      this.player,
      arrows,
      this.handlePlayerArrowOverlap,
      undefined,
      this
    );

    this.physics.world.on(
      Phaser.Physics.Arcade.Events.WORLD_BOUNDS,
      this.handleWorldBoundsCollision,
      this
    );

    this.joystick.bus.on('movement', this.handleAct, this);
    this.keyboard.bus.on('movement', this.handleAct, this);

    this.joystick.bus.on('stop-movement', this.handleHalt, this);
    this.keyboard.bus.on('stop-movement', this.handleHalt, this);

    this.sceneEvents.on('startGame', this.handleStartGame, this);
    this.sceneEvents.on('endGame', this.handleStopGame, this);
    this.sceneEvents.on('showCredits', this.handleShowCredits, this);
    this.sceneEvents.on('hideCredits', this.handleHideCredits, this);
    this.sceneEvents.on('hideGameOver', this.handleHideGameOver, this);
  }

  handleHideGameOver() {
    this.gameOverScreen.hide();
    this.startScreen.show();
    this.joystick.enable();
    this.keyboard.enable();
    this.player.respawn();
  }

  handleShowCredits() {
    this.startScreen.hide();
    this.creditsScreen.show();
    this.joystick.disable();
    this.keyboard.disable();
  }

  handleHideCredits() {
    this.creditsScreen.hide();
    this.startScreen.show();
    this.joystick.enable();
    this.keyboard.enable();
  }

  handleStopGame() {
    this.playing = false;
    this.joystick.disable();
    this.keyboard.disable();
    this.scoreKeeper.exit();
    this.player.kill();
    this.bowFactory.stop();
    this.gameOverScreen.show();
  }

  handleStartGame() {
    this.playing = true;
    this.scoreKeeper.enter();
    this.startScreen.hide();
    this.bowFactory.start();
  }

  handlePlayerArrowOverlap() {
    this.sound.play('die', { volume: 0.5 });
    this.sceneEvents.emit('endGame');
  }

  handleWorldBoundsCollision(body: Phaser.Physics.Arcade.Body) {
    if (body.gameObject.type !== ARROW_OBJECT_TYPE) return;
    body.destroy();
    body.gameObject.destroy();
    this.sound.play('hit', { volume: 0.8 });
    this.scoreKeeper.increment(1);
  }

  handleAct(movement: Movement) {
    this.player.act(movement);

    if (this.playing) return;

    this.sceneEvents.emit('startGame');
  }

  handleHalt() {
    this.player.halt();
  }

  createPlayer() {
    this.player = new Slime(this);

    this.outline.register(this.player, new Phaser.Display.Color(255, 255, 255));
  }

  createControllers() {
    this.joystick = new PlayerJoystick(this, {
      type: 'sprite',
      size: 16,
      outer: {
        texture: 'joystick',
        frame: 4,
        alpha: 0.5,
        tintFill: 0x000000,
        scale: 2.5,
      },
      inner: { texture: 'joystick', frame: 4, scale: 2 },
    });
    this.joystick.setDepth(ElementDepth.Controls);
    this.add.existing(this.joystick);

    this.keyboard = new PlayerKeyboard(this);
    this.add.existing(this.keyboard);
  }
}

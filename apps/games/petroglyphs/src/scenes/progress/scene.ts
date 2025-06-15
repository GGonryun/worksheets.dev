import { TypedEventEmitter } from '@worksheets/phaser/events';

import { GAME_WIDTH } from '../../settings';
import { GRID_SETTINGS, SCENE_TRANSITION_SPEED } from '../combat/constants';
import { GameControllerScene } from '../game-controller/scene';
import { absorbFunction } from '../portal/portal';
import { BlurController } from '../util/blur';

type ProgressSceneOptions = {
  manager: GameControllerScene;
  target: number;
  turns: number;
};

export class ProgressScene extends Phaser.Scene {
  static Key = 'ProgressScene';
  blur: BlurController;
  score: ProgressBar;
  turns: ProgressBar;
  options: ProgressSceneOptions;

  constructor() {
    super({ key: ProgressScene.Key });
  }

  static launch({ scene }: Phaser.Scene, options: ProgressSceneOptions) {
    scene.launch(ProgressScene.Key, options);
  }

  static stop({ scene }: Phaser.Scene) {
    scene.stop(ProgressScene.Key);
  }

  create(options: ProgressSceneOptions) {
    this.cameras.main.fadeOut(0);

    this.options = options;
    this.blur = new BlurController(this);
    this.score = new ProgressBar(this, {
      required: this.options.target,
      color: 0x0072bb,
      text: 'Score Remaining',
    })
      .setPosition(GAME_WIDTH / 2 - 3, GRID_SETTINGS.y - 76)
      .setScale(0);

    this.turns = new ProgressBar(this, {
      required: this.options.turns,
      color: 0xd8829d,
      text: 'Turns Remaining',
    })
      .setPosition(GAME_WIDTH / 2 - 3, GRID_SETTINGS.y - 32)
      .setScale(0);

    this.add.existing(this.score);
    this.add.existing(this.turns);

    this.score.events.on('complete', () => {
      this.options.manager.bus.emit('stage-complete');
    });

    this.turns.events.on('complete', () => {
      this.options.manager.bus.emit('stage-complete');
    });

    this.options.manager.bus.on('increase-score', async (amount) => {
      this.score.increase(amount);
    });

    this.options.manager.bus.on('open-relic-info', () => {
      this.blur.display();
    });

    this.options.manager.bus.on('close-relic-info', () => {
      this.blur.remove();
    });

    this.options.manager.bus.on('open-spell-targeting', async () => {
      this.blur.display();
    });

    this.options.manager.bus.on('close-spell-targeting', () => {
      this.blur.remove();
    });

    this.options.manager.bus.on('stage-complete', () => {
      this.score.absorbAll();
      this.turns.absorbAll();
    });

    this.options.manager.bus.on('start-combat', () => {
      this.cameras.main.fadeIn(SCENE_TRANSITION_SPEED);
    });

    this.options.manager.bus.on('increase-turns', async (amount) => {
      this.turns.increase(amount);
    });

    this.cameras.main.on(
      Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE,
      async () => {
        this.score.regurgitate();
        this.turns.regurgitate();
      }
    );
  }
}

type ProgressBarOptions = {
  required: number;
  color: number;
  text: string;
  hideValue?: boolean;
};

export class ProgressBar extends Phaser.GameObjects.Container {
  static BackgroundSize = GRID_SETTINGS.width - 2;
  static BorderThickness = 5;
  static BarHeight = 28;

  completed: boolean;
  background: Phaser.GameObjects.Rectangle;
  bar: Phaser.GameObjects.Rectangle;
  scoreText: Phaser.GameObjects.Text;
  current: number;
  target: number;
  increment?: Phaser.Tweens.Tween;
  options: ProgressBarOptions;
  events: TypedEventEmitter<{ complete: [] }>;

  constructor(scene: Phaser.Scene, options: ProgressBarOptions) {
    super(scene);

    this.events = new TypedEventEmitter();
    this.completed = false;

    this.current = 0;
    this.target = 0;
    this.options = options;

    this.create();
  }

  private create() {
    this.createBar();
    this.createText();
  }

  createBar() {
    const size = ProgressBar.BackgroundSize + ProgressBar.BorderThickness;
    this.background = new Phaser.GameObjects.Rectangle(
      this.scene,
      0,
      0,
      size,
      ProgressBar.BarHeight + ProgressBar.BorderThickness
    );
    this.background.setFillStyle(0xffffff);
    this.background.setStrokeStyle(ProgressBar.BorderThickness, 0x000000);

    this.add(this.background);

    this.bar = new Phaser.GameObjects.Rectangle(
      this.scene,
      -ProgressBar.BackgroundSize / 2,
      0,
      ProgressBar.BackgroundSize,
      ProgressBar.BarHeight
    );
    this.bar.setOrigin(0, 0.5);
    this.bar.setFillStyle(this.options.color);

    this.add(this.bar);
  }

  createText() {
    const fontSettings = {
      fontSize: '24px',
      color: '#000000',
      fontStyle: 'bold',
      fixedWidth: ProgressBar.BackgroundSize - 6,
      stroke: '#ffffff',
      strokeThickness: 4,
    };

    const text = new Phaser.GameObjects.Text(
      this.scene,
      0,
      0,
      this.options.text,
      {
        ...fontSettings,
        align: 'left',
      }
    ).setOrigin(0.5, 0.5);
    this.add(text);

    this.scoreText = new Phaser.GameObjects.Text(
      this.scene,
      0,
      0,
      this.getScoreText(),
      {
        ...fontSettings,
        align: 'right',
      }
    );
    this.scoreText.setOrigin(0.5, 0.5);
    this.add(this.scoreText);

    if (this.options.hideValue) {
      this.scoreText.setVisible(false);
    }
  }

  getScoreText() {
    return `${Math.max(0, this.options.required - this.current)}`;
  }

  updateBar(value: number, max: number) {
    this.scoreText.setText(this.getScoreText());
    const percent = Math.max(0, Math.min(1, value / max));
    const width = percent * ProgressBar.BackgroundSize;
    this.bar.setSize(width, ProgressBar.BarHeight);
  }

  increase(amount: number) {
    this.target += amount;

    if (this.increment) {
      this.increment.stop();
      this.increment = undefined;
    }

    this.increment = this.scene.tweens.addCounter({
      from: this.current,
      to: this.target,
      duration: Math.min(2000, Math.abs(this.target - this.current) * 50),

      onUpdate: (tween) => {
        this.current = Math.floor(tween.getValue());
        this.updateBar(
          this.options.required - this.current,
          this.options.required
        );
      },
      onComplete: () => {
        if (this.current >= this.options.required && !this.completed) {
          this.completed = true;
          this.events.emit('complete');
        }
      },
    });
  }

  absorbAll() {
    absorbFunction(this.scene, {
      object: this,
      offset: { x: 0, y: 0 },
      delayModifier: 3,
    });
  }
  regurgitate() {
    absorbFunction(this.scene, {
      object: this,
      offset: { x: 0, y: 0 },
      delayModifier: 0,
      durationOffset: 1000,
      reversed: true,
      objectScale: 1,
    });
  }
}

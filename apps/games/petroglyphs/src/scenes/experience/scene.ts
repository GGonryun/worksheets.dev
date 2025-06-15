import { GAME_WIDTH } from '../../settings';
import { GRID_SETTINGS, SCENE_TRANSITION_SPEED } from '../combat/constants';
import { GameControllerScene } from '../game-controller/scene';
import { BlurController } from '../util/blur';
import { LEVEL_PROGRESSION, UPGRADE_PROGRESSION } from './data';
import { ExperienceBar } from './experience-bar';

type ExperienceSceneOptions = {
  manager: GameControllerScene;
};

export class ExperienceScene extends Phaser.Scene {
  static Key = 'ExperienceScene';
  experience: ExperienceBar;
  levelUpBar: ExperienceBar;
  upgrades: ExperienceBar;
  blur: BlurController;
  options: ExperienceSceneOptions;
  constructor() {
    super({ key: ExperienceScene.Key });
  }
  static launch({ scene }: Phaser.Scene, options: ExperienceSceneOptions) {
    scene.launch(ExperienceScene.Key, options);
  }

  static stop({ scene }: Phaser.Scene) {
    scene.stop(ExperienceScene.Key);
  }

  static isActive({ scene }: Phaser.Scene) {
    return scene.isActive(ExperienceScene.Key);
  }

  create(options: ExperienceSceneOptions) {
    this.options = options;

    this.experience = new ExperienceBar(this, LEVEL_PROGRESSION);
    this.experience.setScale(0);
    this.experience.setPosition(
      GAME_WIDTH / 2,
      GRID_SETTINGS.y + GRID_SETTINGS.height + 27
    );
    this.add.existing(this.experience);

    this.upgrades = new ExperienceBar(this, UPGRADE_PROGRESSION).setVisible(
      false
    );
    this.upgrades.setPosition(
      GAME_WIDTH / 2,
      GRID_SETTINGS.y + GRID_SETTINGS.height + 68
    );
    this.add.existing(this.upgrades);

    this.levelUpBar = new ExperienceBar(this, LEVEL_PROGRESSION).setVisible(
      false
    );
    this.levelUpBar.setPosition(
      GAME_WIDTH / 2,
      GRID_SETTINGS.y + GRID_SETTINGS.height + 27
    );
    this.add.existing(this.levelUpBar);

    this.blur = new BlurController(this);

    this.levelUpBar.events.on('animation-complete', () => {
      this.options.manager.bus.emit('level-up-animation-complete');
    });

    this.upgrades.events.on('level-up', () => {
      this.options.manager.bus.emit('spawn-bonus-relic');
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

    this.experience.events.on('level-up', (level: number) => {
      this.options.manager.bus.emit('trigger-level-up', level);
    });

    this.options.manager.bus.on('start-level-up', async () => {
      this.levelUpBar.showLevelUp();
      this.levelUpBar.setVisible(true);
    });

    this.options.manager.bus.on('close-relic-selection', () => {
      this.levelUpBar.clearLevelUp();
      this.levelUpBar.setVisible(false);
    });

    this.options.manager.bus.on('add-experience', (amount) => {
      this.experience.addExperience(amount);
      this.upgrades.addExperience(amount);
    });

    this.options.manager.bus.on('stage-complete', () => {
      this.experience.absorbAll();
    });

    this.options.manager.bus.on('start-combat', () => {
      this.cameras.main.fadeIn(SCENE_TRANSITION_SPEED);
    });

    this.cameras.main.on(
      Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE,
      async () => {
        this.experience.regurgitate();
      }
    );

    this.cameras.main.fadeOut(0);
  }
}

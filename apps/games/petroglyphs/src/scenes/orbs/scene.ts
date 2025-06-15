import { GameControllerScene } from '../game-controller/scene';
import { BlurController } from '../util/blur';
import { Orbs } from './orbs';

type OrbSceneOptions = {
  manager: GameControllerScene;
};
export class OrbScene extends Phaser.Scene {
  static Key = 'OrbScene';
  blur: BlurController;
  options: OrbSceneOptions;
  orbs: Orbs;
  constructor() {
    super({
      key: OrbScene.Key,
    });
  }

  static get(manager: Phaser.Scene): OrbScene {
    return manager.scene.get(OrbScene.Key) as OrbScene;
  }

  static launch(scene: Phaser.Scene, options: OrbSceneOptions) {
    scene.scene.launch(OrbScene.Key, options);
  }

  static stop(scene: Phaser.Scene) {
    scene.scene.stop(OrbScene.Key);
  }

  create(options: OrbSceneOptions) {
    this.options = options;

    this.blur = new BlurController(this);

    this.orbs = new Orbs(this);
    this.add.existing(this.orbs);

    this.options.manager.bus.on('open-relic-info', () => {
      this.blur.display();
    });

    this.options.manager.bus.on('close-relic-info', () => {
      this.blur.remove();
    });

    this.options.manager.bus.on('summon-orb', ({ orb, point }) => {
      this.orbs.orb({ type: orb, point });
    });

    this.orbs.events.on('orbs-absorbed', (orbs) => {
      this.options.manager.report.track({ type: 'orbs-collected', orbs });
    });

    this.orbs.events.on('send-mana', async ({ orb, amount }) => {
      this.options.manager.bus.emit(
        'increase-score',
        amount * this.options.manager.stats.computeScore(orb)
      );
    });
  }
}

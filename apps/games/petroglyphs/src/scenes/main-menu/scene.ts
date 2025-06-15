import { TypedEventEmitter } from '@worksheets/phaser/events';
import { CharityGamesPlugin } from '@worksheets/phaser/plugins';
import { waitFor } from '@worksheets/util/time';

import { GAME_HEIGHT, GAME_WIDTH } from '../../settings';
import { CollectionScene } from '../collection/scene';
import { ElementDepths } from '../combat/constants';
import { GameControllerScene } from '../game-controller/scene';
import { absorbFunction, PortalController } from '../portal/portal';
import { BasicRelicModalInfo, RelicInfoModalScene } from '../relic-info/scene';
import { RelicKey } from '../relics/types';
import { RegistryKey } from '../util/_unsorted';
import { BlurController } from '../util/blur';
import { CreditsText } from './credits-text';
import { StartText } from './start-text';
import { TitleText } from './title-text';

export class MainMenuScene extends Phaser.Scene {
  static Key = 'MainMenuScene';
  server: CharityGamesPlugin;
  portal: PortalController;
  credits: CreditsText;
  relics: RelicsButton;
  charityGames: CharityGamesButton;
  starting: boolean;
  viewingCollection: boolean;
  blur: BlurController;
  highScore: HighScoreText;
  bus: TypedEventEmitter<{
    start: [];
    'show-collection': [];
    'hide-collection': [];
    'close-relic-info': [];
    'open-relic-info': [BasicRelicModalInfo];
  }>;

  constructor() {
    super(MainMenuScene.Key);
  }

  static start({ scene }: Phaser.Scene) {
    scene.start(MainMenuScene.Key);
  }

  init() {
    this.bus = new TypedEventEmitter();
  }

  create() {
    this.server = CharityGamesPlugin.find(this);
    this.starting = false;
    this.blur = new BlurController(this);
    const seen = this.server.storage.get<RelicKey[]>(
      RegistryKey.RELICS_SEEN,
      []
    );

    this.createBackground();
    this.createPortal();
    const title = new TitleText(this, this.portal)
      .setDepth(ElementDepths.MAX)
      .setScale(0.85);
    const start = new StartText(this, this.portal).setDepth(ElementDepths.MAX);

    this.credits = new CreditsText(
      this,
      GAME_WIDTH / 2,
      GAME_HEIGHT - 50,
      this.portal
    );
    this.add.existing(this.credits);

    this.relics = new RelicsButton(this, {
      x: GAME_WIDTH - 64,
      y: GAME_HEIGHT - 64,
      hasNew: false,
      manager: this,
    }).setDepth(ElementDepths.CARD);
    this.add.existing(this.relics);

    this.charityGames = new CharityGamesButton(
      this,
      64,
      GAME_HEIGHT - 64
    ).setDepth(ElementDepths.CARD);
    this.add.existing(this.charityGames);

    this.highScore = new HighScoreText(this);
    this.add.existing(this.highScore);

    start.bus.on('start', async () => {
      if (this.viewingCollection) return;
      if (this.starting) return;
      this.starting = true;
      this.bus.emit('start');
    });

    this.bus.on('show-collection', () => {
      if (this.starting) return;
      if (this.viewingCollection) return;

      this.viewingCollection = true;
      this.blur.display();
      CollectionScene.launch(this, {
        manager: this,
        seen,
      });
    });

    this.bus.on('hide-collection', () => {
      this.viewingCollection = false;
      this.blur.remove();
      CollectionScene.stop(this);
    });

    this.bus.on('start', async () => {
      await start.startGame();
      await waitFor(750);
      await Promise.all([
        waitFor(750),
        title.absorb(),
        this.portal.consume(),
        this.credits.absorb(),
        this.relics.absorb(),
        this.charityGames.absorb(),
        this.highScore.absorb(),
      ]);
      GameControllerScene.start(this);
    });

    this.bus.on('open-relic-info', (data) => {
      RelicInfoModalScene.launch(this, {
        bus: this.bus,
        ...data,
      });
      this.scene.bringToTop(RelicInfoModalScene.key);
    });

    this.bus.on('close-relic-info', () => {
      RelicInfoModalScene.stop(this);
    });
  }

  createBackground() {
    const background = this.add.image(0, 0, 'game-background');
    background.setScale(1);
    background.setOrigin(0, 0);
    background.setDepth(ElementDepths.BACKGROUND);
  }

  createPortal() {
    const point = {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,
    };
    this.portal = new PortalController(this, point, 3);
    this.add.existing(this.portal);
    this.portal.setPosition(0, 0);
  }

  createPointer() {
    const pointer = this.add
      .sprite(this.portal.point.x, this.portal.point.y + 300, 'icons-point-up')
      .setDepth(1000);

    this.tweens.add({
      targets: pointer,
      y: '-=32',
      duration: 500,
      ease: Phaser.Math.Easing.Cubic.InOut,
      yoyo: true,
      repeat: -1,
    });
  }

  update(time: number) {
    this.portal.onUpdate(time);
  }
}

type RelicsButtonOptions = {
  x: number;
  y: number;
  hasNew: boolean;
  manager: MainMenuScene;
};

class RelicsButton extends Phaser.GameObjects.Container {
  chest: Phaser.GameObjects.Sprite;
  newIcon: Phaser.GameObjects.Sprite;
  options: RelicsButtonOptions;

  constructor(scene: Phaser.Scene, options: RelicsButtonOptions) {
    const { x, y, hasNew } = options;
    super(scene, x, y);

    this.options = options;

    this.chest = new Phaser.GameObjects.Sprite(scene, 0, 0, 'icons-chest');
    this.add(this.chest);

    this.newIcon = new Phaser.GameObjects.Sprite(scene, -48, -48, 'icons-new')
      .setScale(0.6)
      .setAlpha(0);
    this.add(this.newIcon);

    this.setScale(0.75);

    this.chest
      .setInteractive()
      .on(
        'pointerdown',
        (_pointer: unknown, _x: number, _y: number, event: PointerEvent) => {
          event.stopPropagation();
          this.options.manager.bus.emit('show-collection');
        }
      );

    if (hasNew) {
      this.showNewIcon();
    }
  }

  showNewIcon() {
    this.scene.tweens.add({
      targets: this.newIcon,
      scaleX: 0.65,
      scaleY: 0.65,
      duration: 500,
      ease: Phaser.Math.Easing.Cubic.InOut,
      yoyo: true,
      repeat: -1,
      onStart: () => {
        this.newIcon.setAlpha(1);
      },
    });
    this.scene.tweens.add({
      targets: this.chest,
      angle: { from: -3, to: 3 },
      duration: 300,
      ease: Phaser.Math.Easing.Cubic.InOut,
      yoyo: true,
      repeat: -1,
    });
  }

  absorb() {
    absorbFunction(this.scene, {
      object: this,
      point: this.options.manager.portal.point,
    });
  }
}

class CharityGamesButton extends Phaser.GameObjects.Container {
  manager: MainMenuScene;
  constructor(scene: MainMenuScene, x: number, y: number) {
    super(scene, x, y);
    this.manager = scene;
    const button = new Phaser.GameObjects.Sprite(
      scene,
      0,
      0,
      'charity-games'
    ).setScale(0.8);
    this.add(button);

    button.setInteractive().on('pointerdown', () => {
      window.open('https://charity.games', '_blank');
    });
  }

  absorb() {
    absorbFunction(this.scene, {
      object: this,
      point: this.manager.portal.point,
    });
  }
}

class HighScoreText extends Phaser.GameObjects.Text {
  manager: MainMenuScene;
  constructor(scene: MainMenuScene) {
    super(scene, 0, 400, '', {
      fontSize: '32px',
      fixedWidth: GAME_WIDTH,
      align: 'center',
      color: '#000',
    });
    this.manager = scene;

    this.setDepth(ElementDepths.MAX);
    const highScore = this.manager.server.storage.get<number>(
      RegistryKey.HIGH_SCORE,
      0
    );
    this.setText(`High Score: ${highScore}`);
  }
  absorb() {
    absorbFunction(this.scene, {
      object: this,
      point: this.manager.portal.point,
    });
  }
}

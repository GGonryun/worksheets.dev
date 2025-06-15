import { Point } from '@worksheets/phaser/types';
import { keysOf } from '@worksheets/util/objects';
import { groupBy } from 'lodash';

import { GAME_HEIGHT, GAME_WIDTH } from '../../settings';
import { MainMenuScene } from '../main-menu/scene';
import { RELIC_EFFECTS, RELICS } from '../relics/data';
import { RelicKey } from '../relics/types';
import { BlurController } from '../util/blur';

export type CollectionSceneOptions = {
  manager: MainMenuScene;
  seen: RelicKey[];
};

export class CollectionScene extends Phaser.Scene {
  static Key = 'CollectionScene';
  options: CollectionSceneOptions;
  back: Phaser.GameObjects.Sprite;
  blur: BlurController;

  constructor() {
    super(CollectionScene.Key);
  }

  static launch({ scene }: Phaser.Scene, options: CollectionSceneOptions) {
    scene.launch(CollectionScene.Key, options);
  }

  static stop({ scene }: Phaser.Scene) {
    scene.stop(CollectionScene.Key);
  }

  create(options: CollectionSceneOptions) {
    this.options = options;
    this.blur = new BlurController(this);
    const collection = new RelicCollection(this, {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,
      ...this.options,
    });
    this.add.existing(collection);

    this.back = this.add
      .sprite(80, 72, 'icons-back')
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.options.manager.bus.emit('hide-collection');
      });

    this.add
      .text(
        GAME_WIDTH / 2 + 32,
        72,
        `Relics (${this.options.seen.length}/${Object.keys(RELICS).length})`,
        {
          fontSize: '42px',
          stroke: '#000000',
          strokeThickness: 8,
          color: '#ffffff',
          fontStyle: 'bold',
          align: 'center',
        }
      )
      .setOrigin(0.5, 0.5);

    this.options.manager.bus.on('open-relic-info', () => {
      this.blur.display();
    });

    this.options.manager.bus.on('close-relic-info', () => {
      this.blur.remove();
    });
  }
}

type RelicCollectionOptions = Point & CollectionSceneOptions;

class RelicCollection extends Phaser.GameObjects.Container {
  background: Phaser.GameObjects.Rectangle;
  options: RelicCollectionOptions;

  constructor(scene: Phaser.Scene, options: RelicCollectionOptions) {
    const { x, y, ...rest } = options;
    super(scene, x, y);

    this.options = options;

    const height = GAME_HEIGHT - 256;
    const width = GAME_WIDTH - 128;

    this.background = new Phaser.GameObjects.Rectangle(
      this.scene,
      0,
      0,
      width,
      height,
      0xe6f8d1
    ).setStrokeStyle(6, 0x738772);

    this.add(this.background);

    const relics = new RelicsContainer(this.scene, {
      ...rest,
      x: -192,
      y: height / -2 + 100,
    });
    this.add(relics);
    const maskRect = new Phaser.GameObjects.Rectangle(
      this.scene,
      0,
      132,
      width + 64,
      height - 8,
      0x000000,
      0
    ).setOrigin(0, 0);
    this.add(maskRect);

    const mask = maskRect.createGeometryMask();
    relics.setMask(mask);
  }
}

export type RelicsContainerOptions = Point & CollectionSceneOptions;
class RelicsContainer extends Phaser.GameObjects.Container {
  options: RelicsContainerOptions;
  constructor(scene: Phaser.Scene, options: RelicsContainerOptions) {
    const { x, y, ...rest } = options;
    super(scene, x, y);
    this.options = options;

    const groups = groupBy(keysOf(RELICS), (key) =>
      // seen or not
      this.options.seen.includes(key) ? 'seen' : 'unseen'
    );
    const keys = [
      ...(groups.seen || []).sort(),
      ...(groups.unseen || []).sort(),
    ];

    keys.forEach((key, i) => {
      const relic = new CollectionRelic(this.scene, {
        ...rest,
        x: (i % 3) * 192,
        y: Math.floor(i / 3) * 180,
        key,
      });
      this.add(relic);
    });

    const height = Math.ceil(keys.length / 4) * 180;

    this.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(0, 0, 576, height * 2),
      draggable: true,
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
    });

    this.on(
      Phaser.Input.Events.DRAG,
      (pointer: Phaser.Input.Pointer, _dragX: number, dragY: number) => {
        this.y += pointer.velocity.y / 2;
        this.y = Phaser.Math.Clamp(dragY, -height * 1.1, -400);
      }
    );
  }
}

type CollectionRelicOptions = Point & {
  key: RelicKey;
} & CollectionSceneOptions;

class CollectionRelic extends Phaser.GameObjects.Container {
  sprite: Phaser.GameObjects.Sprite;
  text: Phaser.GameObjects.Text;
  options: CollectionRelicOptions;

  constructor(scene: Phaser.Scene, options: CollectionRelicOptions) {
    const { x, y, key } = options;

    super(scene, x, y);
    this.options = options;

    const relic = RELICS[key];

    this.text = new Phaser.GameObjects.Text(this.scene, 0, 64, relic.name, {
      fontSize: relic.name.length > 10 ? '14px' : '18px',
      stroke: '#000000',
      strokeThickness: 6,
      color: '#ffffff',
      fontStyle: 'bold',
      align: 'center',
    }).setOrigin(0.5, 0);
    this.add(this.text);

    this.sprite = new Phaser.GameObjects.Sprite(
      this.scene,
      0,
      0,
      relic.sprite
    ).setScale(0.75);
    this.add(this.sprite);

    if (this.options.seen.includes(key)) {
      this.sprite.clearTint();
      this.sprite.setInteractive();
      this.sprite.on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.options.manager.bus.emit('open-relic-info', {
          info: relic,
          level: 0,
          effect: RELIC_EFFECTS[key][0],
        });
      });
    } else {
      this.sprite.setTintFill(0x000000);
      this.text.setText('???');
    }
  }
}

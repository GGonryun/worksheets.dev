import { Point } from '@worksheets/phaser/types';

import { PixelTypography } from '../objects/typography';
import { SLATE_COLOR } from '../settings/colors';
import { MENU_ORIGIN } from '../settings/data';
import { CharactersScene } from './characters';

export class CreditsScene extends Phaser.Scene {
  static Key = 'CreditsScene';
  constructor() {
    super({
      key: CreditsScene.Key,
    });
  }

  create() {
    this.add.existing(new Menu(this, MENU_ORIGIN));
  }
}

class Menu extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, point: Point) {
    super(scene, point.x, point.y);
    this.add(new Background(scene, { x: 0, y: 0 }));
    this.add(new Back(scene, { x: 0, y: 48 }));
    this.add(new Title(scene, { x: 0, y: -48 }));
    this.add(new Credits(scene, { x: 0, y: -24 }));
  }
}

class Background extends Phaser.GameObjects.Rectangle {
  constructor(scene: Phaser.Scene, point: Point) {
    super(scene, point.x, point.y, 96, 120, SLATE_COLOR.color, 0.9);
    this.setOrigin(0.5);
  }
}

class Back extends PixelTypography {
  constructor(scene: Phaser.Scene, point: Point) {
    super(scene, {
      ...point,
      text: 'BACK',
      onClick: () => {
        scene.scene.launch(CharactersScene.Key);
        scene.scene.stop(CreditsScene.Key);
        scene.sound.play('audio-click');
      },
    });
  }
}

class Title extends PixelTypography {
  constructor(scene: Phaser.Scene, point: Point) {
    super(scene, {
      ...point,
      text: 'CREDITS',
    });
  }
}

class Credits extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, point: Point) {
    super(scene, point.x, point.y);
    const links = [
      ['aModestDuck', 'https://modestduck.itch.io/'],
      ['managore', 'https://managore.itch.io/m5x7'],
      ['grafxkid', 'https://grafxkid.itch.io/mini-pixel-pack-2'],
      [
        'greenhaven',
        'https://greenhavensoftware.itch.io/card-games-and-more-node-icons-for-godot',
      ],
      ['lmglolo', 'https://lmglolo.itch.io/free-car-sfx'],
    ];
    links.forEach(([name, url], i) => {
      this.add(
        new PixelTypography(scene, {
          x: 0,
          y: i * 12,
          text: name,
          url,
          color: 'sky-blue',
        })
      );
    });
  }
}

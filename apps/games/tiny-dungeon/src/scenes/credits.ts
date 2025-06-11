import { newLinkText, newSupportingSceneText } from '../objects/text';
import { GAME_WIDTH } from '../settings/game';

export class CreditsScene extends Phaser.Scene {
  static Key = 'CreditsScene';
  constructor() {
    super({
      key: CreditsScene.Key,
    });
  }

  create() {
    newSupportingSceneText(this, {
      title: 'Credits',
      key: CreditsScene.Key,
    });

    [
      ['aModestDuck', 'https://modestduck.itch.io/'],
      ['Jeje8', 'https://jeje8.itch.io/minipixel-tilesets-and-characters'],
      ['OZU', ' https://osmanfrat.itch.io/coin'],
      ['prokushev', 'https://martcarrefour.itch.io/boxel'],
      ['Redreeh', 'https://redreeh.itch.io/pixelhearts-8x8'],
      ['andidebob', 'https://andidebob.itch.io/tiny-buttons'],
      ['Jsfxr', 'https://pro.sfxr.me/'],
    ].map(([name, href], i) =>
      newLinkText(this, {
        x: GAME_WIDTH / 2,
        y: 32 + 14 * (i + 1),
        text: name,
        href,
        size: 'small',
        fixedWidth: 128,
      })
    );
  }
}

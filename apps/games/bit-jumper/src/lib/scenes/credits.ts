import { VERSION } from '../data';
import { BackIcon } from '../objects/ui/icons';
import { Link } from '../objects/ui/link';
import { Typography } from '../objects/ui/typography';
import { Menu } from './menu';

export class Credits extends Phaser.Scene {
  static readonly KEY = 'credits';
  constructor() {
    super(Credits.KEY);
  }

  create() {
    new BackIcon(this, 2, 2).on('click', () => {
      this.scene.start(Menu.KEY);
    });
    new Typography(this, 45, 20, 'CREDITS');
    // draw a line under the title
    this.add.rectangle(45, 25, 60, 1, 0xffffff);

    new Typography(this, 45, 40, 'CODE:');
    new Link(this, 45, 50, 'ModestDuck', 'https://modestduck.itch.io');

    new Typography(this, 45, 70, 'ART:');
    new Link(this, 45, 80, 'i-am-44', 'https://i-am-44.itch.io/');
    new Link(this, 45, 90, 'Polyducks', 'https://polyducks.itch.io/');

    new Typography(this, 45, 110, 'MUSIC:').setFontSize(8);
    new Link(this, 45, 120, 'ColorAlpha', 'https://coloralpha.itch.io/');

    new Typography(this, 45, 150, VERSION);
  }
}

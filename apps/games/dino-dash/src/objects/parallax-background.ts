import { Game } from '../scenes/game';

export class ParallaxBackground {
  game: Game;
  farBackground: FarBackground;
  nearBackground: NearBackground;
  closeBackground: CloseBackground;
  constructor(game: Game) {
    this.game = game;
    this.farBackground = new FarBackground(this.game);
    this.nearBackground = new NearBackground(this.game);
    this.closeBackground = new CloseBackground(this.game);
  }

  update() {
    this.farBackground.update();
    this.nearBackground.update();
    this.closeBackground.update();
  }
}

class FarBackground extends Phaser.GameObjects.TileSprite {
  constructor(game: Game) {
    super(game, 0, 0, game.width, 160, 'bg_1');
    this.scene.add.existing(this);
    this.setOrigin(0, 0);
    this.setScrollFactor(0, 1);
  }

  update() {
    this.tilePositionX += 0.3;
  }
}

class NearBackground extends Phaser.GameObjects.TileSprite {
  constructor(game: Game) {
    super(game, 0, 0, game.width, 96, 'bg_2');
    this.scene.add.existing(this);
    this.setOrigin(0, -0.685);
  }

  update() {
    this.tilePositionX += 0.5;
  }
}

class CloseBackground extends Phaser.GameObjects.TileSprite {
  constructor(game: Game) {
    super(game, 0, 0, game.width, 96, 'bg_3');
    this.scene.add.existing(this);
    this.setOrigin(0, -0.83);
    this.setScrollFactor(0, 1);
  }

  update() {
    this.tilePositionX += 0.7;
  }
}

import { NonPlayerCharacter } from '../objects/non-player-character';

export class UserInterface extends Phaser.Scene {
  static eventPlayerFound = 'player:found';
  static eventPlayerNotFound = 'player:not-found';
  gameScene!: Phaser.Scene;
  find!: FindButton;
  errors!: ErrorsButton;
  timer!: TimerButton;

  controller?: CameraController;
  constructor() {
    super('user-interface');
  }

  create() {
    this.gameScene = this.scene.get('game');
    this.createEvents(this.gameScene);

    this.controller = new CameraController(this, this.gameScene);
    this.find = new FindButton(this, -2, 194);
    this.errors = new ErrorsButton(this, 272, 24);
    this.timer = new TimerButton(this, -2, 24);
  }

  createEvents(game: Phaser.Scene) {
    this.events.on('game:over', () => {
      game.events.emit('game:over', {
        remaining: this.timer.remainingTime,
        errors: this.errors.num,
        found: this.find.getFound(),
      });
    });
    this.events.once('shutdown', () => {
      this.events.off('game:over');
      game.events.off(UserInterface.eventPlayerFound);
      game.events.off(UserInterface.eventPlayerNotFound);
    });
    game.events.on(UserInterface.eventPlayerFound, (code: string) => {
      this.find.playerFound(code);
    });
    game.events.on(UserInterface.eventPlayerNotFound, () => {
      this.errors.increment();
    });
  }

  update(time: number, delta: number) {
    this.controller?.update(time, delta);
  }
}

class TimerButton extends Phaser.GameObjects.Container {
  remainingTime = 60;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    const button = scene.add
      .sprite(0, 0, 'button_grey_long')
      .setOrigin(0)
      .setScale(1, 1);

    this.add(button);

    const timer = scene.add
      .bitmapText(21, 7, 'thick', '0:60', 10)
      .setOrigin(0)
      .setLetterSpacing(0)
      .setDropShadow(1, 1, 0x000, 1)
      .setTintFill(0xf9c22b);
    this.add(timer);

    scene.time.addEvent({
      // decrease time every second
      delay: 1000,
      callback: () => {
        this.remainingTime = this.remainingTime - 1;

        if (this.remainingTime === 0) {
          timer.setText('0:00');
          scene.events.emit('game:over');
          return;
        }

        const seconds = this.remainingTime % 60;
        const minutes = Math.floor(this.remainingTime / 60);
        if (seconds === 0) {
          timer.setText(`${minutes - 1}:59`);
        } else {
          const padded = String(seconds - 1).padStart(2, '0');
          timer.setText(`${minutes}:${padded}`);
        }
      },
      loop: true,
    });

    this.add(scene.add.sprite(4, 6, 'siren').setOrigin(0));

    scene.add.existing(this);
  }
}

class FindButton extends Phaser.GameObjects.Container {
  panel: FindPanel;
  num = 0;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    let open = false;
    const openX = 100;
    const initialX = x;
    const button = scene.add
      .sprite(-6, 0, 'button_blue_long')
      .setOrigin(0)
      .setScale(1.1, 1)
      .setInteractive()
      .on('pointerdown', () => {
        button.setTint(0x888888);
        //slide out to the right to show panel
        if (open)
          scene.tweens.add({
            targets: this,
            x: initialX,
            duration: 150,
            ease: 'Elastic.Out',
            onComplete: () => {
              open = false;
              button.clearTint();
            },
          });
        else
          scene.tweens.add({
            targets: this,
            x: openX,
            duration: 150,
            ease: 'Elastic.In',

            onComplete: () => {
              open = true;
              button.clearTint();
            },
          });
      });
    this.add(button);

    this.add(scene.add.sprite(6, 5, 'tasks').setOrigin(0));

    this.add(
      scene.add
        .bitmapText(20, 7, 'thick', 'FIND', 10)
        .setOrigin(0)
        .setLetterSpacing(0)
        .setDropShadow(1, 1, 0x000, 1)
        .setTintFill(0xf9c22b)
    );

    this.panel = new FindPanel(scene, -104, -145);
    this.add(this.panel);

    scene.add.existing(this);
  }

  playerFound(code: string) {
    this.panel.players[code].found();
    if (this.getFound().length === 3) this.scene.events.emit('game:over');
  }

  getFound() {
    const found: string[] = [];
    for (const code in this.panel.players) {
      if (this.panel.players[code].isFound) {
        found.push(code);
      }
    }
    return found;
  }
}

class FindPanel extends Phaser.GameObjects.Container {
  players: Record<string, FindPlayerPanelItem>;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    const players = scene.registry.get('targets');
    const panel = scene.add.sprite(0, 0, 'panel_blue').setOrigin(0).setScale(1);
    const player1 = new FindPlayerPanelItem(scene, 30, 30, players[0]);
    const player2 = new FindPlayerPanelItem(scene, 30, 82, players[1]);
    const player3 = new FindPlayerPanelItem(scene, 30, 134, players[2]);

    this.add(panel);
    this.add(player1);
    this.add(player2);
    this.add(player3);

    this.players = {
      [players[0]]: player1,
      [players[1]]: player2,
      [players[2]]: player3,
    };
  }
}

class ErrorsButton extends Phaser.GameObjects.Container {
  ui: UserInterface;
  errors: Phaser.GameObjects.Sprite[];
  num = 0;
  constructor(ui: UserInterface, x: number, y: number) {
    super(ui, x, y);
    this.ui = ui;

    const button = ui.add
      .sprite(0, 0, 'button_grey_long')
      .setOrigin(0)
      .setScale(1, 1);

    this.add(button);

    const error1 = ui.add
      .sprite(4, 6, 'cross')
      .setOrigin(0)
      .setTintFill(0x000000);
    const error2 = ui.add
      .sprite(19, 6, 'cross')
      .setOrigin(0)
      .setTintFill(0x000000);
    const error3 = ui.add
      .sprite(34, 6, 'cross')
      .setOrigin(0)
      .setTintFill(0x000000);

    this.add(error1);
    this.add(error2);
    this.add(error3);

    this.errors = [error1, error2, error3];
    ui.add.existing(this);
  }

  increment() {
    this.errors[this.num].clearTint();
    this.num++;

    if (this.num >= 3) {
      this.ui.events.emit('game:over');
    }
  }
}

class FindPlayerPanelItem extends Phaser.GameObjects.Container {
  isFound = false;
  frame: Phaser.GameObjects.Sprite;
  status: Phaser.GameObjects.Sprite;
  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string) {
    super(scene, x, y);
    this.isFound = false;

    const frame = scene.add.sprite(0, 0, 'frame_white').setScale(2);

    const player = scene.add
      .sprite(0, 2, NonPlayerCharacter.image(sprite))
      .setScale(2);
    const status = scene.add.sprite(46, 0, 'cross').setScale(2);

    this.add(frame);
    this.add(player);
    this.add(status);

    this.frame = frame;
    this.status = status;
  }

  found() {
    this.frame.setTexture('frame_white_golden');
    this.status.setTexture('check');
    this.isFound = true;
  }
}

class CameraController extends Phaser.GameObjects.Container {
  speed = 0.1;
  detector: BoundaryDetector;
  game: Phaser.Cameras.Scene2D.Camera;
  up: CameraButton;
  down: CameraButton;
  left: CameraButton;
  right: CameraButton;
  constructor(scene: Phaser.Scene, game: Phaser.Scene) {
    super(scene, 0, 0);
    const { height, width } = scene.cameras.main;
    this.game = game.cameras.main;
    const bounds = this.game.getBounds();
    const offset = 16;

    this.detector = new BoundaryDetector(this.game, {
      height: bounds.height - height,
      width: bounds.width - width,
    });

    this.up = new CameraButton(scene, width / 2, offset, 'arrow_up');
    this.down = new CameraButton(
      scene,
      width / 2,
      height - offset,
      'arrow_down'
    );
    this.left = new CameraButton(scene, offset, height / 2, 'arrow_left');
    this.right = new CameraButton(
      scene,
      width - offset,
      height / 2,
      'arrow_right'
    );

    scene.add.existing(this);
    this.setupDetector();
    this.setupButtons();
  }

  setupDetector() {
    this.detector.onTop = () => {
      this.up.disable();
    };

    this.detector.offTop = () => {
      this.up.enable();
    };

    this.detector.onBottom = () => {
      this.down.disable();
    };

    this.detector.offBottom = () => {
      this.down.enable();
    };

    this.detector.onLeft = () => {
      this.left.disable();
    };

    this.detector.offLeft = () => {
      this.left.enable();
    };

    this.detector.onRight = () => {
      this.right.disable();
    };

    this.detector.offRight = () => {
      this.right.enable();
    };
  }

  setupButtons() {
    this.up.onDown = (delta) => {
      this.game.scrollY -= 0.1 * delta;
    };
    this.down.onDown = (delta) => {
      this.game.scrollY += 0.1 * delta;
    };
    this.left.onDown = (delta) => {
      this.game.scrollX -= 0.1 * delta;
    };
    this.right.onDown = (delta) => {
      this.game.scrollX += 0.1 * delta;
    };

    this.add(this.up);
    this.add(this.down);
    this.add(this.left);
    this.add(this.right);
  }

  update(time: number, delta: number) {
    this.detector.update();
    this.list.forEach((child) => {
      if (child instanceof CameraButton) {
        child.update(time, delta);
      }
    });
  }
}

class CameraButton extends Phaser.GameObjects.Sprite {
  onDown?: (delta: number) => void;
  isDown: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.isDown = false;
    this.setScale(2);
    this.setOrigin(0.5);
    this.setInteractive();
    this.on('pointerdown', () => {
      this.isDown = true;
    });
    this.on('pointerup', () => {
      this.isDown = false;
    });
    this.on('pointerout', () => {
      this.isDown = false;
    });
  }

  disable() {
    this.removeInteractive();
    this.setVisible(false);
    this.isDown = false;
  }

  enable() {
    this.setInteractive();
    this.setVisible(true);
    this.isDown = false;
  }

  update(_: number, delta: number) {
    if (this.isDown && this.onDown) {
      this.onDown(delta);
    }
  }
}

class BoundaryDetector {
  onLeft?: () => void;
  offLeft?: () => void;
  onRight?: () => void;
  offRight?: () => void;
  onTop?: () => void;
  offTop?: () => void;
  onBottom?: () => void;
  offBottom?: () => void;

  isLeft = false;
  isRight = false;
  isTop = false;
  isBottom = false;

  constructor(
    private scene: Phaser.Cameras.Scene2D.Camera,
    private bounds: { height: number; width: number }
  ) {}

  update() {
    // left;
    if (this.scene.scrollX <= 0) {
      if (!this.isLeft) {
        this.isLeft = true;
        this.onLeft?.();
      }
    } else if (this.scene.scrollX >= 0) {
      if (this.isLeft) {
        this.isLeft = false;
        this.offLeft?.();
      }
    }

    // top
    if (this.scene.scrollY <= 0) {
      if (!this.isTop) {
        this.isTop = true;
        this.onTop?.();
      }
    } else if (this.scene.scrollY >= 0) {
      if (this.isTop) {
        this.isTop = false;
        this.offTop?.();
      }
    }
    // right
    if (this.scene.scrollX >= this.bounds.width) {
      if (!this.isRight) {
        this.isRight = true;
        this.onRight?.();
      }
    } else if (this.scene.scrollX <= this.bounds.width) {
      if (this.isRight) {
        this.isRight = false;
        this.offRight?.();
      }
    }

    // bottom
    if (this.scene.scrollY >= this.bounds.height) {
      if (!this.isBottom) {
        this.isBottom = true;
        this.onBottom?.();
      }
    } else if (this.scene.scrollY <= this.bounds.height) {
      if (this.isBottom) {
        this.isBottom = false;
        this.offBottom?.();
      }
    }
  }
}

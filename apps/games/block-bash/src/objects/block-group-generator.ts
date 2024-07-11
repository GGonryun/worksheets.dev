import { Game } from '../scenes/game';
import { colors } from '../settings';
import { BlockGroup } from './block-group';
import { Coordinate } from './coordinate';

const singlePiece = [
  // increased spawn rate
  [new Coordinate(0, 0)],
  [new Coordinate(0, 0)],
  [new Coordinate(0, 0)],
  [new Coordinate(0, 0)],
  [new Coordinate(0, 0)],
];
const squarePieces = [
  [
    new Coordinate(0, 0),
    new Coordinate(0, 1),
    new Coordinate(1, 0),
    new Coordinate(1, 1),
  ],
];

const advancedSquarePieces = [
  [
    new Coordinate(1, -1),
    new Coordinate(1, 0),
    new Coordinate(1, 1),
    new Coordinate(0, -1),
    new Coordinate(0, 0),
    new Coordinate(0, 1),
    new Coordinate(-1, -1),
    new Coordinate(-1, 0),
    new Coordinate(-1, 1),
  ],
];

const rectanglePieces = [
  [
    new Coordinate(1, -1),
    new Coordinate(1, 0),
    new Coordinate(1, 1),
    new Coordinate(0, -1),
    new Coordinate(0, 0),
    new Coordinate(0, 1),
  ],
  [
    new Coordinate(1, 0),
    new Coordinate(1, 1),
    new Coordinate(0, 1),
    new Coordinate(0, 0),
    new Coordinate(-1, 1),
    new Coordinate(-1, 0),
  ],
];

const diagonalPieces = [
  [new Coordinate(0, 0), new Coordinate(1, 1)],
  [new Coordinate(0, 0), new Coordinate(1, -1)],
];

const advancedDiagonalPieces = [
  [new Coordinate(0, 0), new Coordinate(-1, 1), new Coordinate(1, -1)],
  [new Coordinate(0, 0), new Coordinate(-1, -1), new Coordinate(1, 1)],
];

const sPieces = [
  [
    new Coordinate(-1, -1),
    new Coordinate(0, -1),
    new Coordinate(0, 0),
    new Coordinate(0, 1),
    new Coordinate(1, 1),
  ],
  [
    new Coordinate(1, -1),
    new Coordinate(0, -1),
    new Coordinate(0, 0),
    new Coordinate(0, 1),
    new Coordinate(-1, 1),
  ],
  [
    new Coordinate(-1, 0),
    new Coordinate(0, 0),
    new Coordinate(1, 0),
    new Coordinate(1, 1),
    new Coordinate(-1, -1),
  ],
  [
    new Coordinate(-1, 1),
    new Coordinate(-1, 0),
    new Coordinate(0, 0),
    new Coordinate(1, 0),
    new Coordinate(1, -1),
  ],
];

const cornerPieces = [
  [new Coordinate(0, 0), new Coordinate(0, 1), new Coordinate(1, 0)],
  [new Coordinate(0, 0), new Coordinate(0, 1), new Coordinate(1, 1)],
  [new Coordinate(0, 0), new Coordinate(1, 0), new Coordinate(1, 1)],
  [new Coordinate(1, 0), new Coordinate(0, 1), new Coordinate(1, 1)],
];

const advancedCornerPieces = [
  [
    new Coordinate(-1, -1),
    new Coordinate(-1, 0),
    new Coordinate(-1, 1),
    new Coordinate(0, -1),
    new Coordinate(1, -1),
  ],
  [
    new Coordinate(1, 0),
    new Coordinate(1, 1),
    new Coordinate(1, -1),
    new Coordinate(0, -1),
    new Coordinate(-1, -1),
  ],
  [
    new Coordinate(0, 1),
    new Coordinate(1, 1),
    new Coordinate(-1, 1),
    new Coordinate(-1, 0),
    new Coordinate(-1, -1),
  ],
  [
    new Coordinate(0, 1),
    new Coordinate(1, 1),
    new Coordinate(-1, 1),
    new Coordinate(1, 0),
    new Coordinate(1, -1),
  ],
];

const linePieces = [
  // horizontal
  [new Coordinate(0, 0), new Coordinate(0, 1)],
  [new Coordinate(0, 0), new Coordinate(0, 1)],
  [new Coordinate(0, 0), new Coordinate(0, 1)],
  [new Coordinate(0, -1), new Coordinate(0, 0), new Coordinate(0, 1)],
  [new Coordinate(0, -1), new Coordinate(0, 0), new Coordinate(0, 1)],

  // vertical
  [new Coordinate(0, 0), new Coordinate(1, 0)],
  [new Coordinate(0, 0), new Coordinate(1, 0)],
  [new Coordinate(0, 0), new Coordinate(1, 0)],
  [new Coordinate(-1, 0), new Coordinate(0, 0), new Coordinate(1, 0)],
  [new Coordinate(-1, 0), new Coordinate(0, 0), new Coordinate(1, 0)],
];

const advancedLinePieces = [
  [
    new Coordinate(0, -1),
    new Coordinate(0, 0),
    new Coordinate(0, 1),
    new Coordinate(0, 2),
  ],
  [
    new Coordinate(-1, 0),
    new Coordinate(0, 0),
    new Coordinate(1, 0),
    new Coordinate(2, 0),
  ],
  [
    new Coordinate(0, -2),
    new Coordinate(0, -1),
    new Coordinate(0, 0),
    new Coordinate(0, 1),
    new Coordinate(0, 2),
  ],
  [
    new Coordinate(-2, 0),
    new Coordinate(-1, 0),
    new Coordinate(0, 0),
    new Coordinate(1, 0),
    new Coordinate(2, 0),
  ],
];

const lPieces = [
  [
    new Coordinate(0, 0),
    new Coordinate(1, 0),
    new Coordinate(0, 1),
    new Coordinate(0, 2),
  ],
  [
    new Coordinate(0, 0),
    new Coordinate(1, 0),
    new Coordinate(1, 1),
    new Coordinate(1, 2),
  ],
  [
    new Coordinate(0, 0),
    new Coordinate(1, 0),
    new Coordinate(2, 0),
    new Coordinate(0, 1),
  ],
  [
    new Coordinate(0, 0),
    new Coordinate(0, 1),
    new Coordinate(1, 1),
    new Coordinate(2, 1),
  ],
  [
    new Coordinate(0, 0),
    new Coordinate(0, 1),
    new Coordinate(0, 2),
    new Coordinate(1, 2),
  ],
  [
    new Coordinate(0, 0),
    new Coordinate(0, 1),
    new Coordinate(0, 2),
    new Coordinate(-1, 2),
  ],
  [
    new Coordinate(0, 0),
    new Coordinate(1, 0),
    new Coordinate(2, 0),
    new Coordinate(2, 1),
  ],
  [
    new Coordinate(0, 1),
    new Coordinate(1, 1),
    new Coordinate(2, 1),
    new Coordinate(2, 0),
  ],
];

const tPieces = [
  [
    new Coordinate(0, 0),
    new Coordinate(1, 0),
    new Coordinate(2, 0),
    new Coordinate(1, 1),
  ],
  [
    new Coordinate(0, 0),
    new Coordinate(1, 0),
    new Coordinate(2, 0),
    new Coordinate(1, -1),
  ],
  [
    new Coordinate(0, -1),
    new Coordinate(0, 0),
    new Coordinate(0, 1),
    new Coordinate(-1, 0),
  ],
  [
    new Coordinate(0, -1),
    new Coordinate(0, 0),
    new Coordinate(0, 1),
    new Coordinate(1, 0),
  ],
];

const zPieces = [
  [
    new Coordinate(-1, 0),
    new Coordinate(0, 0),
    new Coordinate(0, 1),
    new Coordinate(1, 1),
  ],
  [
    new Coordinate(0, 0),
    new Coordinate(1, 0),
    new Coordinate(0, 1),
    new Coordinate(-1, 1),
  ],
  [
    new Coordinate(0, -1),
    new Coordinate(0, 0),
    new Coordinate(-1, 0),
    new Coordinate(-1, 1),
  ],
  [
    new Coordinate(0, 1),
    new Coordinate(0, 0),
    new Coordinate(-1, 0),
    new Coordinate(-1, -1),
  ],
];

const basicShapes = [
  ...singlePiece,
  ...squarePieces,
  ...diagonalPieces,
  ...cornerPieces,
  ...linePieces,
  ...lPieces,
  ...tPieces,
  ...zPieces,
];

const getShapes = (difficulty: number) => {
  const step = 12;

  if (difficulty < step) {
    return basicShapes;
  } else if (difficulty < step * 2) {
    return [...basicShapes, ...advancedLinePieces];
  } else if (difficulty < step * 3) {
    return [...basicShapes, ...advancedLinePieces, ...advancedDiagonalPieces];
  } else if (difficulty < step * 4) {
    return [
      ...basicShapes,
      ...advancedLinePieces,
      ...advancedDiagonalPieces,
      ...rectanglePieces,
    ];
  } else if (difficulty < step * 5) {
    return [
      ...basicShapes,
      ...advancedLinePieces,
      ...advancedDiagonalPieces,
      ...rectanglePieces,
      ...advancedCornerPieces,
    ];
  } else if (difficulty < step * 6) {
    return [
      ...basicShapes,
      ...advancedLinePieces,
      ...advancedDiagonalPieces,
      ...rectanglePieces,
      ...advancedCornerPieces,
      ...sPieces,
    ];
  } else {
    return [
      ...basicShapes,
      ...advancedLinePieces,
      ...advancedDiagonalPieces,
      ...rectanglePieces,
      ...advancedCornerPieces,
      ...sPieces,
      ...advancedSquarePieces,
    ];
  }
};

// every 10th regeneration increase the difficulty;

export class BlockGroupGenerator extends Phaser.GameObjects.Container {
  shapes = basicShapes;
  colors = colors;
  max = 4;
  game: Game;
  gap = 110;
  difficulty = 0;
  constructor(game: Game) {
    const scene = game.scene.scene;
    super(scene);
    this.game = game;
    scene.add.existing(this);
    const { width, height } = scene.cameras.main;
    const x = width / 2 - ((this.max - 1) * this.gap) / 2;
    this.setPosition(x, height * 0.82);
    this.difficulty = 0;
  }

  draw() {
    if (this.list.length > 0) {
      this.list.forEach((group) => {
        if (group instanceof BlockGroup) {
          group.view.redraw();
        }
      });

      return;
    }

    for (let i = 0; i < this.max; i++) {
      const group = new BlockGroup(
        this,
        Phaser.Math.RND.pick(this.shapes),
        Phaser.Math.RND.pick(this.colors)
      );

      // set the three groups in a row
      group.setPosition(this.gap * i, 0);
      group.setName(`group-${i}`);
      this.add(group);
    }
  }

  release(group: BlockGroup) {
    this.remove(group);
    group.setVisible(false);
    group.removeInteractive();
    group.destroy();
    if (this.list.length == 0) {
      this.difficulty += 1;
      this.shapes = getShapes(this.difficulty);
      this.draw();
      if (!this.game.solver.solve()) {
        this.game.triggerGameOver();
      }
    }
  }
}

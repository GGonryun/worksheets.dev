import { Game } from '../scenes/game';
import { grid } from '../settings';
import { BlockGroup } from './block-group';
import { LineTerminator } from './line-terminator';

export class GameSolver {
  game: Game;
  #terminator: LineTerminator;
  constructor(game: Game) {
    this.game = game;
    this.#terminator = new LineTerminator(this.game.grid);
  }

  resolveLines() {
    const total = this.#terminator.resolveLines();
    this.game.score.addLines(total);
  }

  revive() {
    const destroyed = this.#terminator.revive();
    this.game.score.addScore(destroyed);
  }

  solve() {
    // search for a solution.
    // for each block group, try to place it in every possible position.
    // if no solution is found, the game is over.
    for (const group of this.game.generator.list) {
      for (let i = 0; i < grid.size.rows; i++) {
        for (let j = 0; j < grid.size.columns; j++) {
          const coord = { x: i, y: j };
          if (this.game.grid.canDrop(group as BlockGroup, coord)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  lightning() {
    const destroyed = this.#terminator.lightning();
    this.game.score.addScore(destroyed);
  }
}

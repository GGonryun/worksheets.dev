import { CharityGamesPlugin } from '@worksheets/phaser/plugins';
import { identity } from '@worksheets/util/functions';

import { EnemyCharacterType } from '../objects/character';
import { newText } from '../objects/text';
import { GAME_WIDTH } from '../settings/game';
import { GameScene } from './game';
import { MainMenuScene } from './main-menu';

export type GameOverPayload = {
  score: number;
  clockTicks: number;
  coinsCollected: number;
  enemies: Record<EnemyCharacterType, number>;
  continued: boolean;
};

export type LifetimeGameStats = {
  coins: number;
  ticks: number;
};

export const newGameOverPayload = identity<GameOverPayload>();

export class GameOverScene extends Phaser.Scene {
  static Key = 'GameOverScene';
  server: CharityGamesPlugin;
  payload: GameOverPayload;

  constructor() {
    super({
      key: GameOverScene.Key,
    });
  }

  init(payload: GameOverPayload) {
    this.payload = payload;
  }

  create() {
    this.server = CharityGamesPlugin.find(this);

    this.sound.play('synth', { volume: 0.35 });
    newGameOverText(this);

    const highScore = updateHighScore(this);
    newScoreText(this);
    newHighScoreText(this, highScore);
    newExitText(this);
    newContinueText(this, { disabled: this.payload.continued });

    const stats = submitStats(this);
    submitLeaderboard(this);
    submitAchievements(this, stats);
  }
}

const submitStats = (scene: GameOverScene): LifetimeGameStats => {
  // update the lifetime number of coins collected
  const coins = scene.server.storage.set<number>(
    'coins-collected',
    (prev) => prev + scene.payload.coinsCollected,
    0
  );

  const ticks = scene.server.storage.set<number>(
    'clock-ticks',
    (prev) => prev + scene.payload.clockTicks,
    0
  );

  scene.server.storage.save();

  return {
    coins,
    ticks,
  };
};

const submitLeaderboard = (scene: GameOverScene) => {
  scene.server.leaderboard.submit(scene.payload.score);
};

const updateHighScore = (scene: GameOverScene) => {
  // load the current high score.
  const highScore = scene.server.storage.get('high-score', 0);
  // if the current score is higher, update the high score.
  if (scene.payload.score > highScore) {
    scene.server.storage.set('high-score', scene.payload.score);
    scene.server.storage.save();
    return scene.payload.score;
  }
  // otherwise, return the current high score.
  return highScore;
};

const submitAchievements = (
  scene: GameOverScene,
  { coins, ticks }: LifetimeGameStats
) => {
  const { score } = scene.payload;
  const achievements: string[] = [];
  ticks >= 5 * 60 && achievements.push('tiny-dungeon:survive-5-minutes');
  ticks >= 30 * 60 && achievements.push('tiny-dungeon:survive-30-minutes');
  ticks >= 60 * 60 && achievements.push('tiny-dungeon:survive-1-hour');
  coins >= 100 && achievements.push('tiny-dungeon:collect-100-coins');
  coins >= 500 && achievements.push('tiny-dungeon:collect-500-coins');
  coins >= 1000 && achievements.push('tiny-dungeon:collect-1000-coins');
  coins >= 2500 && achievements.push('tiny-dungeon:collect-2500-coins');
  score >= 10 && achievements.push('tiny-dungeon:score-10-points');
  score >= 50 && achievements.push('tiny-dungeon:score-50-points');
  score >= 100 && achievements.push('tiny-dungeon:score-100-points');
  score >= 150 && achievements.push('tiny-dungeon:score-150-points');
  score >= 200 && achievements.push('tiny-dungeon:score-200-points');

  console.log(`Submitting achievements: ${achievements.join(', ')}`);

  scene.server.achievements.unlock(achievements);
};

const newGameOverText = (scene: GameOverScene) => {
  const gameOver = newText(scene, {
    text: 'Game Over',
    x: GAME_WIDTH / 2,
    y: 64,
    size: 'large',
  }).setScale(2);

  scene.tweens.add({
    targets: gameOver,
    scale: 1,
    duration: 750,
    ease: Phaser.Math.Easing.Bounce.Out,
    onComplete: () => {
      scene.tweens.addCounter({
        from: 0,
        to: 1,
        duration: 1000,
        repeat: -1,
        ease: Phaser.Math.Easing.Sine.InOut,
        yoyo: true,
        onStart: () => {
          gameOver.setAlpha(1);
        },
        onUpdate: (tween) => {
          const v = tween.getValue();
          gameOver.setAlpha(1 - v * 0.5);
        },
        onComplete: () => {
          gameOver.clearTint();
          gameOver.setAlpha(1);
        },
      });
    },
  });
};

const newContinueText = (
  scene: GameOverScene,
  { disabled }: { disabled: boolean }
) => {
  const resume = () => {
    scene.scene.stop(GameOverScene.Key);
    scene.scene.resume(GameScene.Key);
  };

  const handler = () => {
    scene.sound.play('click');
    scene.server.advertisements.show({
      type: 'reward',
      name: 'tall-tower-bonus-run',
      adBreakDone: () => {
        resume();
      },
    });
  };

  const continueText = newText(scene, {
    text: 'Continue',
    x: GAME_WIDTH / 2,
    y: 190,
    size: 'large',
  });

  const adText = newText(scene, {
    text: '(Watch an ad)',
    x: GAME_WIDTH / 2,
    y: 202,
    size: 'small',
  });

  if (disabled) {
    [continueText, adText].map((text) =>
      text.setAlpha(0.5).disableInteractive()
    );
    adText.setText('(already watched)');
  } else {
    [continueText, adText].map((text) =>
      text.setInteractive().on('pointerdown', handler)
    );
  }
};

const newExitText = (scene: GameOverScene) => {
  const handler = () => {
    scene.scene.stop(GameOverScene.Key);
    scene.scene.stop(GameScene.Key);
    scene.scene.start(MainMenuScene.Key);
  };

  newText(scene, {
    text: 'Main Menu',
    x: GAME_WIDTH / 2,
    y: 164,
    size: 'large',
  })
    .setInteractive()
    .on('pointerdown', () => {
      scene.sound.play('click');
      handler();
    });
};

const newScoreText = (scene: GameOverScene) => {
  newText(scene, {
    text: `Score: ${scene.payload.score}`,
    x: GAME_WIDTH / 2,
    y: 108,
    size: 'small',
  });
};

const newHighScoreText = (scene: GameOverScene, score: number) => {
  newText(scene, {
    text: `High Score: ${score}`,
    x: GAME_WIDTH / 2 + 2,
    y: 118,
    size: 'small',
  });
};

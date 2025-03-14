import { TypedEventEmitter } from '@worksheets/phaser/events';

import { ElementDepth } from '../util/depth';
import { StorageKey } from '../util/storage';
import { GameScene } from './scene';

export type ScoreEventEmitter = TypedEventEmitter<{
  score: [number];
}>;
export const newScoreKeeper = (scene: GameScene, events: ScoreEventEmitter) => {
  const distance = 16;
  let score = 0;
  let disabled = true;

  const text = scene.add
    .text(4, 4 - distance, '', {
      fontSize: '9px',
      align: 'left',
      color: '#fff',
      stroke: '#000',
      strokeThickness: 2,
      fontFamily: 'pixel-mono',
    })
    .setResolution(10)
    .setDepth(ElementDepth.UI)
    .setAlpha(0);

  const init = () => {
    score = 0;
    update();
    enable();
  };

  const update = () => {
    events.emit('score', score);
    text.setText(`Score: ${score}`);
  };

  const exit = () => {
    scene.add.tween({
      targets: text,
      duration: 1000,
      y: `-=${distance}`,
      alpha: { from: 1, to: 0 },
      onStart: () => {
        disable();
      },
    });
  };

  const enter = () => {
    scene.add.tween({
      targets: text,
      duration: 1000,
      y: `+=${distance}`,
      alpha: { from: 0, to: 1 },
      onStart: () => {
        init();
      },
    });
  };

  const disable = () => {
    disabled = true;
  };
  const enable = () => {
    disabled = false;
  };

  const loadHighScore = () => {
    return scene.server.storage.get(StorageKey.HIGH_SCORE, 0);
  };

  return {
    init,
    exit,
    enter,
    getScore: () => score,
    getHighScore: () => {
      return Math.max(score, loadHighScore());
    },
    saveScore: () => {
      scene.server.leaderboard.submit(score);

      // TODO: check achievements

      const best = loadHighScore();
      if (score < best) return;

      scene.server.storage.set(StorageKey.HIGH_SCORE, score);
      scene.server.storage.save();
    },

    updateAchievements: () => {
      const achievements: string[] = ['slime-arrows:die-once'];
      score >= 100 && achievements.push('slime-arrows:score-100');
      score >= 150 && achievements.push('slime-arrows:score-150');
      score >= 200 && achievements.push('slime-arrows:score-200');
      scene.server.achievements.unlock(achievements);
    },
    increment: (value: number) => {
      if (disabled) return;

      score += value;
      update();
    },
  };
};

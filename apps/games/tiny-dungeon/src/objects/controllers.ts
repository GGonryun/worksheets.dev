import { Direction } from '@worksheets/phaser/types';

import { GameScene } from '../scenes/game';
import { GAME_WIDTH } from '../settings/game';
import { ACTIVE_ACTION_TINT_COLOR } from '../settings/theme';
import { DIRECTIONS } from './directions';

export type GamePad = ReturnType<typeof newGamePad>;

export const newKeyboardController = (scene: GameScene) => {
  scene.input.keyboard?.on('keydown-UP', async (event: KeyboardEvent) => {
    scene.gameEvents.emit('input-move', 'up');
    event.stopPropagation();
    event.preventDefault();
  });

  scene.input.keyboard?.on('keydown-DOWN', (event: KeyboardEvent) => {
    scene.gameEvents.emit('input-move', 'down');
    event.stopPropagation();
    event.preventDefault();
  });
  scene.input.keyboard?.on('keydown-LEFT', (event: KeyboardEvent) => {
    scene.gameEvents.emit('input-move', 'left');
    event.stopPropagation();
    event.preventDefault();
  });
  scene.input.keyboard?.on('keydown-RIGHT', (event: KeyboardEvent) => {
    scene.gameEvents.emit('input-move', 'right');
    event.stopPropagation();
    event.preventDefault();
  });
};

export const newTouchController = (scene: GameScene) => {
  scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
    const tile = scene.map.getTile(pointer);
    if (!tile) return;

    const direction = scene.map.getDirection(scene.player.body, tile);
    if (!direction) return;

    scene.gameEvents.emit('input-move', direction);
  });
};

export const newGamePad = (scene: GameScene) => {
  const gap = { x: 1, y: 2 };
  const size = 8;
  const scale = 4;
  const offset = { y: 40 };
  const x = GAME_WIDTH / 2;
  const y = scene.map.y + scene.map.height + offset.y;

  const positions: Record<Direction, { x: number; y: number }> = {
    up: { x: 0, y: -((gap.y + size) * scale) / 2 },
    down: { x: 0, y: ((gap.y + size) * scale) / 2 },
    left: { x: -((gap.x + size) * scale), y: 0 },
    right: { x: (gap.x + size) * scale, y: 0 },
  };

  const frames: Record<Direction, number> = {
    up: 0,
    right: 1,
    down: 2,
    left: 3,
  };

  const buttons: Record<Direction, Phaser.GameObjects.Sprite> = {
    up: new Phaser.GameObjects.Sprite(scene, 0, 0, 'game-pad'),
    down: new Phaser.GameObjects.Sprite(scene, 0, 0, 'game-pad'),
    left: new Phaser.GameObjects.Sprite(scene, 0, 0, 'game-pad'),
    right: new Phaser.GameObjects.Sprite(scene, 0, 0, 'game-pad'),
  };

  const tweens: Record<Direction, Phaser.Tweens.Tween | undefined> = {
    up: undefined,
    down: undefined,
    left: undefined,
    right: undefined,
  };

  const container = scene.add.container(x, y);

  for (const direction of DIRECTIONS) {
    const button = buttons[direction]
      .setOrigin(0.5)
      .setScale(scale)
      .setInteractive()
      .on('pointerdown', () => {
        scene.gameEvents.emit('input-move', direction);
      });

    const position = positions[direction];
    button.setPosition(position.x, position.y);
    button.setFrame(frames[direction]);

    container.add(button);
  }

  const animate = (direction: Direction) => {
    const tween = tweens[direction];
    if (tween && tween.isPlaying()) {
      return;
    }
    const button = buttons[direction];
    tweens[direction] = scene.tweens.add({
      targets: button,
      scale: scale * 0.8,
      duration: 100,
      ease: Phaser.Math.Easing.Cubic.InOut,
      repeat: 0,
      onStart: () => {
        button.setTint(ACTIVE_ACTION_TINT_COLOR.color);
      },
      onComplete: () => {
        button.setScale(scale);
        button.clearTint();
      },
    });
  };

  const hide = () => {
    // make all buttons invisible
    for (const [, button] of Object.entries(buttons)) {
      button.setVisible(false);
    }
  };

  const show = () => {
    // make all buttons visible
    for (const [, button] of Object.entries(buttons)) {
      button.setVisible(true);
    }
  };

  return {
    animate,
    show,
    hide,
  };
};

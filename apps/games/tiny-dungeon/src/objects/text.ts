import { toHex } from '@worksheets/phaser/colors';

import { MainMenuScene } from '../scenes/main-menu';
import { GAME_WIDTH } from '../settings/game';
import { BORDER_GRASS_COLOR } from '../settings/theme';
import { newFlashingTween } from './tweens';

type FontSize = 'large' | 'small';

type TextOptions = {
  text: string;
  x: number;
  y: number;
  size: FontSize;
  origin?: number;
} & Partial<Phaser.Types.GameObjects.Text.TextStyle>;
export const newText = (
  scene: Phaser.Scene,
  { text, x, y, size, origin = 0.5, ...opts }: TextOptions
) => {
  const BASE_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
    align: 'center',
    color: toHex(BORDER_GRASS_COLOR).toCSS(),
    fontFamily: 'boxel',
  };
  const FONT_SIZE: Record<FontSize, number> = {
    large: 18,
    small: 9,
  };
  const options = {
    ...opts,
    ...BASE_STYLE,
    fontSize: `${FONT_SIZE[size]}px`,
  };
  return scene.add
    .text(x, y, text, options)
    .setOrigin(origin)
    .setStroke('#000', 2)
    .setResolution(10);
};

type SceneTransitionTextOptions = {
  text: string;
  x: number;
  y: number;
  size: FontSize;
  to: string;
  from: string;
  flashing?: boolean;
};

export const newSceneTransitionText = (
  scene: Phaser.Scene,
  { text, x, y, size, to, from, flashing }: SceneTransitionTextOptions
) => {
  const textObject = newText(scene, { text, x, y, size });
  textObject.setInteractive();
  textObject.on('pointerdown', () => {
    scene.sound.play('click');
    scene.scene.start(to);
    scene.scene.stop(from);
  });

  if (flashing) {
    newFlashingTween(scene, textObject);
  }
};

const SUPPORTING_SCENE_OPTIONS = {
  offset: {
    x: GAME_WIDTH / 2,
  },
  title: {
    offset: {
      y: 24,
    },
  },
  back: {
    offset: {
      y: 200,
    },
  },
};

export type SupportingSceneTextOptions = {
  title: string;
  key: string;
};

export type SupportingSceneText = ReturnType<typeof newSupportingSceneText>;
export const newSupportingSceneText = (
  scene: Phaser.Scene,
  { title, key }: SupportingSceneTextOptions
) => {
  const titleText = newText(scene, {
    text: title,
    x: SUPPORTING_SCENE_OPTIONS.offset.x,
    y: SUPPORTING_SCENE_OPTIONS.title.offset.y,
    size: 'large',
  });
  newSceneTransitionText(scene, {
    text: 'Back',
    x: SUPPORTING_SCENE_OPTIONS.offset.x,
    y: SUPPORTING_SCENE_OPTIONS.back.offset.y,
    size: 'large',
    to: MainMenuScene.Key,
    from: key,
    flashing: true,
  });
  return {
    title: titleText,
  };
};

export type LinkTextOptions = {
  text: string;
  x: number;
  y: number;
  size: FontSize;
  href: string;
} & Partial<Phaser.Types.GameObjects.Text.TextStyle>;
export const newLinkText = (
  scene: Phaser.Scene,
  { text, x, y, size, href }: LinkTextOptions
) => {
  const linkText = newText(scene, { text, x, y, size });
  linkText.setInteractive();
  linkText.on('pointerdown', () => {
    window.open(href, '_blank');
  });
  return linkText;
};

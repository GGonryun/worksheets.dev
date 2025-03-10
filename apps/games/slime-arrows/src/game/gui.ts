import { GAME_HEIGHT, GAME_WIDTH } from '../main';
import { ElementDepth } from '../util/depth';
import { StorageKey } from '../util/storage';
import { GameScene } from './scene';
import { DeltaValue, PositionDelta, SceneEventEmitter } from './types';

export const BASE_TEXT_PROPS = (
  opts?: Partial<Phaser.Types.GameObjects.Text.TextStyle>
) => ({
  fontSize: '18px',
  color: '#fff',
  stroke: '#000',
  align: 'center',
  strokeThickness: 4,
  fontFamily: 'pixel-mono',
  fixedWidth: GAME_WIDTH,
  ...(opts ?? {}),
});

export const newStartGameScreen = (
  scene: GameScene,
  events: SceneEventEmitter
) => {
  const text = newGameText(scene, 0, 32, 'Slime\n&\nArrows');
  const highScore = newSmallText(scene, 0, 10, ``);
  const logo = newLogoButton(scene);
  const credits = newCreditsButton(scene, events);
  const audio = newAudioButton(scene);
  const tutorial = newTutorial(scene);

  const textSlider = newElementSlider(scene, {
    target: text,
    y: { to: 32, from: -80 },
  });
  const highScoreSlider = newElementSlider(scene, {
    target: highScore,
    y: { to: 10, from: -16 },
  });
  const logoSlider = newElementSlider(scene, {
    target: logo,
    x: { to: 32, from: -32 },
  });
  const audioSlider = newElementSlider(scene, {
    target: audio,
    y: { to: GAME_HEIGHT - 32, from: GAME_HEIGHT + 32 },
  });
  const creditsSlider = newElementSlider(scene, {
    target: credits,
    x: {
      to: GAME_WIDTH - 32,
      from: GAME_WIDTH + 32,
    },
  });
  const tutorialFader = newElementSlider(scene, {
    target: tutorial,
    y: { to: GAME_HEIGHT / 2 + 64, from: GAME_HEIGHT + 32 },
  });

  return {
    hide: () => {
      textSlider.out();
      highScoreSlider.out();
      tutorialFader.out();
      logoSlider.out();
      creditsSlider.out();
      audioSlider.out();
    },
    show: () => {
      highScore.setText(`Best: ${scene.scoreKeeper.getHighScore()}`);
      highScoreSlider.in();

      textSlider.in();
      audioSlider.in();
      logoSlider.in();
      creditsSlider.in();
      tutorialFader.in();
    },
  };
};

const flipIf = (d?: DeltaValue) => {
  return d ? flip(d) : undefined;
};

const flip = <T extends DeltaValue>(d: T) => {
  return { to: d.from, from: d.to };
};

const newElementSlider = (
  scene: Phaser.Scene,
  {
    target,
    x,
    y,
  }: {
    target: Phaser.GameObjects.GameObject;
  } & PositionDelta
) => {
  const slide = (x?: DeltaValue, y?: DeltaValue) => {
    scene.tweens.add({
      targets: [target],
      duration: 1000,
      ease: Phaser.Math.Easing.Sine.InOut,
      ...(x ? { x } : {}),
      ...(y ? { y } : {}),
    });
  };
  return {
    in: () => {
      slide(x, y);
    },
    out: () => {
      slide(flipIf(x), flipIf(y));
    },
  };
};

const newLogoButton = (scene: GameScene) => {
  const icon = scene.add.sprite(0, 0, 'icon-charity-games', 0).setScale(1);

  const background = scene.add
    .sprite(0, 0, 'grass', 6)
    .setScale(2.25)
    .setOrigin(0.5, 0.5)
    .setInteractive()
    .on('pointerdown', () => {
      window.open('https://charity.games', '_blank');
      scene.sound.play('click', { volume: 0.5 });
    });
  return scene.add
    .container(32, GAME_HEIGHT - 32, [background, icon])
    .setDepth(ElementDepth.GUI);
};

const newCreditsButton = (scene: GameScene, events: SceneEventEmitter) => {
  const icon = scene.add.sprite(0, 0, 'icon-question', 0).setScale(2);

  scene.outline.register(icon, new Phaser.Display.Color(0, 0, 0));

  const background = scene.add
    .sprite(0, 0, 'grass', 6)
    .setScale(2.25)
    .setOrigin(0.5, 0.5)
    .setInteractive()
    .on('pointerdown', () => {
      events.emit('showCredits');
      scene.sound.play('click', { volume: 0.5 });
    });
  return scene.add
    .container(GAME_WIDTH - 32, GAME_HEIGHT - 32, [background, icon])
    .setDepth(ElementDepth.GUI);
};

const newAudioButton = (scene: GameScene) => {
  const muted = scene.server.storage.get(StorageKey.SOUND_MUTED, false);

  const icon = scene.add.sprite(0, 0, 'icon-sound-off', 0).setScale(2);

  scene.outline.register(icon, new Phaser.Display.Color(0, 0, 0));

  const update = (muted: boolean) => {
    scene.sound.mute = muted;
    icon.setTexture(muted ? 'icon-sound-off' : 'icon-sound-on');
    scene.sound.play('click', { volume: 0.5 });
  };

  update(muted);

  const background = scene.add
    .sprite(0, 0, 'grass', 6)
    .setScale(2.25)
    .setOrigin(0.5, 0.5)
    .setInteractive()
    .on('pointerdown', () => {
      const newMuted = !scene.sound.mute;
      scene.server.storage.set(StorageKey.SOUND_MUTED, newMuted);
      update(newMuted);
    });
  return scene.add
    .container(GAME_WIDTH / 2, GAME_HEIGHT - 32, [background, icon])
    .setDepth(ElementDepth.GUI);
};

const newTutorial = (scene: Phaser.Scene) => {
  const shadow = scene.add
    .sprite(0, 0, 'joystick', 4)
    .setScale(2)
    .setTintFill(0x000000)
    .setAlpha(0.8);

  const stick = scene.add.sprite(0, 0, 'joystick', 4).setScale(2);

  const hand = scene.add.sprite(0, 0, 'hand', 0).setScale(1).setOrigin(0, 0);

  scene.tweens.add({
    targets: [stick, hand],
    y: { from: -5, to: +5 },
    duration: 1700,
    repeat: -1,
    yoyo: true,
    ease: Phaser.Math.Easing.Sine.InOut,
  });
  scene.tweens.add({
    targets: [stick, hand],
    x: { from: -5, to: +5 },
    duration: 1300,
    repeat: -1,
    yoyo: true,
    ease: Phaser.Math.Easing.Sine.InOut,
  });
  const x = GAME_WIDTH / 2;
  const y = GAME_HEIGHT / 2 + 64;
  return scene.add
    .container(x, y, [shadow, stick, hand])
    .setDepth(ElementDepth.GUI);
};

export const newGameOverScreen = (
  scene: GameScene,
  event: SceneEventEmitter
) => {
  const view = new Phaser.GameObjects.Rectangle(
    scene,
    0,
    0,
    GAME_WIDTH,
    GAME_HEIGHT
  ).setOrigin(0);
  const map = scene.add.tilemap(undefined, 16, 16, 9, 8);
  map.addTilesetImage('gui');
  const screen = map.createBlankLayer('gui', 'gui');
  if (!screen) throw new Error('Could not create screen layer');
  screen.setDepth(ElementDepth.GUI);
  screen.putTilesAt([85, 86, 86, 86, 86, 86, 86, 86, 87], 0, 0);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 1);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 2);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 3);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 4);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 5);
  screen.putTilesAt([237, 238, 238, 238, 238, 238, 238, 238, 239], 0, 6);

  Phaser.Display.Align.In.Center(screen, view);

  const titleText = newGameText(scene, 0, 0, 'Game Over');
  Phaser.Display.Align.In.TopCenter(titleText, screen, 0, -6);

  const scoreText = newSmallText(scene, 0, 0, '');
  Phaser.Display.Align.In.Center(scoreText, screen, 0, -14);

  const highScoreText = newSmallText(scene, 0, 0, 'Best: 0');
  Phaser.Display.Align.In.Center(highScoreText, screen, 0, 0);

  const homeIcon = newHomeIcon(scene, 0, 0)
    .setInteractive()
    .on('pointerdown', () => {
      event.emit('hideGameOver');
      scene.sound.play('click', { volume: 0.5 });
    });
  scene.outline.register(homeIcon, new Phaser.Display.Color(0, 0, 0));
  Phaser.Display.Align.In.Center(homeIcon, screen, 0, 24);

  const targets = [screen, titleText, scoreText, highScoreText, homeIcon];
  const fade = (alpha: DeltaValue) => {
    scene.tweens.add({
      targets,
      alpha,
      duration: 500,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
  };

  targets.forEach((t) => t.setAlpha(0));

  return {
    show: () => {
      scene.scoreKeeper.saveScore();
      scene.scoreKeeper.updateAchievements();
      scoreText.setText(`Score: ${scene.scoreKeeper.getScore()}`);
      highScoreText.setText(`Best: ${scene.scoreKeeper.getHighScore()}`);

      fade({ from: 0, to: 1 });
    },
    hide: () => {
      fade({ from: 1, to: 0 });
    },
  };
};

export const newCreditsScreen = (
  scene: GameScene,
  events: SceneEventEmitter
) => {
  const background = newCreditsBackground(scene)
    .setPosition(18, 32)
    .setAlpha(0);

  const creditsText = newGameText(scene, 0, 5, 'Credits').setAlpha(0);

  const message = newSmallText(
    scene,
    0,
    36,
    'Proudly assembled with\nthe generosity of\ntalented strangers\non the internet:'
  ).setAlpha(0);

  const links = [
    ['aModestDuck', 'https://modestduck.itch.io/'],
    ['ToffeeCraft', 'https://toffeecraft.itch.io/'],
    ['Arydian', 'https://arydian.itch.io/'],
    ['Otterisk', 'https://otterisk.itch.io/'],
    ['Sr.Toasty', 'https://srtoasty.itch.io/'],
    ['GGBotNet', 'https://ggbotnet.itch.io/'],
    ['Aspecs Gaming', 'https://aspecsgaming.itch.io/'],
    ['Pixel Boy', 'https://pixel-boy.itch.io'],
    ['Great Doc Brown', 'https://greatdocbrown.itch.io/'],
    ['Dreammix', 'https://dreammix.itch.io/'],
    ['David KBD', 'https://davidkbd.itch.io/'],
    ['Jsfxr', 'https://pro.sfxr.me/'],
  ].map(([name, href], i) =>
    newLinkText(scene, GAME_WIDTH / 2, 90 + 14 * (i + 1), name, href, {
      fixedWidth: 128,
    }).setAlpha(0)
  );

  const home = newHomeIcon(scene, GAME_WIDTH / 2, GAME_HEIGHT - 28)
    .setScale(2)
    .setAlpha(0)
    .on('pointerdown', () => {
      events.emit('hideCredits');
      scene.sound.play('click', { volume: 0.5 });
    });

  scene.outline.register(home, new Phaser.Display.Color(0, 0, 0));

  const fade = (alpha: DeltaValue) => {
    scene.tweens.add({
      targets: [background, home, creditsText, message, ...links],
      alpha,
      duration: 1000,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
  };
  const alpha = { from: 0, to: 1 };

  return {
    show: () => {
      fade(alpha);
    },
    hide: () => {
      fade(flip(alpha));
    },
  };
};

const newHomeIcon = (scene: Phaser.Scene, x: number, y: number) => {
  return scene.add
    .sprite(x, y, 'icon-map', 0)
    .setDepth(ElementDepth.GUI)
    .setInteractive();
};

const newGameText = (
  scene: Phaser.Scene,
  x: number,
  y: number,
  content: string,
  opts?: Partial<Phaser.Types.GameObjects.Text.TextStyle>
) => {
  return scene.add
    .text(x, y, content, BASE_TEXT_PROPS(opts))
    .setDepth(ElementDepth.GUI)
    .setResolution(10);
};

const newSmallText = (
  scene: Phaser.Scene,
  x: number,
  y: number,
  content: string,
  opts?: Partial<Phaser.Types.GameObjects.Text.TextStyle>
) => {
  return newGameText(scene, x, y, content, {
    fontSize: '9px',
    strokeThickness: 2,
    ...opts,
  });
};

const newLinkText = (
  scene: Phaser.Scene,
  x: number,
  y: number,
  content: string,
  href: string,
  opts?: Partial<Phaser.Types.GameObjects.Text.TextStyle>
) => {
  return newSmallText(scene, x, y, content, opts)
    .setInteractive()
    .setOrigin(0.5, 0.5)
    .on('pointerdown', () => {
      window.open(href, '_blank');
    });
};

const newCreditsBackground = (scene: Phaser.Scene) => {
  const map = scene.add.tilemap(undefined, 16, 16, 9, 16);
  map.addTilesetImage('gui');
  const screen = map.createBlankLayer('gui', 'gui');
  if (!screen) throw new Error('Could not create screen layer');
  screen.setDepth(ElementDepth.GUI);
  screen.putTilesAt([85, 86, 86, 86, 86, 86, 86, 86, 87], 0, 0);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 1);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 2);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 3);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 4);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 5);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 6);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 7);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 8);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 9);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 10);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 11);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 12);
  screen.putTilesAt([165, 166, 166, 166, 166, 166, 166, 166, 167], 0, 13);
  screen.putTilesAt([237, 238, 238, 238, 238, 238, 238, 238, 239], 0, 14);

  return screen;
};

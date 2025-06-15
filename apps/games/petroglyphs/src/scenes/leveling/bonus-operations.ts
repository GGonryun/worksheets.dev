import { TypedEventEmitter } from '@worksheets/phaser/events';
import { Point } from '@worksheets/phaser/types';

import { GAME_WIDTH } from '../../settings';
import { LevelUpSceneOptions } from './level-up-scene';

export type BonusOperationsOptions = Pick<
  LevelUpSceneOptions,
  'banishes' | 'recycles'
> &
  Point;

const xOffset = 128;
const yOffset = 32;
const banishPlacement = {
  from: { x: GAME_WIDTH + xOffset, y: yOffset },
  to: { x: GAME_WIDTH - xOffset, y: yOffset },
};
const recyclePlacement = {
  from: { x: -xOffset, y: yOffset },
  to: { x: xOffset, y: yOffset },
};
const titlePlacement = {
  from: { x: 0, y: -90 },
  to: { x: 0, y: 0 },
};
const remainingPlacement = {
  from: { x: 0, y: -90 },
  to: { x: 0, y: 48 },
};

const cancelPlacement = {
  from: { x: 96, y: -90 },
  to: { x: 96, y: 32 },
};

const BONUS_OPERATIONS_ANIMATION_SPEED = 500;

export class BonusOperations extends Phaser.GameObjects.Container {
  options: BonusOperationsOptions;

  title: Phaser.GameObjects.Text;
  remaining: Phaser.GameObjects.Text;
  recycle: ActionButton;
  banish: ActionButton;
  cancel: Phaser.GameObjects.Sprite;

  operationShowing: boolean;
  headerShowing: boolean;

  events: TypedEventEmitter<{
    cancel: [];
    banishing: [];
    recycling: [];
  }>;

  constructor(scene: Phaser.Scene, options: BonusOperationsOptions) {
    const { x, y } = options;

    super(scene, x, y);
    this.events = new TypedEventEmitter();
    this.options = options;
    this.headerShowing = false;
    this.operationShowing = false;

    this.title = new Phaser.GameObjects.Text(
      scene,
      titlePlacement.from.x,
      titlePlacement.from.y,
      '',
      {
        fontSize: `50px`,
        fontStyle: 'bold',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6,
        align: 'center',
        fixedWidth: GAME_WIDTH,
      }
    );
    this.add(this.title);

    this.remaining = new Phaser.GameObjects.Text(
      scene,
      remainingPlacement.from.x,
      remainingPlacement.from.y,
      '',
      {
        fontSize: `36px`,
        fontStyle: 'bold',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6,
        align: 'center',
        fixedWidth: GAME_WIDTH,
      }
    );
    this.add(this.remaining);

    this.cancel = new Phaser.GameObjects.Sprite(
      scene,
      cancelPlacement.from.x,
      cancelPlacement.from.y,
      'icons-back'
    ).setScale(1.25);
    this.add(this.cancel);

    this.cancel.setInteractive().on('pointerdown', this.handleCancel, this);

    this.banish = new ActionButton(scene, {
      text: 'BANISH',
      remaining: this.options.banishes,
      color: 0xc03221,
      sprite: 'icons-scissors',
      flipped: true,
      scale: 0.9,
    });
    this.banish.setPosition(banishPlacement.from.x, banishPlacement.from.y);
    this.banish.events.on('clicked', this.handleStartBanishing, this);
    this.add(this.banish);

    this.recycle = new ActionButton(scene, {
      text: 'RECYCLE',
      remaining: this.options.recycles,
      color: 0x44601a,
      scale: 0.8,
      sprite: 'icons-recycle',
    });
    this.recycle.setPosition(recyclePlacement.from.x, recyclePlacement.from.y);
    this.recycle.events.on('clicked', this.handleStartRecycling, this);
    this.add(this.recycle);
  }

  handleCancel() {
    this.animateHeaderIn();

    this.animateOperationOut();

    this.events.emit('cancel');
  }

  async handleStartBanishing() {
    this.title.setText('BANISHING');
    this.remaining.setText(`${this.banish.current} left`);

    this.animateHeaderOut();

    this.animateOperationIn();

    this.events.emit('banishing');
  }

  async handleStartRecycling() {
    this.animateHeaderOut();

    this.animateOperationIn();

    this.title.setText('RECYCLING');
    this.remaining.setText(`${this.recycle.current} left`);
    this.events.emit('recycling');
  }

  updateBanish() {
    this.banish.decrease();
    this.remaining.setText(this.banish.remaining.text);
  }

  updateRecycle() {
    this.recycle.decrease();
    this.remaining.setText(this.recycle.remaining.text);
  }

  canBanish() {
    return this.banish.canActivate();
  }

  canRecycle() {
    return this.recycle.canActivate();
  }

  async animateHeaderIn() {
    if (this.headerShowing) return;
    this.headerShowing = true;

    const recycleEnter = new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this.recycle,
        x: { from: recyclePlacement.from.x, to: recyclePlacement.to.x },
        y: { from: recyclePlacement.from.y, to: recyclePlacement.to.y },
        duration: BONUS_OPERATIONS_ANIMATION_SPEED,
        ease: Phaser.Math.Easing.Sine.InOut,
        onComplete: resolve,
      })
    );
    const banishEnter = new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this.banish,
        x: { from: banishPlacement.from.x, to: banishPlacement.to.x },
        y: { from: banishPlacement.from.y, to: banishPlacement.to.y },
        duration: BONUS_OPERATIONS_ANIMATION_SPEED,
        ease: Phaser.Math.Easing.Sine.InOut,
        onComplete: resolve,
      })
    );

    await Promise.all([banishEnter, recycleEnter]);
  }

  async animateHeaderOut() {
    if (!this.headerShowing) return;
    this.headerShowing = false;

    const resolveExit = new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this.recycle,
        x: { from: recyclePlacement.to.x, to: recyclePlacement.from.x },
        duration: BONUS_OPERATIONS_ANIMATION_SPEED,
        ease: Phaser.Math.Easing.Sine.InOut,
        onComplete: resolve,
      })
    );
    const banishExit = new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this.banish,
        x: { from: banishPlacement.to.x, to: banishPlacement.from.x },
        duration: BONUS_OPERATIONS_ANIMATION_SPEED,
        ease: Phaser.Math.Easing.Sine.InOut,
        onComplete: resolve,
      })
    );

    await Promise.all([banishExit, resolveExit]);
  }

  async animateOperationIn() {
    if (this.operationShowing) return;
    this.operationShowing = true;

    const titleEnter = new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this.title,
        y: { from: titlePlacement.from.y, to: titlePlacement.to.y },
        duration: BONUS_OPERATIONS_ANIMATION_SPEED,
        ease: Phaser.Math.Easing.Sine.InOut,
        onComplete: resolve,
      })
    );
    const remainingEnter = new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this.remaining,
        y: { from: remainingPlacement.from.y, to: remainingPlacement.to.y },
        duration: BONUS_OPERATIONS_ANIMATION_SPEED,
        ease: Phaser.Math.Easing.Sine.InOut,
        onComplete: resolve,
      })
    );
    const cancelEnter = new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this.cancel,
        y: { from: cancelPlacement.from.y, to: cancelPlacement.to.y },
        duration: BONUS_OPERATIONS_ANIMATION_SPEED,
        ease: Phaser.Math.Easing.Sine.InOut,
        onComplete: resolve,
      })
    );
    await Promise.all([titleEnter, remainingEnter, cancelEnter]);
  }

  async animateOperationOut() {
    if (!this.operationShowing) return;
    this.operationShowing = false;

    const titleExit = new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this.title,
        y: { from: titlePlacement.to.y, to: titlePlacement.from.y },
        duration: BONUS_OPERATIONS_ANIMATION_SPEED,
        ease: Phaser.Math.Easing.Sine.InOut,
        onComplete: resolve,
      })
    );
    const remainingExit = new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this.remaining,
        y: { from: remainingPlacement.to.y, to: remainingPlacement.from.y },
        duration: BONUS_OPERATIONS_ANIMATION_SPEED,
        ease: Phaser.Math.Easing.Sine.InOut,
        onComplete: resolve,
      })
    );
    const cancelExit = new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this.cancel,
        y: { from: cancelPlacement.to.y, to: cancelPlacement.from.y },
        duration: BONUS_OPERATIONS_ANIMATION_SPEED,
        ease: Phaser.Math.Easing.Sine.InOut,
        onComplete: resolve,
      })
    );
    await Promise.all([titleExit, remainingExit, cancelExit]);
  }
}

class ActionButton extends Phaser.GameObjects.Container {
  events: TypedEventEmitter<{
    clicked: [];
  }>;
  remaining: Phaser.GameObjects.Text;
  icon: Phaser.GameObjects.Sprite;
  background: Phaser.GameObjects.Rectangle;
  title: Phaser.GameObjects.Text;
  current: number;
  constructor(
    scene: Phaser.Scene,
    {
      remaining,
      text,
      color,
      sprite,
      scale,
      flipped,
    }: {
      text: string;
      remaining: number;
      color: number;
      sprite: string;
      scale?: number;
      flipped?: boolean;
    }
  ) {
    super(scene);
    this.current = remaining;
    this.events = new TypedEventEmitter();

    const rectWidth = 256;
    const rectHeight = 64;

    this.background = new Phaser.GameObjects.Rectangle(
      scene,
      0,
      0,
      rectWidth,
      rectHeight,
      color
    )
      .setStrokeStyle(4, 0x000000)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.canActivate()) {
          this.events.emit('clicked');
        }
      });
    this.add(this.background);

    this.title = new Phaser.GameObjects.Text(scene, 0, 0, text, {
      fontSize: `36px`,
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6,
      align: 'center',
    });
    this.add(this.title);

    this.remaining = new Phaser.GameObjects.Text(scene, 0, 0, '', {
      fontSize: `20px`,
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      fixedWidth: 96 * 2,
      align: 'center',
    });
    this.add(this.remaining);

    this.icon = new Phaser.GameObjects.Sprite(scene, 0, 0, sprite).setScale(
      0.75 * (scale ?? 1)
    );
    this.add(this.icon);

    const offsetX = 40;

    Phaser.Display.Align.In.Center(
      this.title,
      this.background,
      flipped ? -offsetX : offsetX,
      -12
    );
    Phaser.Display.Align.In.Center(
      this.remaining,
      this.background,
      flipped ? -offsetX : offsetX,
      18
    );
    Phaser.Display.Align.In.Center(
      this.icon,
      this.background,
      flipped ? 80 : -80,
      0
    );

    this.updateRemaining();
  }

  canActivate() {
    return this.current > 0;
  }

  decrease() {
    if (this.current <= 0) return;
    this.current--;
    this.updateRemaining();
  }

  updateRemaining() {
    this.remaining.setText(`${this.current} left`);
    if (this.current < 1) {
      this.disable();
    }
  }

  disable() {
    this.icon.setTint(0x666666);
    this.background.setFillStyle(0x666666);
    this.background.setStrokeStyle(4, 0x333333);
    this.title.setTint(0x666666);
    this.remaining.setTint(0x666666);
    this.background.disableInteractive();
  }
}

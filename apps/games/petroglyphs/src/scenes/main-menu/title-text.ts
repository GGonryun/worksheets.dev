import { GameObjects } from 'phaser';

import { absorbFunction, PortalController } from '../portal/portal';

export class TitleText extends Phaser.GameObjects.Container {
  scene: Phaser.Scene;
  portal: PortalController;
  constructor(scene: Phaser.Scene, portal: PortalController) {
    super(scene);
    this.scene = scene;
    this.portal = portal;

    scene.add.existing(this);

    this.setPosition(70, 200);

    this.add(new GameObjects.Sprite(scene, 0, 0, 'title-1'));
    this.add(new GameObjects.Sprite(scene, 70, 0, 'title-2'));
    this.add(new GameObjects.Sprite(scene, 140, 0, 'title-3'));
    this.add(new GameObjects.Sprite(scene, 210, 0, 'title-4'));
    this.add(new GameObjects.Sprite(scene, 290, 0, 'title-5'));
    this.add(new GameObjects.Sprite(scene, 370, 0, 'title-6'));
    this.add(new GameObjects.Sprite(scene, 440, 0, 'title-7'));
    this.add(new GameObjects.Sprite(scene, 480, 0, 'title-8'));
    this.add(new GameObjects.Sprite(scene, 550, 0, 'title-9'));
    this.add(new GameObjects.Sprite(scene, 620, 0, 'title-10'));
    this.add(new GameObjects.Sprite(scene, 700, 0, 'title-11'));

    for (const sprite of this.list as GameObjects.Sprite[]) {
      this.scene.tweens.add({
        targets: sprite,
        y: Phaser.Math.RND.pick([-8, 8]),
        duration: Phaser.Math.Between(500, 1000),
        ease: Phaser.Math.Easing.Sine.InOut,
        yoyo: true,
        repeat: -1,
      });
    }
  }

  async absorb() {
    const promises: Promise<unknown>[] = [];

    for (const object of this.list as GameObjects.Sprite[]) {
      promises.push(
        new Promise((resolve) =>
          absorbFunction(this.scene, {
            object,
            offset: { x: 0, y: 128 },
            delayModifier: Phaser.Math.RND.between(0, 2),
            point: this.portal.point,
            durationOffset: 1500,
            onComplete: () => {
              object.destroy();
              resolve(true);
            },
          })
        )
      );
    }

    await Promise.all(promises);
  }
}

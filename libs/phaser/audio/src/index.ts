import { CharityGamesPlugin } from '@worksheets/phaser/plugins';
import { Point } from '@worksheets/phaser/types';
import * as Phaser from 'phaser';

export type AudioButtonOptions = {
  server: CharityGamesPlugin;
  storageKey: string;
  offTexture: string;
  onTexture: string;
  audio: string;
} & Point;

export class AudioButton extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    {
      offTexture,
      onTexture,
      audio,
      storageKey,
      server,
      x,
      y,
    }: AudioButtonOptions
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    const update = (muted: boolean, initializing = false) => {
      scene.sound.mute = muted;
      server.storage.push(storageKey, muted);
      sprite.setTexture(muted ? offTexture : onTexture);

      if (!initializing) scene.sound.play(audio);
    };

    const sprite = scene.add
      .sprite(0, 0, offTexture)
      .setInteractive()
      .on('pointerup', () => {
        update(!scene.sound.mute);
      });

    const muted = server.storage.get(storageKey, false);

    update(muted, true);

    this.add([sprite]);
  }
}

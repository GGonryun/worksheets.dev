import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { lightning } from '../settings';
import { Button } from './button';
import { Typography } from './typography';

export class LightningButton extends Button {
  x: number;
  y: number;
  emitter: Phaser.GameObjects.Particles.ParticleEmitter;
  typography: Typography;
  strikes: number;
  canRecharge: boolean;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const size = 48;
    super(scene, x, y, size, 'pink', {
      texture: 'icon_lightning',
      scale: 0.15,
    });
    this.scene = scene;
    this.canRecharge = true;
    this.strikes = lightning.defaultStrikes;
    this.x = x;
    this.y = y;

    this.emitter = scene.add.particles(
      x + size / 2,
      y + size / 2,
      'icon_lightning',
      {
        lifespan: 600,
        speed: { min: 150, max: 250 },
        scale: { start: 0.1, end: 0 },
        rotate: { start: -720, end: 720, random: true },
        alpha: { start: 1, end: 0 },
        tint: 0xffffff,
        emitting: false,
      }
    );

    this.typography = new Typography(
      scene,
      x + size / 2,
      y + size + 12,
      `${this.strikes}x`,
      18
    );

    this.onClick(async () => {
      await this.handler();
      scene.sound.play('thunder');
    });
  }

  switchToAdButton() {
    this.sprite.setTexture('icon_ad');
    this.typography.setText(`WATCH\nAD +${lightning.adStrikes}`);
  }

  switchToLightningButton() {
    this.sprite.setTexture('icon_lightning');
    this.setText(`${this.strikes}x`);
  }

  async handler() {
    if (!this.strikes && this.canRecharge) return await this.adHandler();

    this.strikes -= 1;
    this.setText(`${this.strikes}x`);
    if (!this.strikes) {
      if (this.canRecharge) {
        this.switchToAdButton();
      } else {
        this.disable();
      }
    }
    this.emitter.explode(16);
  }

  async adHandler() {
    const server = CharityGamesPlugin.find(this.scene);
    server.advertisements.show({
      type: 'reward',
      name: 'revive',
      adBreakDone: () => {
        this.canRecharge = false;
        this.strikes = lightning.adStrikes;
        this.switchToLightningButton();
      },
    });
  }

  enable() {
    if (this.enabled || !this.strikes) return this;

    super.enable();
    this.emitter.explode(16);
    return this;
  }

  setText(text: string) {
    this.typography.setText(text);
    return this;
  }
}

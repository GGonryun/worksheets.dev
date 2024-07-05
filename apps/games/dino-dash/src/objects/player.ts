import { INDEX_TO_CHARACTER } from '../data/characters';
import { JUMP_POWER } from '../data/settings';
import { getCharacterSelection } from '../data/storage';
import { Game } from '../scenes/game';

export class Player extends Phaser.GameObjects.Sprite {
  jumpTween?: Phaser.Tweens.Tween;
  fallTween?: Phaser.Tweens.Tween;
  jumps = 0;
  invincible = false;

  constructor(scene: Game, x: number, y: number) {
    if (!scene.server) throw new Error('Server not found');
    const player = getCharacterSelection(scene.server);
    const character = INDEX_TO_CHARACTER[player];
    const run = character.sprites.run.key;
    super(scene, x, y, run);
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(1);

    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.setSize(16, character.collider.height);
      this.body.setOffset(8, character.collider.offset);
      this.body.setCollideWorldBounds(true);
      this.body.mass = 10;
      this.body.setDragY(10);
    }

    this.play({ key: run, repeat: -1 });
  }

  jump() {
    const body: Phaser.Physics.Arcade.Body | undefined =
      this?.body instanceof Phaser.Physics.Arcade.Body ? this.body : undefined;
    if (!body) return false;

    if (!body.blocked.down) {
      body.setVelocityY(JUMP_POWER * 0.5);
      return false;
    }
    body.setVelocityY(-JUMP_POWER);
    this.fallTween?.stop();
    this.scaleX = 1;
    this.scaleY = 1;
    this.jumpTween = this.scene.tweens.add({
      targets: this,
      duration: 100,
      scaleX: 1.3,
      scaleY: 0.7,
      yoyo: true,
    });
    this.jumps += 1;
    return true;
  }

  fall() {
    const body: Phaser.Physics.Arcade.Body | undefined =
      this?.body instanceof Phaser.Physics.Arcade.Body ? this.body : undefined;
    if (!body) return;

    this.jumpTween?.stop();
    this.scaleX = 1;
    this.scaleY = 1;
    this.fallTween = this.scene.tweens.add({
      targets: this,
      duration: 50,
      scaleX: 1.2,
      scaleY: 0.8,
      yoyo: true,
    });
  }

  async blink() {
    this.invincible = true;
    this.setTint(0xff0000);
    return new Promise<void>((resolve) =>
      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        duration: 75,
        repeat: 7,
        yoyo: true,
        onComplete: () => {
          this.invincible = false;
          resolve();
          this.setTint(undefined);
        },
      })
    );
  }
}

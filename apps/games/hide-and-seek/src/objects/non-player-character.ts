import { waitFor } from '@worksheets/util/time';

import { Coordinate } from '../types';
import { CHARACTER_SPEEDS, Depths, MovementSpeed } from '../util';
import { Room } from './room';

class PlayerStatus extends Phaser.GameObjects.Sprite {
  scene: Phaser.Scene;
  tween: Phaser.Tweens.Tween;
  static originalY = -14;
  constructor(scene: Phaser.Scene) {
    super(scene, 0, PlayerStatus.originalY, 'pointer_yellow');
    this.scene = scene;
    scene.add.existing(this);
    this.tween = scene.tweens.add({
      targets: this,
      y: PlayerStatus.originalY - 4,
      duration: 250,
      yoyo: true,
      repeat: -1,
    });
  }

  setStatus(status: 'right' | 'wrong') {
    this.tween.stop();
    this.setTexture(status === 'right' ? 'check' : 'cross');
    this.setY(PlayerStatus.originalY);
  }

  playTween() {
    this.tween = this.scene.tweens.add({
      targets: this,
      y: PlayerStatus.originalY - 4,
      duration: 250,
      yoyo: true,
      repeat: -1,
    });
  }

  reset() {
    this.playTween();
    this.setTexture('pointer_yellow');
    this.setY(PlayerStatus.originalY);
  }
}

export class NonPlayerCharacter extends Phaser.GameObjects.Container {
  static size = 16;
  static numMaleSprites = 15;
  static numFemaleSprites = 15;
  scene: Phaser.Scene;
  character: Phaser.GameObjects.Sprite;
  status: PlayerStatus;
  code: string;
  room: Room;
  #speed = CHARACTER_SPEEDS[MovementSpeed.WALKING];
  #origin = { x: 16, y: 16 };

  static image(key: string) {
    return `npc_${key}`;
  }

  static idle(key: string) {
    return `${NonPlayerCharacter.image(key)}_idle`;
  }

  static walk(key: string) {
    return `${NonPlayerCharacter.image(key)}_walk`;
  }

  constructor(scene: Phaser.Scene, room: Room, code: string) {
    super(scene, 0, 0);
    this.room = room;
    this.scene = scene;
    this.code = code;

    this.setDepth(Depths.PLAYER);
    this.placeAt(room.walls.left);

    this.character = scene.add.sprite(0, 0, NonPlayerCharacter.image(code));

    this.character.setDisplayOrigin(this.#origin.x, this.#origin.y);
    this.character.play({ key: NonPlayerCharacter.idle(code), repeat: -1 });
    this.character.setInteractive();
    this.character.on('pointerdown', () => {
      scene.events.emit('player:click', this);
    });

    this.status = new PlayerStatus(scene);

    this.add(this.status);
    this.add(this.character);

    scene.add.existing(this);
  }

  setStatus(status: 'right' | 'wrong') {
    this.status.setStatus(status);
    this.character.removeInteractive();
  }

  setRoom(room: Room) {
    this.room = room;
  }

  placeAt(point: Coordinate) {
    this.setPosition(point.x, point.y);
  }

  destroy() {
    this.scene.tweens.killTweensOf(this);
    this.character.setActive(false);
    this.character.destroy();
    this.status.destroy();
  }

  async wander() {
    const loop = async () => {
      await this.pace();
      await this.travel();
    };

    // eslint-disable-next-line no-constant-condition
    while (this.character.active) {
      await loop();
    }
  }
  async pace() {
    const pacing = Phaser.Math.RND.pick([true, true, false, false]);
    if (pacing) await this.room.pace(this);
  }

  async travel() {
    const traveling = Phaser.Math.RND.pick([true, true, true, false]);
    if (traveling) await this.room.travel(this);
  }

  async idle(duration: number) {
    if (!this.character.active) return;

    this.character.play({
      key: NonPlayerCharacter.idle(this.code),
      repeat: -1,
    });
    await waitFor(duration);
  }

  async face(point: Coordinate) {
    if (this.x > point.x) {
      this.character.setFlipX(true);
    } else {
      this.character.setFlipX(false);
    }
  }

  async movement(point: Coordinate) {
    if (!this.character.active) return;

    this.face(point);
    this.character.play({
      key: NonPlayerCharacter.walk(this.code),
      repeat: -1,
    });
    const distance = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      point.x,
      point.y
    );
    const duration = distance / this.#speed;
    return new Promise((resolve) =>
      this.scene.tweens.add({
        targets: this,
        x: point.x,
        y: point.y,
        duration,
        onComplete: () => {
          if (this.character.active)
            this.character.play({
              key: NonPlayerCharacter.idle(this.code),
              repeat: -1,
            });
          resolve(true);
        },
      })
    );
  }

  setSpeed(speed: MovementSpeed) {
    this.#speed = CHARACTER_SPEEDS[speed];
  }

  static preload(scene: Phaser.Scene) {
    for (const sprite of this.sprites) {
      this.loadSpritesheet(scene, sprite);
    }
  }

  static loadSpritesheet(scene: Phaser.Scene, key: string) {
    scene.load.spritesheet(
      NonPlayerCharacter.image(key),
      `assets/spritesheets/npc/${key}.png`,
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
  }

  static create(scene: Phaser.Scene) {
    for (const sprite of this.sprites) {
      this.createAnimations(scene, sprite);
    }
  }

  static createAnimations(scene: Phaser.Scene, code: string) {
    scene.anims.create({
      key: NonPlayerCharacter.walk(code),
      frameRate: 6,
      frames: scene.anims.generateFrameNumbers(NonPlayerCharacter.image(code), {
        start: 0,
        end: 3,
      }),
    });
    scene.anims.create({
      key: NonPlayerCharacter.idle(code),
      frameRate: 6,
      frames: scene.anims.generateFrameNumbers(NonPlayerCharacter.image(code), {
        start: 5,
        end: 7,
      }),
    });
  }

  static get sprites() {
    return [
      'male_1',
      'male_2',
      'male_3',
      'male_4',
      'male_5',
      'male_6',
      'male_7',
      'male_8',
      'male_9',
      'male_10',
      'male_11',
      'male_12',
      'male_13',
      'male_14',
      'male_15',
      'male_16',
      'male_17',
      'male_18',
      'male_19',
      'male_20',
      'male_21',
      'male_22',
      'female_1',
      'female_2',
      'female_3',
      'female_4',
      'female_5',
      'female_6',
      'female_7',
      'female_8',
      'female_9',
      'female_10',
      'female_11',
      'female_12',
      'female_13',
      'female_14',
      'female_15',
      'female_16',
      'female_17',
      'female_18',
      'female_19',
      'female_20',
      'female_21',
      'female_22',
      'special_1',
      'special_2',
      'special_3',
      'special_4',
      'special_5',
      'special_6',
      'special_7',
      'special_8',
      'special_9',
      'special_10',
      'special_11',
    ];
  }
}

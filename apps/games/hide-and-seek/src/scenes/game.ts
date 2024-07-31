import { Building } from '../objects/building';
import { Camera } from '../objects/camera';
import { Controls } from '../objects/controls';
import { NonPlayerCharacter } from '../objects/non-player-character';
import { Room } from '../objects/room';
import { UserInterface } from './user-interface';

export class Game extends Phaser.Scene {
  blur?: Phaser.FX.Blur;
  controls!: Controls;
  building!: Building;
  characters: NonPlayerCharacter[] = [];

  constructor() {
    super('game');
  }

  async create() {
    this.setupEvents();
    this.characters = [];

    this.building = new Building(this);
    Camera.create(this, this.building);
    this.scene.launch('instructions');
  }

  spawn() {
    for (const sprite of NonPlayerCharacter.sprites) {
      const room = this.building.getRoom(Room.random());
      const character = new NonPlayerCharacter(this, room, sprite);
      this.characters.push(character);
      character.wander();
    }
  }

  reset() {
    for (const character of this.characters) {
      character.destroy();
    }
    this.characters = [];
  }

  setupEvents() {
    this.events.on('game:over', (data: object) => {
      this.scene.pause('game');
      this.scene.stop('user-interface');
      this.scene.launch('game-over', data);
    });

    this.events.on('game:start', () => {
      this.scene.resume('game');
      this.scene.stop('instructions');
      this.scene.launch('user-interface');
      this.spawn();
    });

    this.events.on('player:click', (npc: NonPlayerCharacter) => {
      const targets = this.registry.get('targets');

      if (targets.includes(npc.code)) {
        npc.setStatus('right');
        this.sound.play('right');
        this.events.emit(UserInterface.eventPlayerFound, npc.code);
      } else {
        npc.setStatus('wrong');
        this.sound.play('wrong');
        this.events.emit(UserInterface.eventPlayerNotFound);
      }
    });

    this.events.on('game:restart', () => {
      this.scene.stop('game-over');
      this.reset();
      this.scene.launch('instructions');
    });

    this.events.on('pause', () => {
      if (!this.blur) {
        this.blur = this.cameras.main.postFX.addBlur(0, 1, 1, 1, 0xf1f1f1, 8);
      }
    });

    this.events.on('resume', () => {
      if (this.blur) {
        this.cameras.main.postFX.remove(this.blur);
        this.blur = undefined;
        this.scene.launch('user-interface');
      }
    });

    this.events.once('shutdown', () => {
      this.events.off('resume');
      this.events.off('pause');
      this.events.off('revive');
      this.events.off('player:click');
      this.events.off('game:over');
      this.events.off('game:start');
      this.events.off('game:restart');
      this.blur = undefined;
    });
  }
}

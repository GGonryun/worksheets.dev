import { RectangleObject } from '../types';
import { DEBUGGING, Depths, MovementSpeed, TILE_SIZE } from '../util';
import { Door } from './door';
import { Elevator } from './elevator';
import { NonPlayerCharacter } from './non-player-character';
import { Room } from './room';
import { Staircase } from './staircase';

export class Building {
  static MAP_KEY = 'building';
  scene: Phaser.Scene;
  rooms: Room[];
  elevators: Elevator[];
  staircases: Staircase[];
  doors: Door[];

  tilemap: Phaser.Tilemaps.Tilemap;

  pointsLayer: Phaser.Tilemaps.ObjectLayer;
  wallpaperLayer: Phaser.Tilemaps.TilemapLayer;
  infraLayer: Phaser.Tilemaps.TilemapLayer;
  furn1Layer: Phaser.Tilemaps.TilemapLayer;
  furn2Layer: Phaser.Tilemaps.TilemapLayer;
  furn3Layer: Phaser.Tilemaps.TilemapLayer;
  transportLayer: Phaser.Tilemaps.TilemapLayer;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.rooms = [];
    this.elevators = [];
    this.staircases = [];
    this.doors = [];
    this.tilemap = scene.make.tilemap({ key: Building.MAP_KEY });

    /** Tileset Images **/
    const wallpaperTiles = this.tilemap.addTilesetImage(
      'wallpaper',
      'wallpaper'
    );
    if (!wallpaperTiles) throw new Error('Wallpaper tiles not found');

    const infraTiles = this.tilemap.addTilesetImage(
      'infrastructure',
      'infrastructure'
    );
    if (!infraTiles) throw new Error('Infrastructure tiles not found');

    const furnTiles = this.tilemap.addTilesetImage('furniture', 'furniture');
    if (!furnTiles) throw new Error('Furniture tiles not found');

    const objectTiles = this.tilemap.addTilesetImage('objects', 'objects');
    if (!objectTiles) throw new Error('Object tiles not found');

    const gamerTiles = this.tilemap.addTilesetImage('gamer', 'gamer');
    if (!gamerTiles) throw new Error('Gamer tiles not found');

    const fire = this.tilemap.addTilesetImage('fire', 'fire');
    if (!fire) throw new Error('Fire tiles not found');

    const halloweenTiles = this.tilemap.addTilesetImage(
      'halloween',
      'halloween'
    );
    if (!halloweenTiles) throw new Error('Halloween tiles not found');

    const museumTiles = this.tilemap.addTilesetImage('museum', 'museum');
    if (!museumTiles) throw new Error('Museum tiles not found');

    const policeTiles = this.tilemap.addTilesetImage('police', 'police');
    if (!policeTiles) throw new Error('Police tiles not found');

    const winterTiles = this.tilemap.addTilesetImage('winter', 'winter');
    if (!winterTiles) throw new Error('Winter tiles not found');

    const tiles = [
      wallpaperTiles,
      infraTiles,
      furnTiles,
      objectTiles,
      fire,
      gamerTiles,
      halloweenTiles,
      museumTiles,
      policeTiles,
      winterTiles,
    ];

    /** Layers **/
    const wallpaperLayer = this.tilemap.createLayer('wallpaper', tiles);
    if (!wallpaperLayer) throw new Error('Wallpaper layer not found');
    this.wallpaperLayer = wallpaperLayer;

    const furn1 = this.tilemap.createLayer('furniture1', tiles);
    if (!furn1) throw new Error('Furniture 1 layer not found');
    this.furn1Layer = furn1;

    const furn2 = this.tilemap.createLayer('furniture2', tiles);
    if (!furn2) throw new Error('Furniture 2 layer not found');
    this.furn2Layer = furn2;

    const furn3 = this.tilemap.createLayer('furniture3', tiles);
    if (!furn3) throw new Error('Furniture 3 layer not found');
    this.furn3Layer = furn3;

    const transport = this.tilemap.createLayer('transport', tiles);
    if (!transport) throw new Error('Transport layer not found');
    transport.setDepth(Depths.INTERACTING);
    this.transportLayer = transport;

    const infraLayer = this.tilemap.createLayer('frame', tiles);
    if (!infraLayer) throw new Error('Frame layer not found');
    this.infraLayer = infraLayer;

    const pointsLayer = this.tilemap.getObjectLayer('points');
    if (!pointsLayer) throw new Error('Paths layer not found');
    this.pointsLayer = pointsLayer;

    this.createRooms();
    this.createElevators();
    this.createStaircases();
    this.createDoors();

    DEBUGGING && this.debug(scene);
  }

  iterateRectangles(fn: (rectangle: RectangleObject) => void) {
    this.pointsLayer.objects.forEach((point) => {
      const { x, y, height, width, name, rectangle } = point;
      if (!rectangle) return; // ignore objects that aren't rectangles
      if (x == null || y == null || width == null || height == null)
        throw new Error(`Point ${name} properties not found`);
      fn({ name, x, y, height, width });
    });
  }

  debug(scene: Phaser.Scene) {
    this.iterateRectangles((area) => {
      const { x, y, width, height } = area;
      const graphics = scene.add.graphics({
        x,
        y,
      });
      graphics.setDepth(1000);
      graphics.lineStyle(1, 0xff0000);
      graphics.strokeRect(0, 0, width, height);
    });
  }

  getRoom(code: string) {
    const room = this.rooms.find((room) => room.code === code);
    if (!room) throw new Error(`Room ${code} not found`);
    return room;
  }

  createRooms() {
    this.rooms = [];

    this.iterateRectangles((area) => {
      this.rooms.push(new Room(this, area));
    });
  }

  getTilesWithin(
    layer: Phaser.Tilemaps.TilemapLayer,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    return layer.getTilesWithin(
      x / TILE_SIZE,
      y / TILE_SIZE,
      width / TILE_SIZE,
      height / TILE_SIZE
    );
  }

  createElevators() {
    this.iterateRectangles((area) => {
      const tiles = this.getTilesWithin(
        this.transportLayer,
        area.x,
        area.y,
        area.width,
        area.height
      );

      const elevator = tiles.find((t) => t.properties?.elevator);
      if (elevator) {
        this.elevators.push(
          new Elevator(this, area.name, elevator.pixelX, elevator.pixelY)
        );
      }
    });
  }

  createStaircases() {
    this.iterateRectangles((area) => {
      const tiles = this.getTilesWithin(
        this.transportLayer,
        area.x,
        area.y,
        area.width,
        area.height
      );

      const staircase = tiles.find((t) => t.properties?.staircase);
      if (staircase) {
        const anchor = staircase.properties?.staircase as 'top' | 'bottom';
        this.staircases.push(
          new Staircase(
            this,
            area.name,
            anchor,
            staircase.flipX,
            staircase.pixelX,
            staircase.pixelY
          )
        );
      }
    });
  }

  createDoors() {
    this.iterateRectangles((area) => {
      const tiles = this.getTilesWithin(
        this.infraLayer,
        area.x,
        area.y,
        area.width,
        area.height
      );

      const doors = tiles.filter((t) => t.properties?.door);
      for (const door of doors) {
        if (door) {
          const anchor = door.properties?.door as 'left' | 'right';
          this.doors.push(
            new Door(this, area.name, anchor, door.pixelX, door.pixelY)
          );
        }
      }
    });
  }

  async travel(npc: NonPlayerCharacter, room: Room) {
    const travelOptions = room.travelOptions();

    const possibleOptions = Object.values(travelOptions).filter(
      (option) => option
    ) as (Staircase | Elevator | Door)[];

    const option = Phaser.Math.RND.pick(possibleOptions);

    if (option instanceof Staircase && !option.inUse) {
      return await this.travelStaircase(npc, option);
    }

    if (option instanceof Elevator && !option.inUse) {
      return await this.travelElevator(npc, option);
    }

    if (option instanceof Door && !option.inUse) {
      return await this.travelDoor(npc, option);
    }
  }

  async travelDoor(npc: NonPlayerCharacter, startingDoor: Door) {
    const endingDoor = this.doors.find(
      (door) =>
        door.roomId ===
          (startingDoor.anchor === 'left'
            ? Room.left(startingDoor.roomId)
            : Room.right(startingDoor.roomId)) &&
        door.anchor !== startingDoor.anchor
    );

    if (!endingDoor) throw new Error('Door pair not found');

    startingDoor.inUse = true;
    endingDoor.inUse = true;

    const startingRoom = this.getRoom(startingDoor.roomId);
    await npc.movement(startingRoom.walls[startingDoor.anchor]);
    await Promise.all([startingDoor.open(), endingDoor.open()]);
    const endingRoom = this.getRoom(endingDoor.roomId);
    await npc.movement(endingRoom.walls[endingDoor.anchor]);
    npc.setRoom(endingRoom);
    await Promise.all([startingDoor.close(), endingDoor.close()]);

    startingDoor.inUse = false;
    endingDoor.inUse = false;
  }

  async travelStaircase(npc: NonPlayerCharacter, startingStaircase: Staircase) {
    const endingStaircase = this.staircases.find(
      (staircase) =>
        staircase.roomId ===
          (startingStaircase.anchor === 'bottom'
            ? Room.above(startingStaircase.roomId)
            : Room.below(startingStaircase.roomId)) &&
        staircase.anchor !== startingStaircase.anchor
    );

    if (!endingStaircase) throw new Error('Staircase pair not found');

    startingStaircase.inUse = true;
    endingStaircase.inUse = true;
    await npc.movement(startingStaircase.point);
    npc.setDepth(Depths.BACKGROUND);
    npc.setSpeed(MovementSpeed.CLIMBING);
    await npc.movement(endingStaircase.point);
    npc.setSpeed(MovementSpeed.WALKING);
    npc.setRoom(this.getRoom(endingStaircase.roomId));
    npc.setDepth(Depths.PLAYER);
    startingStaircase.inUse = false;
    endingStaircase.inUse = false;
  }

  async travelElevator(npc: NonPlayerCharacter, startingElevator: Elevator) {
    const available = this.elevators
      .filter((e) => e.roomId !== startingElevator.roomId)
      .filter((e) => !e.inUse);

    if (!available.length) return;

    const endingElevator = Phaser.Math.RND.pick(available);
    startingElevator.inUse = true;
    endingElevator.inUse = true;

    await npc.movement(startingElevator.center);
    await startingElevator.open();
    npc.setDepth(Depths.INTERACTING);
    await startingElevator.close();
    npc.placeAt(endingElevator.center);
    await npc.idle(1000);
    npc.setRoom(this.getRoom(endingElevator.roomId));
    await endingElevator.open();
    npc.setDepth(Depths.PLAYER);
    await endingElevator.close();

    startingElevator.inUse = false;
    endingElevator.inUse = false;
  }
}

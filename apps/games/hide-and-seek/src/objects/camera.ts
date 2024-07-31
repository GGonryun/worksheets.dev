import { Building } from './building';

export class Camera {
  static create(scene: Phaser.Scene, building: Building) {
    // constrain the camera to the map
    const camera = scene.cameras.main;
    if (!camera) throw new Error('Camera not found');
    camera.setBounds(
      0,
      0,
      building.tilemap.widthInPixels,
      building.tilemap.heightInPixels
    );
  }
}

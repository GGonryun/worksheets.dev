import * as Phaser from 'phaser';

export const getCenterOfCamera = (camera: Phaser.Cameras.Scene2D.Camera) => {
  return {
    x: camera.centerX,
    y: camera.centerY,
  };
};

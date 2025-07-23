import {
  PositiveNumber,
  PositiveWholeNumber,
} from '@worksheets/phaser/numbers';

import { CarType } from './car';

export class GameConfiguration {
  player: CarType;
  speedMultiplier: PositiveNumber;
  targetDistance: PositiveWholeNumber;
  minimumSpeed: PositiveWholeNumber;
  maxFuel: PositiveNumber;
  enemySpeeds: {
    minimum: PositiveWholeNumber;
    maximum: PositiveWholeNumber;
  };
  clickPower: PositiveNumber;
  gearThreshold: PositiveWholeNumber;
  clickPowerGrowth: PositiveNumber;
  maxGear: PositiveWholeNumber;
  duration: PositiveNumber;
  clicks: PositiveWholeNumber;
  topSpeed: PositiveWholeNumber;

  constructor(player: CarType) {
    this.player = player;
    this.speedMultiplier = PositiveNumber.of(0.016);
    this.targetDistance = PositiveWholeNumber.of(2500);
    this.minimumSpeed = PositiveWholeNumber.of(64);
    this.enemySpeeds = {
      minimum: PositiveWholeNumber.of(100),
      maximum: PositiveWholeNumber.of(200),
    };
    this.clickPower = PositiveNumber.of(3);
    this.clickPowerGrowth = PositiveNumber.of(0.02);
    this.gearThreshold = PositiveWholeNumber.of(30);
    this.maxGear = PositiveWholeNumber.of(5);
    this.maxFuel = PositiveNumber.of(30); // seconds
    this.duration = PositiveNumber.of(0);
    this.clicks = PositiveWholeNumber.of(0);
    this.topSpeed = PositiveWholeNumber.of(0);
  }
}

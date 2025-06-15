import { TypedEventEmitter } from '@worksheets/phaser/events';
import { CharityGamesPlugin } from '@worksheets/phaser/plugins';
import { uniqueArray } from '@worksheets/util/arrays';
import { keysOf } from '@worksheets/util/objects';

import { GAME_HEIGHT, GAME_WIDTH } from '../../settings';
import {
  COLORS_HEX,
  ElementDepths,
  MAX_UNIQUE_RELICS,
  SCENE_TRANSITION_SPEED,
  TILE_SPRITES,
} from '../combat/constants';
import { PARTICLE_TEXTURES } from '../combat/particles';
import { CombatReport } from '../combat/report';
import { TileType } from '../combat/types';
import { MainMenuScene } from '../main-menu/scene';
import { ORB_SPRITES, OrbType } from '../orbs/data';
import { RELICS } from '../relics/data';
import { RelicKey } from '../relics/types';
import { RegistryKey } from '../util/_unsorted';
import { generateEquidistantPoints } from '../util/spacing';

type SavedStats = {
  highScore: number;
  relicsSeen: number;
  totalOrbs: number;
  totalMatches: number;
  totalTiles: number;
};
type ConstellationSceneOptions = {
  relics: RelicKey[];
  report: CombatReport;
  turns: number;
};
const BASE_FONT_STYLE = {
  fontSize: '64px',
  stroke: '#000000',
  strokeThickness: 8,
  color: '#ffffff',
  fontStyle: 'bold',
};
export class ConstellationScene extends Phaser.Scene {
  static Key = 'ConstellationScene';
  particles: Phaser.GameObjects.Particles.ParticleEmitter;
  options: ConstellationSceneOptions;
  bus: TypedEventEmitter<{ 'star-animation-complete': [] }>;
  server: CharityGamesPlugin;

  constructor() {
    super({ key: ConstellationScene.Key });
  }

  static launch({ scene }: Phaser.Scene, options: ConstellationSceneOptions) {
    scene.launch(ConstellationScene.Key, options);
  }

  create(options: ConstellationSceneOptions) {
    this.server = CharityGamesPlugin.find(this);
    this.bus = new TypedEventEmitter();
    this.options = options;

    const stats = this.storeData();

    this.submitAchievements(stats);
    this.submitLeaderboard();

    this.server.storage.save();

    this.particles = this.add.particles(0, 0, PARTICLE_TEXTURES['YELLOW'], {
      quantity: 1,
      speed: { random: [50, 300] },
      lifespan: { random: [100, 1000] },
      scale: { random: true, start: 0.5, end: 0 },
      rotate: { min: 0, max: 360 },
      angle: { min: 0, max: 360 },
      frequency: 50,
      blendMode: Phaser.BlendModes.ADD,
      emitting: false,
    });

    this.animateStar();

    this.bus.on('star-animation-complete', () => {
      this.levelCompleteText();
      this.relicsSpawn();
      this.tilesSpent();
      this.exitButton();
    });

    this.cameras.main.fadeIn(SCENE_TRANSITION_SPEED, 255, 255, 255);
  }

  storeData(): SavedStats {
    const highScore = this.server.storage.set<number>(
      RegistryKey.HIGH_SCORE,
      (prev) => Math.max(this.options.report.score, prev),
      0
    );
    const relicsSeen = this.server.storage.set<RelicKey[]>(
      RegistryKey.RELICS_SEEN,
      (prev) => uniqueArray([...prev, ...this.options.relics]),
      []
    );
    const totalOrbs = this.server.storage.set<number>(
      RegistryKey.HIGH_SCORE,
      (prev) => this.options.report.totalOrbs + prev,
      0
    );
    const totalTiles = this.server.storage.set<number>(
      RegistryKey.TOTAL_ORBS,
      (prev) => this.options.report.totalTiles + prev,
      0
    );
    const totalMatches = this.server.storage.set<number>(
      RegistryKey.TOTAL_MATCHES,
      (prev) => this.options.report.totalMatches + prev,
      0
    );

    return {
      highScore,
      relicsSeen: relicsSeen.length,
      totalOrbs,
      totalTiles,
      totalMatches,
    };
  }

  animateStar() {
    const centerX = GAME_WIDTH / 2;
    const centerY = GAME_HEIGHT / 2;

    const target = {
      x: GAME_WIDTH / 2,
      y: 100,
    };
    const targetScale = 1;

    const star = this.add.sprite(centerX, centerY, 'icons-star');
    star.setScale(20);

    const burst = this.add.sprite(centerX, centerY, 'ring-particle');
    burst.setScale(0);

    // the star tweens from the center of the screen down to the bottom and then flies to the constellation point.
    this.tweens.add({
      targets: star,
      scale: { from: 20, to: targetScale },
      alpha: { from: 0.8, to: 1 },
      ease: Phaser.Math.Easing.Sine.InOut,
      duration: SCENE_TRANSITION_SPEED,
      onComplete: () => {
        this.particles.emitParticleAt(centerX, centerY, 100);
      },
    });

    const xVals = [centerX, centerX, target.x, target.x];
    const yVals = [centerY, target.y + 300, target.y + 100, target.y];

    this.tweens.addCounter({
      from: 0,
      to: 1,
      ease: Phaser.Math.Easing.Sine.InOut,
      delay: SCENE_TRANSITION_SPEED + 250,
      duration: 2000,
      onUpdate: (tween) => {
        const v = tween.getValue();
        const x = Phaser.Math.Interpolation.CatmullRom(xVals, v);
        const y = Phaser.Math.Interpolation.CatmullRom(yVals, v);
        star.setPosition(x, y);
        this.particles.emitParticleAt(x, y, 5);
      },
      onComplete: () => {
        burst.setPosition(star.x, star.y);
        this.tweens.chain({
          targets: star,
          tweens: [
            {
              scale: star.scale * 1.5,
              duration: 100,
              ease: Phaser.Math.Easing.Cubic.InOut,
              onStart: () => {
                star.setTintFill(0xffffff);
              },
              onComplete: () => {
                this.cameras.main.flash(100, 255, 255, 255);
                this.tweens.add({
                  targets: burst,
                  scale: { from: 0, to: 3 },
                  alpha: { from: 1, to: 0 },
                  ease: Phaser.Math.Easing.Cubic.Out,
                  duration: 1500,
                });
              },
            },
            {
              scale: star.scale,
              duration: 100,
              ease: Phaser.Math.Easing.Cubic.InOut,
              onComplete: () => {
                star.clearTint();
                this.cameras.main.shake(200, 0.01);
                this.particles.emitParticleAt(star.x, star.y, 500);
                const clone = this.add
                  .sprite(star.x, star.y, 'icons-star')
                  .setDepth(ElementDepths.MAX);
                this.tweens.add({
                  targets: clone,
                  scale: { from: 1, to: 3 },
                  alpha: { from: 1, to: 0 },
                  ease: Phaser.Math.Easing.Cubic.Out,
                  duration: 500,
                  onComplete: () => {
                    this.tweens.add({
                      targets: star,
                      scale: { from: 1, to: 1.05 },
                      duration: 250,
                      yoyo: true,
                      repeat: -1,
                      ease: Phaser.Math.Easing.Cubic.InOut,
                    });
                    this.bus.emit('star-animation-complete');
                    clone.destroy();
                  },
                });
              },
            },
          ],
        });
      },
    });
  }

  levelCompleteText() {
    const targetY = 220;
    const text = this.add
      .text(GAME_WIDTH / 2, -64, 'Game Over!', BASE_FONT_STYLE)
      .setOrigin(0.5, 0.5);

    this.tweens.add({
      targets: text,
      y: targetY,
      duration: SCENE_TRANSITION_SPEED,
      ease: Phaser.Math.Easing.Cubic.Out,
    });
  }

  relicsSpawn() {
    const points = generateEquidistantPoints(
      MAX_UNIQUE_RELICS / 2,
      GAME_WIDTH,
      64,
      GAME_HEIGHT - 160
    );
    this.options.relics.forEach((relic, i) => {
      const r = new RelicReportCardIcon(this, relic);
      const index = i % points.length;
      const row = Math.floor(i / points.length);
      r.setPosition(points[index].x, points[index].y + row * 92);
      r.setAlpha(0);
      r.setScale(0);
      this.tweens.add({
        targets: r,
        x: { from: GAME_WIDTH / 2, to: points[index].x },
        y: { from: GAME_HEIGHT + 128, to: points[index].y + row * 92 },
        scale: { from: 0, to: 0.6 },
        alpha: { from: 0, to: 1 },
        ease: Phaser.Math.Easing.Cubic.Out,
        duration: 500,
        delay: i * 100,
      });
      this.add.existing(r);
    });
  }

  tilesSpent() {
    const offsetX = 32;
    const offsetY = 350;
    const items: (
      | Phaser.GameObjects.Sprite
      | Phaser.GameObjects.Text
      | Phaser.GameObjects.Container
    )[] = [];
    keysOf(TILE_SPRITES).forEach((key, i) => {
      const value = this.options.report.tilesSpent[key] ?? 0;
      const spent = new TileSpentCount(this, key, value);
      const columns = 9;
      const x = (i % columns) * 78 + offsetX;
      const y = Math.floor(i / columns) * 64 + offsetY;
      spent.setPosition(x, y);
      spent.setScale(0.4);
      this.add.existing(spent);
      items.push(spent);
    });
    keysOf(ORB_SPRITES).forEach((key, i) => {
      const value = this.options.report.orbsCollected[key] ?? 0;
      const spent = new OrbCollectedCount(this, key, value);
      const columns = 9;
      const x = (i % columns) * 78 + offsetX;
      const y = Math.floor(i / columns) * 64 + offsetY + 50;
      spent.setPosition(x, y);
      spent.setScale(0.4);
      this.add.existing(spent);
      items.push(spent);
    });

    items.push(
      this.add
        .text(
          offsetX - 12,
          offsetY + 120,
          `Tiles Collected:\t\t\t\t\t\t\t\t\t\t\t${this.options.report.totalTiles} tiles`,
          BASE_FONT_STYLE
        )
        .setScale(0.4)
    );
    items.push(
      this.add
        .text(
          offsetX - 12,
          offsetY + 160,
          `Orbs Collected:\t\t\t\t\t\t\t\t\t\t\t\t${this.options.report.totalOrbs} orbs`,
          BASE_FONT_STYLE
        )
        .setScale(0.4)
    );
    items.push(
      this.add
        .text(
          offsetX - 12,
          offsetY + 280,
          `Turns Taken:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t${this.options.turns} turns`,
          BASE_FONT_STYLE
        )
        .setScale(0.4)
    );
    items.push(
      this.add
        .text(
          offsetX - 12,
          offsetY + 200,
          `Largest Combo:\t\t\t\t\t\t\t\t\t\t\t\t\t${this.options.report.largestCombo} tiles`,
          BASE_FONT_STYLE
        )
        .setScale(0.4)
    );
    items.push(
      this.add
        .text(
          offsetX - 12,
          offsetY + 240,
          `Largest Cascade:\t\t\t\t\t\t\t\t\t\t\t${this.options.report.largestCascade} tiles`,
          BASE_FONT_STYLE
        )
        .setScale(0.4)
    );
    items.push(
      this.add
        .text(
          offsetX - 12,
          offsetY + 360,
          `Relics Activated:\t\t\t\t\t\t\t\t\t\t${this.options.report.totalRelicActivation} relics`,
          BASE_FONT_STYLE
        )
        .setScale(0.4)
    );
    items.push(
      this.add
        .text(
          offsetX - 12,
          offsetY + 500,
          `Total Score:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t${this.options.report.score} points`,
          BASE_FONT_STYLE
        )
        .setScale(0.4)
    );

    for (const item of items) {
      item.setAlpha(0);
      this.tweens.add({
        targets: item,
        alpha: 1,
        y: { from: -64, to: item.y },
        duration: SCENE_TRANSITION_SPEED,
        ease: Phaser.Math.Easing.Cubic.Out,
      });
    }
  }

  exitButton() {
    const button = this.add
      .sprite(-64, -64, 'icons-back')
      .setInteractive()
      .setDepth(ElementDepths.MAX)
      .setScale(0.8);
    button.on('pointerdown', () => {
      this.cameras.main.fadeOut(SCENE_TRANSITION_SPEED, 255, 255, 255, () => {
        MainMenuScene.start(this);
      });
    });
    this.tweens.add({
      targets: button,
      x: 64,
      y: 64,
      duration: SCENE_TRANSITION_SPEED,
      ease: Phaser.Math.Easing.Cubic.InOut,
    });
    this.tweens.add({
      targets: button,
      angle: { from: -2, to: 2 },
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: Phaser.Math.Easing.Cubic.InOut,
    });
  }

  submitLeaderboard() {
    this.server.leaderboard.submit(this.options.report.score);
  }

  submitAchievements(stats: SavedStats) {
    const { report } = this.options;
    const { largestCascade, totalSpellCasts } = report;
    const { highScore, relicsSeen, totalOrbs, totalTiles } = stats;

    const achievements: string[] = [];
    largestCascade >= 8 && achievements.push('petroglyphs:cascade-8');
    totalSpellCasts >= 25 && achievements.push('petroglyphs:spell-cast-25');
    highScore >= 5000 && achievements.push('petroglyphs:score-5000');
    highScore >= 7500 && achievements.push('petroglyphs:score-7500');
    highScore >= 10000 && achievements.push('petroglyphs:score-10000');
    relicsSeen >= 25 && achievements.push('petroglyphs:relics-25');
    relicsSeen >= 50 && achievements.push('petroglyphs:relics-50');
    relicsSeen >= 67 && achievements.push('petroglyphs:relics-67');
    totalOrbs >= 10000 && achievements.push('petroglyphs:orbs-10k');
    totalOrbs >= 50000 && achievements.push('petroglyphs:orbs-50k');
    totalOrbs >= 100000 && achievements.push('petroglyphs:orbs-100k');
    totalTiles >= 10000 && achievements.push('petroglyphs:tiles-10k');
    totalTiles >= 50000 && achievements.push('petroglyphs:tiles-50k');
    totalTiles >= 100000 && achievements.push('petroglyphs:tiles-100k');
    this.server.achievements.unlock(achievements);
  }
}

class RelicReportCardIcon extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, key: RelicKey) {
    super(scene, GAME_WIDTH / 2, GAME_HEIGHT / 2);
    const info = RELICS[key];
    const outline = this.scene.add
      .sprite(-3, 6, info.sprite)
      .setTintFill(COLORS_HEX[info.color])
      .setScale(1.05);
    const icon = this.scene.add.sprite(0, 0, info.sprite);
    this.add(outline);
    this.add(icon);

    this.setScale(0.6);
  }
}

class TileSpentCount extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, key: TileType, value: number) {
    super(scene, 0, 0);
    const icon = scene.add.sprite(0, 0, TILE_SPRITES[key]).setScale(0.6);
    const text = scene.add
      .text(84, 0, `x${value}`, BASE_FONT_STYLE)
      .setOrigin(0.5);

    this.add(icon);
    this.add(text);
  }
}

class OrbCollectedCount extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, key: OrbType, value: number) {
    super(scene, 0, 0);
    const icon = scene.add.sprite(0, 0, ORB_SPRITES[key]).setScale(0.65);
    const text = scene.add
      .text(84, 0, `x${value}`, BASE_FONT_STYLE)
      .setOrigin(0.5);

    this.add(icon);
    this.add(text);
  }
}

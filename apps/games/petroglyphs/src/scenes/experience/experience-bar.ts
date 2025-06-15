import { TypedEventEmitter } from '@worksheets/phaser/events';

import {
  ElementDepths,
  GRID_SETTINGS,
  SHOW_LEVEL_TEXT_DURATION,
} from '../combat/constants';
import { PARTICLE_TEXTURES } from '../combat/particles';
import { absorbFunction } from '../portal/portal';

export class ExperienceBar extends Phaser.GameObjects.Container {
  static BackgroundSize = GRID_SETTINGS.width - 2;
  static BorderThickness = 5;
  static BarHeight = 28;

  background: Phaser.GameObjects.Rectangle;
  bar: Phaser.GameObjects.Rectangle;
  levelText: Phaser.GameObjects.Text;
  experienceText: Phaser.GameObjects.Text;
  currentLevel: number;
  currentExperience: number;
  maxExperience: number;
  events: TypedEventEmitter<{ 'level-up': [number]; 'animation-complete': [] }>;
  tweens: (Phaser.Tweens.Tween | Phaser.Tweens.TweenChain)[];
  progression: number[];

  constructor(scene: Phaser.Scene, progression: number[]) {
    super(scene);

    this.tweens = [];

    this.events = new TypedEventEmitter();

    this.currentLevel = 1;
    this.currentExperience = 0;
    this.maxExperience = progression[this.currentLevel];
    this.progression = progression;

    this.setDepth(ElementDepths.CARD);

    this.create();
  }

  private create() {
    this.createBar();
    this.createText();
  }

  createBar() {
    const size = ExperienceBar.BackgroundSize + ExperienceBar.BorderThickness;
    this.background = new Phaser.GameObjects.Rectangle(
      this.scene,
      0,
      0,
      size,
      ExperienceBar.BarHeight + ExperienceBar.BorderThickness
    );
    this.background.setFillStyle(0xffffff);
    this.background.setStrokeStyle(ExperienceBar.BorderThickness, 0x000000);

    this.add(this.background);

    this.bar = new Phaser.GameObjects.Rectangle(
      this.scene,
      -ExperienceBar.BackgroundSize / 2,
      0,
      0,
      0
    );
    this.bar.setOrigin(0, 0.5);
    this.bar.setFillStyle(0x00ff00);

    this.add(this.bar);
  }

  createText() {
    const fontSettings = {
      fontSize: '24px',
      color: '#000000',
      fontStyle: 'bold',
      fixedWidth: ExperienceBar.BackgroundSize - 6,
      stroke: '#ffffff',
      strokeThickness: 4,
    };

    this.levelText = new Phaser.GameObjects.Text(
      this.scene,
      0,
      0,
      `LV ${this.currentLevel}`,
      {
        ...fontSettings,
        align: 'right',
      }
    );
    this.levelText.setOrigin(0.5, 0.5);
    this.add(this.levelText);

    this.experienceText = new Phaser.GameObjects.Text(
      this.scene,
      0,
      0,
      `${this.currentExperience}/${this.maxExperience}`,
      {
        ...fontSettings,
        align: 'left',
      }
    );
    this.experienceText.setOrigin(0.5, 0.5);
    this.add(this.experienceText);
  }

  updateExperienceBar(value: number, max: number) {
    const width = (value / max) * ExperienceBar.BackgroundSize;
    this.bar.setSize(width, ExperienceBar.BarHeight);
  }

  addExperience(value: number) {
    this.currentExperience += value;

    while (this.currentExperience >= this.maxExperience) {
      this.currentExperience -= this.maxExperience;
      this.currentLevel++;
      this.maxExperience = this.progression[this.currentLevel] ?? 999999;
      this.levelText.setText(`LV ${this.currentLevel}`);
      this.events.emit('level-up', this.currentLevel);
    }

    this.experienceText.setText(
      `${this.currentExperience}/${this.maxExperience}`
    );
    this.updateExperienceBar(this.currentExperience, this.maxExperience);
  }

  absorbAll() {
    absorbFunction(this.scene, {
      object: this,
      offset: { x: 0, y: 0 },
      delayModifier: 3,
    });
  }

  regurgitate() {
    absorbFunction(this.scene, {
      object: this,
      offset: { x: 0, y: 0 },
      delayModifier: 0,
      durationOffset: 1000,
      reversed: true,
      objectScale: 1,
    });
  }

  clearLevelUp() {
    this.currentLevel = 1;
    this.currentExperience = 0;
    this.maxExperience = this.progression[this.currentLevel] ?? 999999;

    this.levelText.setText(`LV ${this.currentLevel}`);
    this.experienceText.setText(
      `${this.currentExperience}/${this.maxExperience}`
    );

    this.updateExperienceBar(this.currentExperience, this.maxExperience);

    this.tweens.forEach((tween) => {
      tween.stop();
    });
  }

  showLevelUp() {
    this.levelText.setText(`Level Up!`).setResolution(2);
    this.levelText.setAlign('center');
    this.experienceText.setText('');

    this.updateExperienceBar(1, 1);

    const particles = new Phaser.GameObjects.Particles.ParticleEmitter(
      this.scene,
      0,
      0,
      PARTICLE_TEXTURES['GREEN'],
      {
        x: { min: -256, max: 256 },
        y: { min: -256, max: 256 },
        speed: { random: [50, 1000] },
        lifespan: { random: [100, 1000] },
        scale: { random: true, start: 0.5, end: 0 },
        rotate: { min: 0, max: 360 },
        angle: { min: 0, max: 360 },
        blendMode: Phaser.BlendModes.ADD,
        emitting: false,
      }
    );
    this.add(particles);

    const t1 = this.scene.tweens.chain({
      targets: this.levelText,
      tweens: [
        {
          y: { from: 0, to: -320 },
          scale: { from: 1, to: 4 },
          duration: 200,
          ease: Phaser.Math.Easing.Sine.Out,
          onStart: () => {
            this.levelText.setColor('#ffffff');
            this.levelText.setStroke('#ffffff', 6);
          },
          onComplete: () => {
            particles.emitParticleAt(this.levelText.x, this.levelText.y, 500);
            this.levelText.setColor('#000000');
            this.levelText.setStroke('#ffffff', 4);
          },
        },
        {
          y: 0,
          scale: 1,
          duration: 300,
          delay: SHOW_LEVEL_TEXT_DURATION,
          ease: Phaser.Math.Easing.Bounce.Out,
        },
      ],
      onComplete: () => {
        this.events.emit('animation-complete');
      },
    });

    const t2 = this.scene.tweens.chain({
      targets: this,
      delay: 200,
      tweens: [
        {
          scaleX: 1.2, // Overflow
          duration: 200,
          ease: Phaser.Math.Easing.Sine.Out,
        },
        {
          scaleX: 1, // Shrink back with bounce
          duration: 300,
          ease: Phaser.Math.Easing.Bounce.Out,
        },
      ],
    });

    // create a color tween that will change the color of the bar fill
    const t3 = this.scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 500,
      yoyo: true,
      repeat: -1,
      onUpdate: (tween) => {
        const v = tween.getValue();
        const { color } = Phaser.Display.Color.HSVToRGB(v, v, 1);
        this.bar.setFillStyle(color);
      },
    });

    this.tweens = [t1, t2, t3];
  }
}

import { CharityGamesPlugin } from '@worksheets/phaser/plugins';

import { MainMenuScene } from '../main-menu/scene';
import { ProgressBar } from '../progress/scene';
import { NoiseShaderPipeline } from '../shaders/noise';
import { PortalShaderPipeline } from '../shaders/portal';

export class LoaderScene extends Phaser.Scene {
  static key = 'LoaderScene';
  progressClient: ProgressBar;
  progressServer: ProgressBar;

  server: CharityGamesPlugin;

  constructor() {
    super(LoaderScene.key);
  }

  static start(scene: Phaser.Scene) {
    scene.scene.start(LoaderScene.key);
  }

  preload() {
    this.server = CharityGamesPlugin.find(this);
    this.server.initialize();

    /** Tiles */
    this.load.image('red-tile', 'assets/tiles/red.png');
    this.load.image('orange-tile', 'assets/tiles/orange.png');
    this.load.image('yellow-tile', 'assets/tiles/yellow.png');
    this.load.image('green-tile', 'assets/tiles/green.png');
    this.load.image('blue-tile', 'assets/tiles/blue.png');
    this.load.image('purple-tile', 'assets/tiles/purple.png');
    this.load.image('pink-tile', 'assets/tiles/pink.png');
    this.load.image('grey-tile', 'assets/tiles/grey.png');
    this.load.image('rainbow-tile', 'assets/tiles/rainbow.png');
    this.load.image('crate-tile', 'assets/tiles/crate.png');
    this.load.image('bomb-tile', 'assets/tiles/bomb.png');
    this.load.image('boulder-tile', 'assets/tiles/boulder.png');

    /** Particles */
    this.load.image('grey-particle', 'assets/particles/grey.png');
    this.load.image('red-particle', 'assets/particles/red.png');
    this.load.image('orange-particle', 'assets/particles/orange.png');
    this.load.image('yellow-particle', 'assets/particles/yellow.png');
    this.load.image('green-particle', 'assets/particles/green.png');
    this.load.image('blue-particle', 'assets/particles/blue.png');
    this.load.image('purple-particle', 'assets/particles/purple.png');
    this.load.image('pink-particle', 'assets/particles/pink.png');
    this.load.image('brown-particle', 'assets/particles/brown.png');
    this.load.image('ring-particle', 'assets/particles/ring.png');

    /** Background */
    this.load.image('game-background', 'assets/game/background.png');
    this.load.image('game-background-mask', 'assets/game/background-mask.png');
    this.load.image('card', 'assets/game/card.png');
    this.load.image('selection', 'assets/game/selection.png');

    /** Units */
    this.load.image('unknown-unit', 'assets/units/unknown.png');

    /** Relics */
    this.load.image('relic-blermy', 'assets/relics/blermy.png');
    this.load.image('relic-stepper', 'assets/relics/stepper.png');
    this.load.image('relic-slime-doctor', 'assets/relics/slime-doctor.png');
    this.load.image('relic-slime-red', 'assets/relics/slime-red.png');
    this.load.image('relic-slime-green', 'assets/relics/slime-green.png');
    this.load.image('relic-slime-blue', 'assets/relics/slime-blue.png');
    this.load.image('relic-slime-yellow', 'assets/relics/slime-yellow.png');
    this.load.image('relic-slime-purple', 'assets/relics/slime-purple.png');
    this.load.image('relic-slime-santa', 'assets/relics/slime-santa.png');
    this.load.image('relic-slime-bunny', 'assets/relics/slime-bunny.png');
    this.load.image('relic-milton', 'assets/relics/milton.png');
    this.load.image('relic-quacksire', 'assets/relics/quacksire.png');
    this.load.image('relic-phool', 'assets/relics/phool.png');
    this.load.image('relic-banana', 'assets/relics/banana.png');
    this.load.image('relic-beetle', 'assets/relics/beetle.png');
    this.load.image('relic-extinguisher', 'assets/relics/extinguisher.png');
    this.load.image('relic-eye', 'assets/relics/eye.png');
    this.load.image('relic-embers', 'assets/relics/embers.png');
    this.load.image('relic-antling', 'assets/relics/antling.png');
    this.load.image('relic-fly', 'assets/relics/fly.png');
    this.load.image('relic-lunatic', 'assets/relics/lunatic.png');
    this.load.image('relic-stony-dark', 'assets/relics/stony-dark.png');
    this.load.image('relic-stony-light', 'assets/relics/stony-light.png');
    this.load.image('relic-pancho', 'assets/relics/pancho.png');
    this.load.image('relic-flashlight', 'assets/relics/flashlight.png');
    this.load.image('relic-fireworks', 'assets/relics/fireworks.png');
    this.load.image('relic-bottle', 'assets/relics/bottle.png');
    this.load.image('relic-broken-wand', 'assets/relics/broken-wand.png');
    this.load.image('relic-matchbox', 'assets/relics/matchbox.png');
    this.load.image('relic-watering-pail', 'assets/relics/watering-pail.png');
    this.load.image('relic-death-spore', 'assets/relics/death-spore.png');
    this.load.image(
      'relic-magnifying-glass',
      'assets/relics/magnifying-glass.png'
    );
    this.load.image('relic-dynamite-stick', 'assets/relics/dynamite-stick.png');
    this.load.image('relic-wand', 'assets/relics/wand.png');
    this.load.image('relic-telescope', 'assets/relics/telescope.png');
    this.load.image('relic-moonflower', 'assets/relics/moonflower.png');
    this.load.image('relic-sunflower', 'assets/relics/sunflower.png');
    this.load.image('relic-emerald-shard', 'assets/relics/emerald-shard.png');
    this.load.image('relic-trowel', 'assets/relics/trowel.png');
    this.load.image('relic-cow', 'assets/relics/cow.png');
    this.load.image('relic-corn', 'assets/relics/corn.png');
    this.load.image('relic-battery', 'assets/relics/battery.png');
    this.load.image('relic-milk', 'assets/relics/milk.png');
    this.load.image('relic-strawberry', 'assets/relics/strawberry.png');
    this.load.image('relic-pickaxe', 'assets/relics/pickaxe.png');
    this.load.image('relic-tim', 'assets/relics/tim.png');
    this.load.image('relic-catcher', 'assets/relics/catcher.png');
    this.load.image(
      'relic-explosive-powder',
      'assets/relics/explosive-powder.png'
    );
    this.load.image('relic-kunai', 'assets/relics/kunai.png');
    this.load.image('relic-shuriken', 'assets/relics/shuriken.png');
    this.load.image('relic-stock-pot', 'assets/relics/stock-pot.png');
    this.load.image('relic-clothespin', 'assets/relics/clothespin.png');
    this.load.image('relic-cash-register', 'assets/relics/cash-register.png');
    this.load.image('relic-slime-engine', 'assets/relics/slime-engine.png');
    this.load.image('relic-book-of-fire', 'assets/relics/book-of-fire.png');
    this.load.image('relic-book-of-water', 'assets/relics/book-of-water.png');
    this.load.image('relic-book-of-earth', 'assets/relics/book-of-earth.png');
    this.load.image('relic-book-of-war', 'assets/relics/book-of-war.png');
    this.load.image('relic-book-of-light', 'assets/relics/book-of-light.png');
    this.load.image(
      'relic-book-of-darkness',
      'assets/relics/book-of-darkness.png'
    );

    /** ORBS */
    this.load.image('orb-red', 'assets/orbs/red.png');
    this.load.image('orb-orange', 'assets/orbs/orange.png');
    this.load.image('orb-yellow', 'assets/orbs/yellow.png');
    this.load.image('orb-green', 'assets/orbs/green.png');
    this.load.image('orb-blue', 'assets/orbs/blue.png');
    this.load.image('orb-purple', 'assets/orbs/purple.png');
    this.load.image('orb-pink', 'assets/orbs/pink.png');
    this.load.image('orb-grey', 'assets/orbs/grey.png');

    /** TITLE */
    this.load.image(`title-1`, 'assets/title/1.png');
    this.load.image(`title-2`, 'assets/title/2.png');
    this.load.image(`title-3`, 'assets/title/3.png');
    this.load.image(`title-4`, 'assets/title/4.png');
    this.load.image(`title-5`, 'assets/title/5.png');
    this.load.image(`title-6`, 'assets/title/6.png');
    this.load.image(`title-7`, 'assets/title/7.png');
    this.load.image(`title-8`, 'assets/title/8.png');
    this.load.image(`title-9`, 'assets/title/9.png');
    this.load.image(`title-10`, 'assets/title/10.png');
    this.load.image(`title-11`, 'assets/title/11.png');
    this.load.image('start-1', 'assets/title/start-1.png');
    this.load.image('start-2', 'assets/title/start-2.png');
    this.load.image('start-3', 'assets/title/start-3.png');
    this.load.image('start-4', 'assets/title/start-4.png');
    this.load.image('start-5', 'assets/title/start-5.png');
    this.load.image('start-6', 'assets/title/start-6.png');
    this.load.image('start-7', 'assets/title/start-7.png');
    this.load.image('start-8', 'assets/title/start-8.png');
    this.load.image('start-9', 'assets/title/start-9.png');

    /** UI */
    this.load.image('icons-question', 'assets/ui/icons/question.png');
    this.load.image('icons-skull', 'assets/ui/icons/skull.png');
    this.load.image('icons-lightning', 'assets/ui/icons/lightning.png');
    this.load.image('icons-boulder', 'assets/ui/icons/boulder.png');
    this.load.image('icons-door', 'assets/ui/icons/door.png');
    this.load.image('icons-skull-cross', 'assets/ui/icons/skull-cross.png');
    this.load.image('icons-check', 'assets/ui/icons/check.png');
    this.load.image('icons-magic-missile', 'assets/ui/icons/magic-missile.png');
    this.load.image('icons-cross', 'assets/ui/icons/cross.png');
    this.load.image('icons-star', 'assets/ui/icons/star.png');
    this.load.image('icons-sword', 'assets/ui/icons/sword.png');
    this.load.image('icons-wave', 'assets/ui/icons/wave.png');
    this.load.image('icons-new', 'assets/ui/icons/new.png');
    this.load.image('icons-bookmark', 'assets/ui/icons/bookmark.png');
    this.load.image('icons-pointer-1', 'assets/ui/icons/pointer-1.png');
    this.load.image('icons-pointer-2', 'assets/ui/icons/pointer-2.png');
    this.load.image('icons-point-up', 'assets/ui/icons/point-up.png');
    this.load.image('icons-map', 'assets/ui/icons/map.png');
    this.load.image('icons-back', 'assets/ui/icons/back.png');
    this.load.image('icons-shop', 'assets/ui/icons/shop.png');
    this.load.image('icons-heart', 'assets/ui/icons/heart.png');
    this.load.image('icons-transparent', 'assets/ui/icons/transparent.png');
    this.load.image('icons-chest', 'assets/ui/icons/chest.png');
    this.load.image('icons-gold', 'assets/ui/icons/gold.png');
    this.load.image('icons-heal', 'assets/ui/icons/heal.png');
    this.load.image('icons-block', 'assets/ui/icons/block.png');
    this.load.image('icons-sold', 'assets/ui/icons/sold.png');
    this.load.image('icons-quest', 'assets/ui/icons/quest.png');
    this.load.image('icons-slime', 'assets/ui/icons/slime.png');
    this.load.image('icons-fireball', 'assets/ui/icons/fireball.png');
    this.load.image('icons-attack', 'assets/ui/icons/attack.png');
    this.load.image('icons-reticle', 'assets/ui/icons/reticle.png');
    this.load.image('icons-info', 'assets/ui/icons/info.png');
    this.load.image('icons-casting', 'assets/ui/icons/casting.png');
    this.load.image('icons-advantage', 'assets/ui/icons/advantage.png');
    this.load.image('icons-advantage-x2', 'assets/ui/icons/advantage-x2.png');
    this.load.image('icons-disadvantage', 'assets/ui/icons/disadvantage.png');
    this.load.image('icons-whirlpool', 'assets/ui/icons/whirlpool.png');
    this.load.image('icons-scissors', 'assets/ui/icons/scissors.png');
    this.load.image('icons-recycle', 'assets/ui/icons/recycle.png');
    this.load.image('icons-exit', 'assets/ui/icons/exit.png');
    this.load.image('icons-grey-star', 'assets/ui/icons/grey-star.png');
    this.load.image('icons-gate', 'assets/ui/icons/gate.png');
    this.load.image(
      'icons-disadvantage-x2',
      'assets/ui/icons/disadvantage-x2.png'
    );
    this.load.image('icons-neutral', 'assets/ui/icons/neutral.png');
    /** UI GAME */
    this.load.image(
      'game-relic-card-background',
      'assets/ui/game/relic-card-background.png'
    );
    this.load.image(
      'game-relic-card-background-fill',
      'assets/ui/game/relic-card-background-fill.png'
    );
    this.load.image(
      'game-relic-card-background-slice-left',
      'assets/ui/game/relic-card-background-slice-left.png'
    );
    this.load.image(
      'game-relic-card-background-slice-right',
      'assets/ui/game/relic-card-background-slice-right.png'
    );

    PortalShaderPipeline.load(this);
    NoiseShaderPipeline.load(this);

    this.progressClient = new ProgressBar(this, {
      required: 1,
      color: 0x00ff00,
      text: 'Loading...',
      hideValue: true,
    });
    this.progressClient.setPosition(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2
    );
    this.add.existing(this.progressClient);

    this.progressServer = new ProgressBar(this, {
      required: 1,
      color: 0x0000ff,
      text: 'Connecting...',
      hideValue: true,
    });
    this.progressServer.setPosition(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 + 36
    );
    this.add.existing(this.progressServer);

    this.load.on('progress', (value: number) => {
      this.progressClient.updateBar(value, 1);
    });

    this.load.on('complete', () => {
      this.startScene();
    });

    this.server.on('initializing', (value: number) => {
      this.progressServer.updateBar(value, 1);
    });

    this.server.on('initialized', () => {
      this.startScene();
    });
  }

  startScene() {
    if (this.server.isInitialized && this.load.isReady()) {
      MainMenuScene.start(this);
    }
  }
}

import { TypedEventEmitter } from '@worksheets/phaser/events';
import { Point } from '@worksheets/phaser/types';
import { hasExactly } from '@worksheets/util/arrays';
import { keysOf } from '@worksheets/util/objects';
import { waitFor } from '@worksheets/util/time';

import { MAX_UNIQUE_RELICS, SCENE_TRANSITION_SPEED } from '../combat/constants';
import { CellHighlightRequest } from '../combat/grid/grid';
import { Lock } from '../combat/lock';
import { CombatReport } from '../combat/report';
import { CombatScene } from '../combat/scene';
import { PlayerStats } from '../combat/stats';
import { ConstellationScene } from '../constellation/scene';
import { ExperienceScene } from '../experience/scene';
import { LevelUpScene } from '../leveling/level-up-scene';
import { OrbType } from '../orbs/data';
import { OrbScene } from '../orbs/scene';
import { ProgressScene } from '../progress/scene';
import { RelicCardSpriteOptions } from '../relic-info/relic-card';
import { BasicRelicModalInfo, RelicInfoModalScene } from '../relic-info/scene';
import { RELIC_EFFECTS, RELIC_EVOLUTIONS, RELICS } from '../relics/data';
import { RelicOptions } from '../relics/relic';
import { RelicsScene } from '../relics/scene';
import {
  ActionExecution,
  RelicActivation,
  RelicCooldown,
  RelicEvolution,
  RelicKey,
  RelicOwnership,
  RelicSpellEffect,
  RelicSpellTargetingData,
} from '../relics/types';
import { SpellTargetingScene } from '../spells/scene';

export class GameControllerScene extends Phaser.Scene {
  static Key = 'GameControllerScene';
  levelingUpLock: Lock;
  relics: RelicOwnership[];
  recycles: number;
  banishes: number;
  exclude: RelicKey[];
  relicsScene: RelicsScene;
  stats: PlayerStats;
  report: CombatReport;
  turns: number;
  bus: TypedEventEmitter<{
    'trigger-level-up': [number];
    'start-level-up': [];
    'relic-selected': [RelicOwnership];
    'stage-complete': [];
    'start-combat': [];
    'level-up-relic': [RelicOwnership];
    'evolve-relic': [RelicOwnership, RelicEvolution];
    'relics-ready': [];
    'process-cooldowns': [RelicCooldown];
    'open-spell-targeting': [RelicOptions<RelicSpellEffect>];
    'add-experience': [number];
    'close-spell-targeting': [];
    'spell-cast': [{ key: RelicKey; data: RelicSpellTargetingData }];
    'activate-relics': [RelicActivation];
    'show-constellation': [];
    'execute-skill': [ActionExecution & { key: RelicKey }];
    'open-relic-info': [BasicRelicModalInfo];
    'close-relic-info': [];
    'highlight-cells': [CellHighlightRequest];
    'summon-orb': [{ orb: OrbType; point: Point }];
    'increase-score': [number];
    'pause-game-play': [];
    'resume-game-play': [];
    'increase-turns': [number];
    'level-up-animation-complete': [];
    'insert-relic': [
      RelicOwnership & RelicCardSpriteOptions & { scale: number }
    ];
    'spawn-bonus-relic': [];
    'drop-bonus-relic': [RelicOwnership];
    'recycle-relic': [RelicOwnership];
    'banish-relic': [RelicOwnership];
    'close-relic-selection': [];
  }>;
  constructor() {
    super({ key: GameControllerScene.Key });
  }

  static start({ scene }: Phaser.Scene) {
    scene.start(GameControllerScene.Key);
  }

  create() {
    this.bus = new TypedEventEmitter();
    this.relics = [];
    this.exclude = [];
    this.recycles = 20;
    this.banishes = 10;
    this.turns = 0;
    this.levelingUpLock = new Lock('boolean');
    this.stats = new PlayerStats();
    this.report = new CombatReport();

    this.createEvents();

    CombatScene.launch(this, {
      manager: this,
    });

    ProgressScene.launch(this, { manager: this, target: 3000, turns: 300 });

    RelicsScene.launch(this, {
      manager: this,
      owned: this.relics,
    });

    ExperienceScene.launch(this, { manager: this });

    OrbScene.launch(this, { manager: this });
  }

  createEvents() {
    this.input.keyboard?.on('keydown-ESC', () => {
      this.bus.emit('stage-complete');
    });

    this.bus.on('spawn-bonus-relic', () => {
      const relics = pickUpgradableRelics({
        count: 1,
        owned: this.relics,
        exclude: this.exclude,
      });

      if (!hasExactly(relics, 1)) return;

      this.bus.emit('drop-bonus-relic', relics[0]);
    });

    this.bus.on('recycle-relic', () => {
      if (this.recycles <= 0) return;
      this.recycles -= 1;
    });

    this.bus.on('banish-relic', (banish) => {
      if (this.banishes <= 0) return;
      this.banishes -= 1;
      this.exclude.push(banish.key);
    });

    this.bus.on('trigger-level-up', async (level) => {
      while (this.levelingUpLock.locked) {
        await waitFor(100);
      }

      const relics = pickRandomRelics({
        count: determineRelicCount(level),
        owned: this.relics,
        exclude: this.exclude,
      });

      if (!relics.length) {
        return;
      }

      this.levelingUpLock.close();

      this.bus.emit('start-level-up');
      this.bus.emit('pause-game-play');

      LevelUpScene.launch(this, {
        manager: this,
        relics,
        recycles: this.recycles,
        banishes: this.banishes,
        getRandomRelic: () =>
          pickRandomRelics({
            count: 1,
            owned: this.relics,
            exclude: this.exclude,
          })[0],
      });

      this.scene.bringToTop(LevelUpScene.Key);
      this.scene.bringToTop(ExperienceScene.Key);
    });

    this.bus.on('level-up-animation-complete', () => {
      // the experience scene has animated text that needs to appear
      // on top of the backdrop that the level up scene creates.
      this.scene.bringToTop(LevelUpScene.Key);
    });

    this.bus.on('insert-relic', () => {
      this.scene.bringToTop(RelicsScene.Key);
    });

    this.bus.on('close-relic-selection', () => {
      LevelUpScene.stop(this);
      this.scene.bringToTop(OrbScene.Key);
      this.bus.emit('resume-game-play');

      this.levelingUpLock.open();
    });

    this.bus.on('relic-selected', (relic) => {
      const current = this.relics.find((r) => r.key === relic.key);
      const evolution = RELIC_EVOLUTIONS[relic.key];
      if (evolution && !current) {
        const { replaces } = evolution;
        this.exclude.push(replaces);
        this.relics = this.relics.filter((r) => r.key !== replaces);
        const current = { key: relic.key, level: 0 };
        this.relics.push(current);
        this.bus.emit('evolve-relic', current, evolution);
      } else if (current) {
        current.level++;
        this.bus.emit('level-up-relic', current);
      } else {
        const current = { key: relic.key, level: 0 };
        this.relics.push(current);
        this.bus.emit('level-up-relic', current);
      }
    });

    this.bus.on('pause-game-play', () => {
      const combat = CombatScene.get(this);
      combat.scene.pause();
      const orbs = OrbScene.get(this);
      orbs.scene.pause();
    });

    this.bus.on('resume-game-play', () => {
      const combat = CombatScene.get(this);
      combat.scene.resume();
      const orbs = OrbScene.get(this);
      orbs.scene.resume();
    });

    this.bus.on('show-constellation', async () => {
      await waitFor(SCENE_TRANSITION_SPEED);
      RelicsScene.stop(this);
      CombatScene.stop(this);
      ConstellationScene.launch(this, {
        relics: this.relics.map((r) => r.key),
        report: this.report,
        turns: this.turns,
      });
    });

    this.bus.on('increase-turns', (amount) => {
      this.turns += amount;
    });

    this.bus.on('relics-ready', () => {
      this.bus.emit('start-combat');
    });

    this.bus.on('open-relic-info', (relic) => {
      RelicInfoModalScene.launch(this, {
        bus: this.bus,
        ...relic,
      });
      this.scene.bringToTop(RelicInfoModalScene.key);
    });

    this.bus.on('open-spell-targeting', (relic) => {
      if (LevelUpScene.isActive(this)) {
        this.bus.emit('open-relic-info', relic);
        this.bus.emit('close-spell-targeting');
      } else {
        SpellTargetingScene.launch(this, { manager: this, relic });
        this.scene.bringToTop(SpellTargetingScene.Key);
      }
    });

    this.bus.on('close-spell-targeting', () => {
      if (SpellTargetingScene.isActive(this)) {
        SpellTargetingScene.stop(this);
      }
    });

    this.bus.on('spell-cast', () => {
      this.bus.emit('close-spell-targeting');
    });

    this.bus.on('close-relic-info', () => {
      if (RelicInfoModalScene.isActive(this)) {
        RelicInfoModalScene.stop(this);
      }
    });
  }
}

type CandidateSearchOptions = {
  owned: RelicOwnership[];
  exclude: RelicKey[];
};

const pickUpgradableRelics = ({
  count,
  owned,
  exclude,
}: {
  count: number;
} & CandidateSearchOptions): RelicOwnership[] =>
  Phaser.Math.RND.shuffle(findUpgrades({ owned, exclude })).slice(0, count);

const findUpgrades = ({ owned, exclude }: CandidateSearchOptions) => {
  const upgrades: RelicOwnership[] = [];
  for (const key of keysOf(RELICS)) {
    if (exclude.includes(key)) continue;

    const inventoryRelic = owned.find((r) => r.key === key);
    const maxLevel = RELIC_EFFECTS[key].length - 1;
    if (!inventoryRelic || inventoryRelic.level >= maxLevel) continue;

    const evolution = RELIC_EVOLUTIONS[key];
    if (evolution && !areEvolutionRequirementsMet({ key, evolution, owned }))
      continue;

    upgrades.push({
      key: key,
      level: inventoryRelic.level + 1,
    });
  }
  return upgrades;
};

const pickRandomRelics = ({
  count,
  owned,
  exclude,
}: {
  count: number;
} & CandidateSearchOptions): RelicOwnership[] =>
  Phaser.Math.RND.shuffle(findCandidates({ owned, exclude })).slice(0, count);

const findCandidates = ({
  owned,
  exclude,
}: CandidateSearchOptions): RelicOwnership[] => {
  const candidates: RelicOwnership[] = [];
  for (const key of keysOf(RELICS)) {
    if (exclude.includes(key)) continue;

    const inventoryRelic = owned.find((r) => r.key === key);
    const maxLevel = RELIC_EFFECTS[key].length - 1;
    if (inventoryRelic && inventoryRelic.level >= maxLevel) continue;

    const evolution = RELIC_EVOLUTIONS[key];
    if (evolution && !areEvolutionRequirementsMet({ key, evolution, owned }))
      continue;

    if (owned.length >= MAX_UNIQUE_RELICS && !inventoryRelic) continue;

    candidates.push({
      key: key,
      level: inventoryRelic ? inventoryRelic.level + 1 : 0,
    });
  }
  return candidates;
};

const areEvolutionRequirementsMet = ({
  key,
  evolution,
  owned,
}: {
  key: RelicKey;
  evolution: RelicEvolution;
  owned: RelicOwnership[];
}) => {
  const alreadyOwned = owned.find((r) => r.key === key);
  if (alreadyOwned) return true;

  const requirements = evolution.requirements;
  if (!requirements) return false;

  const met = requirements.every((req) => {
    const ownedRelic = owned.find((r) => r.key === req.key);
    return ownedRelic && ownedRelic.level >= req.level;
  });
  return met;
};

export const determineRelicCount = (level: number) => {
  if (level <= 2) return 2;
  if (level <= 15) return 3;
  return 4;
};

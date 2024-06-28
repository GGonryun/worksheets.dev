import {
  communicator,
  GameMessageEvent,
  GameMessageOutput,
  MessageInput,
} from '@worksheets/sdk-games';
import Phaser from 'phaser';

export class CharityGamesPlugin extends Phaser.Plugins.BasePlugin {
  static KEY = 'CharityGamesPlugin';
  requestTimeout = 5000;
  events: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();
  registry: Phaser.Data.DataManager = new Phaser.Data.DataManager(this);
  gameId: string = process.env['CHARITY_GAMES_GAME_ID'] ?? '';
  sessionId: string | null = null;
  storageKey = 'storage';
  cachedAchievements: string[] = [];
  request: <E extends GameMessageEvent>(
    message: MessageInput<E>
  ) => Promise<GameMessageOutput<E>>;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);
    // TODO: apply type safety.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.request = communicator(window, this.requestTimeout) as any;
  }

  static find(scene: Phaser.Scene): CharityGamesPlugin {
    return scene.plugins.get(CharityGamesPlugin.KEY) as CharityGamesPlugin;
  }

  get session() {
    const start = async () => {
      try {
        const result = await this.request({
          event: 'start-session',
          payload: null,
        });

        this.sessionId = result?.sessionId ?? null;
      } catch (error) {
        console.error('Failed to start session', error);
        throw error;
      }
    };
    return {
      start,
    };
  }

  get storage() {
    const load = async () => {
      const data = await this.request({
        event: 'load-storage',
        payload: {
          sessionId: this.sessionId,
        },
      });

      for (const key in data) {
        set(key, data[key]);
      }
    };

    const save = async () => {
      const all = this.registry.getAll();
      await this.request({
        event: 'save-storage',
        payload: {
          sessionId: this.sessionId,
          data: all,
        },
      });
    };

    const set = <T>(key: string, value: T) => {
      this.registry.set(key, value);
    };

    const get = <T>(key: string, defaultValue: T): T => {
      const existing = this.registry.get(key);
      return existing ?? defaultValue;
    };

    return {
      // loads the storage from the server into the registry
      load,
      // persists the storage to the server
      save,
      // gets a single key from the registry
      get,
      // sets a key in the registry
      set,
    };
  }

  get leaderboard() {
    const submit = async (score: number) => {
      try {
        await this.request({
          event: 'submit-score',
          payload: {
            sessionId: this.sessionId,
            score,
          },
        });
      } catch (error) {
        console.error('Failed to submit score', error);
        throw error;
      }
    };

    return {
      submit,
    };
  }

  get achievements() {
    const store = async (achievementId: string) => {
      if (this.cachedAchievements.includes(achievementId)) return;
      this.cachedAchievements.push(achievementId);
    };

    const load = async () => {
      const data = await this.request({
        event: 'load-achievements',
        payload: {
          sessionId: this.sessionId,
        },
      });

      for (const achievementId of data) {
        store(achievementId);
      }

      return data;
    };

    const unlock = async (achievementId: string, condition: boolean) => {
      if (!condition) return;

      try {
        if (this.cachedAchievements.includes(achievementId)) return;
        await this.request({
          event: 'unlock-achievement',
          payload: {
            sessionId: this.sessionId,
            achievementId,
          },
        });

        store(achievementId);
      } catch (error) {
        console.error('Failed to unlock achievement', error);
        throw error;
      }
    };

    return {
      load,
      unlock,
    };
  }
}

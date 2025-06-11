import {
  GameEventKey,
  GameEventPayload,
  isValidOrigin,
  PlatformEvent,
  PlatformEventKey,
  PlatformEventPayload,
  PlatformSuccessPayload,
  PluginEventKey,
  PluginEventPayload,
} from '@worksheets/sdk-games';
import { SECONDS } from '@worksheets/util/time';
import Phaser from 'phaser';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AdBreak, RewardAdBreak } from 'types/adsense';

export class CharityGamesPlugin extends Phaser.Plugins.BasePlugin {
  static KEY = 'CharityGamesPlugin';
  storage: StorageAPI;
  session: SessionAPI;
  achievements: AchievementsAPI;
  leaderboard: LeaderboardsAPI;
  score: LeaderboardsAPI;
  advertisements: AdvertisementsAPI;
  logger: LoggerAPI;
  events: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();
  isInitialized = false;
  isDisabled = false;
  isLogging = false;
  storageKey = 'storage';

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);
    this.storage = new StorageAPI(this);
    this.session = new SessionAPI(this);
    this.achievements = new AchievementsAPI(this);
    this.advertisements = new AdvertisementsAPI(this);
    this.score = this.leaderboard = new LeaderboardsAPI(this);
    this.logger = new LoggerAPI(this);
  }

  static find(scene: Phaser.Scene): CharityGamesPlugin {
    return scene.plugins.get(CharityGamesPlugin.KEY) as CharityGamesPlugin;
  }

  static config(): Phaser.Types.Plugins.GlobalPlugin {
    return {
      key: CharityGamesPlugin.KEY,
      plugin: CharityGamesPlugin,
      active: true,
    };
  }

  #preload() {
    if (this.isDisabled) return;

    if (window.parent === window) {
      throw new Error('No parent window');
    }

    window.addEventListener('message', (event) => {
      const origin = event.origin;
      if (!isValidOrigin(origin)) {
        console.error('Invalid origin', origin);
        return;
      }

      const data = event.data;
      if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return;
      }

      if (!('event' in data)) {
        return;
      }

      if (!('payload' in data)) {
        return;
      }

      const eventKey = data.event as GameEventKey;
      const payload = data.payload as GameEventPayload;

      this.events.emit(eventKey, payload);
    });
  }

  async initialize(): Promise<void> {
    this.isDisabled = process.env['DISABLE_CHARITY_GAMES_SDK'] === 'true';
    if (this.isDisabled) console.info('Charity Games SDK is disabled');

    const { signal, cancel } = createTimeout(
      (this.isDisabled ? 0 : 5) * SECONDS
    );
    try {
      this.#preload();

      this.#emit('initializing', 0.33);
      await this.session.initialize(signal);

      this.#emit('initializing', 0.66);
      await this.storage.initialize(signal);

      this.#emit('initializing', 1);
      await this.achievements.initialize(signal);

      this.isInitialized = true;
      this.#emit('initialized', { ok: true });
    } catch (error) {
      if (!this.isDisabled) {
        console.error('Failed to initialize', error);
      }
      this.isInitialized = true;
      this.#emit('initialized', { ok: false });
    } finally {
      cancel();
    }
  }

  send<T extends GameEventKey>(event: T, payload: GameEventPayload<T>) {
    if (this.isDisabled) return;
    window.parent.postMessage({ event, payload }, '*');
  }

  #emit<T extends PluginEventKey>(event: T, payload: PluginEventPayload<T>) {
    this.events.emit(event, payload);
  }

  on<T extends PlatformEventKey | PluginEventKey>(
    event: T,
    callback: (
      payload: T extends PlatformEventKey
        ? PlatformEventPayload<T>
        : T extends PluginEventKey
        ? PluginEventPayload<T>
        : never
    ) => void
  ) {
    this.events.on(event, callback);
  }
}

class SessionAPI {
  id: string | null;
  plugin: CharityGamesPlugin;

  constructor(plugin: CharityGamesPlugin) {
    this.plugin = plugin;
    this.id = null;
  }

  async initialize(signal: AbortSignal) {
    const { sessionId } = await cancelableRequest(this.plugin, signal)(
      'start-session',
      'session-started'
    )({});

    this.id = sessionId;
  }
}

class StorageAPI {
  registry: Phaser.Data.DataManager;
  plugin: CharityGamesPlugin;
  ignored: string[];

  constructor(plugin: CharityGamesPlugin) {
    this.plugin = plugin;
    this.registry = new Phaser.Data.DataManager(plugin);
    this.ignored = [];
  }

  ignore(keys: string[]) {
    this.ignored = keys;
  }

  async initialize(signal: AbortSignal) {
    const { storage } = await cancelableRequest(this.plugin, signal)(
      'load-storage',
      'storage-loaded'
    )({
      sessionId: this.plugin.session.id,
    });

    for (const key in storage) {
      this.set(key, storage[key]);
    }
  }

  set<T>(key: string, value: T): T;
  set<T>(key: string, value: (prev: T | undefined) => T): T;
  set<T>(key: string, value: (prev: T) => T, defaultValue: T): T;
  set<T>(
    key: string,
    value: T | ((prev: T | undefined) => T),
    defaultValue?: T
  ): T {
    const prev = this.get<T>(key, defaultValue);

    const nextValue =
      typeof value === 'function'
        ? (value as (prev: T | undefined) => T)(prev)
        : value;

    this.registry.set(key, nextValue);
    return nextValue;
  }

  get<T>(key: string): T | undefined;
  get<T>(key: string, defaultValue: T): T;
  get<T>(key: string, defaultValue?: T): T | undefined;
  get<T>(key: string, defaultValue?: T): T | undefined {
    const existing = this.registry.get(key);
    return existing ?? defaultValue;
  }

  remove(key: string) {
    this.registry.remove(key);
  }

  pull<T>(key: string, defaultValue: T): T {
    const existing = this.registry.get(key);
    this.remove(key);
    return existing ?? defaultValue;
  }

  getAll() {
    if (this.ignored.length) {
      return Object.fromEntries(
        Object.entries(this.registry.getAll()).filter(
          ([key]) => !this.ignored.includes(key)
        )
      );
    }

    return this.registry.getAll();
  }

  save() {
    this.plugin.send('save-storage', {
      sessionId: this.plugin.session.id,
      data: this.getAll(),
    });
  }
}

class LeaderboardsAPI {
  constructor(private plugin: CharityGamesPlugin) {}

  submit(score: number) {
    this.plugin.send('submit-score', {
      sessionId: this.plugin.session.id,
      score,
    });
  }
}

class AchievementsAPI {
  cached: string[] = [];
  constructor(private plugin: CharityGamesPlugin) {}

  async initialize(signal: AbortSignal) {
    const act = await cancelableRequest(this.plugin, signal)(
      'load-achievements',
      'achievements-loaded'
    )({
      sessionId: this.plugin.session.id,
    });

    this.cached = act.achievements;
  }

  unlock(achievements: string[]) {
    const unlockable = achievements.filter(
      (achievement) => !this.cached.includes(achievement)
    );

    if (!unlockable.length) {
      return;
    }

    this.cached = Array.from(new Set([...this.cached, ...unlockable]));

    this.plugin.send('unlock-achievements', {
      sessionId: this.plugin.session.id,
      achievementIds: unlockable,
    });
  }
}

class AdvertisementsAPI {
  constructor(private plugin: CharityGamesPlugin) {}

  async show({
    type,
    name,
    adBreakDone,
    beforeAd,
    afterAd,
  }:
    | Pick<AdBreak, 'name' | 'type'> &
        Partial<Pick<RewardAdBreak, 'adBreakDone' | 'afterAd' | 'beforeAd'>>) {
    if (!this.plugin.isInitialized) {
      return adBreakDone?.({
        breakType: type,
        breakName: name,
        breakFormat: type === 'reward' ? 'reward' : 'interstitial',
        breakStatus: 'error',
      });
    }

    // rewarded ads will automatically terminate after 60 seconds
    const controller = createTimeout(60 * SECONDS);
    const cancelable = cancelableRequest(this.plugin, controller.signal)(
      type === 'reward' ? 'show-reward-ad' : 'show-interstitial-ad',
      'ad-break-done'
    );

    beforeAd?.();
    try {
      const result = await cancelable({ name });
      adBreakDone?.(result);
    } catch (error) {
      console.error('Failed to show ad', error);
      adBreakDone?.({
        breakType: type,
        breakName: name,
        breakFormat: type === 'reward' ? 'reward' : 'interstitial',
        breakStatus: 'error',
      });
    } finally {
      afterAd?.();
      controller.cancel();
    }
  }
}

class LoggerAPI {
  constructor(private plugin: CharityGamesPlugin) {}
  debug(message: string, ...args: unknown[]) {
    if (!this.plugin.isLogging) return;

    console.info(`${message}`, ...args);
  }
}

const createTimeout = (duration: number) => {
  const abortController = new AbortController();
  const signal = abortController.signal;

  const timeout = setTimeout(() => {
    abortController.abort();
  }, duration);

  const abortHandler = () => {
    clearTimeout(timeout);
    signal.removeEventListener('abort', abortHandler);
  };

  signal.addEventListener('abort', abortHandler);

  return { signal, cancel: abortHandler };
};

const cancelableRequest =
  (plugin: CharityGamesPlugin, signal: AbortSignal) =>
  <TRequest extends GameEventKey, TResponse extends PlatformEventKey>(
    request: TRequest,
    response: TResponse
  ) =>
  async (input: GameEventPayload<TRequest>) => {
    return new Promise<PlatformSuccessPayload<TResponse>>((resolve, reject) => {
      plugin.logger.debug(`[${request}] Request sent`, input);
      const abortHandler = () => {
        plugin.logger.debug(`[${request}] Request aborted`);
        reject(`[${request}] Request aborted`);
        signal.removeEventListener('abort', abortHandler);
        plugin.events.removeListener(response, callback);
      };
      signal.addEventListener('abort', abortHandler);

      const callback = (result: PlatformEvent[TResponse]) => {
        plugin.logger.debug(
          `[${request}] Received response (${response})`,
          result
        );
        if (result.ok) {
          resolve(result as PlatformSuccessPayload<TResponse>);
        } else {
          const msg = `[${request}] Request failed with error (${response})`;
          plugin.logger.debug(msg, result);
          reject(msg);
        }

        plugin.events.removeListener(response, callback);
      };

      plugin.events.addListener(response, callback);

      plugin.send(request, input);
    });
  };

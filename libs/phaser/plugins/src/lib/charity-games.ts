import {
  GameEventKey,
  GameEventPayload,
  PlatformEvent,
  PlatformEventKey,
  PlatformEventPayload,
  PlatformSuccessPayload as PlatformEventSuccessPayload,
  PluginEventKey,
  PluginEventPayload,
} from '@worksheets/sdk-games';
import { SECONDS } from '@worksheets/util/time';
import Phaser from 'phaser';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AdBreak, RewardAdBreak } from 'types/adsense';

export const isValidOrigin = (origin: string) => {
  if (process.env['NODE_ENV'] === 'development') {
    return true;
  }
  const validOrigins = [
    'http://localhost:6969',
    'https://charity.games',
    'https://cdn.charity.games',
    'https://storage.googleapis.com',
  ];
  return origin === '*' || validOrigins.includes(origin);
};

export class CharityGamesPlugin extends Phaser.Plugins.BasePlugin {
  static KEY = 'CharityGamesPlugin';
  storage: StorageAPI;
  session: SessionAPI;
  achievements: AchievementsAPI;
  leaderboard: LeaderboardsAPI;
  advertisements: AdvertisementsAPI;
  rewards: RewardAPI;
  events: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();
  isInitialized = false;
  storageKey = 'storage';

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);
    this.storage = new StorageAPI(this);
    this.session = new SessionAPI(this);
    this.achievements = new AchievementsAPI(this);
    this.advertisements = new AdvertisementsAPI(this);
    this.leaderboard = new LeaderboardsAPI(this);
    this.rewards = new RewardAPI(this);
  }

  static find(scene: Phaser.Scene): CharityGamesPlugin {
    return scene.plugins.get(CharityGamesPlugin.KEY) as CharityGamesPlugin;
  }

  #preload() {
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

  async initialize() {
    // 10 seconds timeout for initialization
    const { signal, cancel } = createTimeout(10 * SECONDS);
    try {
      this.#preload();

      this.#emit('initializing', 0.33);
      await this.session.start(signal);

      this.#emit('initializing', 0.66);
      await this.storage.load(signal);

      this.#emit('initializing', 1);
      await this.achievements.load(signal);

      this.isInitialized = true;
      this.#emit('initialized', { ok: true });
    } catch (error) {
      console.error('Failed to initialize', error);
      this.isInitialized = true;
      this.#emit('initialized', { ok: false });
    } finally {
      cancel();
    }
  }

  send<T extends GameEventKey>(event: T, payload: GameEventPayload<T>) {
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

  async start(signal: AbortSignal) {
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

  constructor(plugin: CharityGamesPlugin) {
    this.plugin = plugin;
    this.registry = new Phaser.Data.DataManager(plugin);
  }

  async load(signal: AbortSignal) {
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

  set<T>(key: string, value: T) {
    this.registry.set(key, value);
  }

  get<T>(key: string, defaultValue: T): T {
    const existing = this.registry.get(key);
    return existing ?? defaultValue;
  }

  getAll() {
    return this.registry.getAll();
  }

  save() {
    this.plugin.send('save-storage', {
      sessionId: this.plugin.session.id,
      data: this.registry.getAll(),
    });
  }
}

class LeaderboardsAPI {
  constructor(private plugin: CharityGamesPlugin) {}

  async submit(score: number) {
    this.plugin.send('submit-score', {
      sessionId: this.plugin.session.id,
      score,
    });
  }
}

class AchievementsAPI {
  cached: string[] = [];
  constructor(private plugin: CharityGamesPlugin) {}

  async load(signal: AbortSignal) {
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

class RewardAPI {
  constructor(private plugin: CharityGamesPlugin) {}

  async send(opts: { itemId: string; quantity: number; source: string }) {
    this.plugin.send('reward-user', {
      sessionId: this.plugin.session.id,
      ...opts,
    });
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
    return new Promise<PlatformEventSuccessPayload<TResponse>>(
      (resolve, reject) => {
        const abortHandler = () => {
          reject(`[${request}] Request aborted`);
          signal.removeEventListener('abort', abortHandler);
          plugin.events.removeListener(response, callback);
        };
        signal.addEventListener('abort', abortHandler);

        const callback = (result: PlatformEvent[TResponse]) => {
          if (result.ok) {
            resolve(result as PlatformEventSuccessPayload<TResponse>);
          } else {
            reject(`[${request}] Request failed with error: ${result.error}`);
          }

          plugin.events.removeListener(response, callback);
        };

        plugin.events.addListener(response, callback);

        plugin.send(request, input);
      }
    );
  };

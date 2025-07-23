// eslint-disable-next-line @nx/enforce-module-boundaries
import { PlacementInfo } from 'types/adsense';
/* eslint-disable @typescript-eslint/no-explicit-any */
export type GameMessage =
  | {
      event: 'load-storage';
      input: {
        sessionId: string | null;
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      output: Record<string, any>;
    }
  | {
      event: 'save-storage';
      input: {
        sessionId: string | null;
        data: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          [key: string]: any;
        };
      };
      output: boolean;
    }
  | {
      event: 'submit-score';
      input: {
        sessionId: string | null;
        score: number;
      };
      output: boolean;
    }
  | {
      event: 'load-achievements';
      input: {
        sessionId: string | null;
      };
      output: string[];
    }
  | {
      event: 'unlock-achievement';
      input: {
        sessionId: string | null;
        achievementId: string;
      };
      output: boolean;
    };

export type GameMessageEvent = GameMessage['event'];

export type GameMessageByEvent<T extends GameMessageEvent> = Extract<
  GameMessage,
  { event: T }
>;

export type GameMessageInput<T extends GameMessageEvent> =
  GameMessageByEvent<T>['input'];

export type GameMessageOutput<T extends GameMessageEvent> =
  GameMessageByEvent<T>['output'];

export type MessageInput<T extends GameMessageEvent> = {
  event: T;
  payload: GameMessageInput<T>;
};

export type MessageRequest<T extends GameMessageEvent> = {
  event: `${T}-request`;
  payload: GameMessageInput<T>;
};

export type MessageResponse<T extends GameMessageEvent> =
  | {
      event: `${T}-success`;
      payload: GameMessageOutput<T>;
      error?: never;
    }
  | {
      event: `${T}-failure`;
      payload?: never;
      error: Error | unknown | string;
    };

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

export type PossibleFailure<T = object> =
  | (T & { ok: true })
  | { ok: false; error: unknown };

export type PlatformEvent = {
  'session-started': PossibleFailure<{
    sessionId: string | null;
    username: string | null;
  }>;
  'storage-loaded': PossibleFailure<{ storage: Record<string, any> }>;
  'achievements-loaded': PossibleFailure<{ achievements: string[] }>;
  'achievement-unlocked': PossibleFailure<{ unlocked: boolean }>;
  'storage-saved': PossibleFailure<{ saved: boolean }>;
  'score-submitted': PossibleFailure<{ submitted: boolean }>;
  'before-ad': PossibleFailure;
  'after-ad': PossibleFailure;
  'ad-break-done': PossibleFailure<PlacementInfo>;
};

export type PlatformEventKey = keyof PlatformEvent;
export type PlatformEventPayload<
  T extends PlatformEventKey = PlatformEventKey
> = PlatformEvent[T];
export type PlatformSuccessPayload<T extends PlatformEventKey> = Exclude<
  PlatformEventPayload<T>,
  { ok: false }
>;
export type PlatformCallback<T extends PlatformEventKey> = (
  payload: PlatformEvent[T]
) => void;

export type GameEvent = {
  'start-session': object;
  'load-storage': { sessionId: string | null };
  'load-achievements': { sessionId: string | null };
  'unlock-achievements': { sessionId: string | null; achievementIds: string[] };
  'save-storage': { sessionId: string | null; data: Record<string, unknown> };
  'submit-score': { sessionId: string | null; score: number };
  'show-reward-ad': { name: string };
  'show-interstitial-ad': { name: string };
  'reward-user': {
    sessionId: string | null;
    itemId: string;
    quantity: number;
    source: string;
  };
};

export type GameEventKey = keyof GameEvent;
export type GameEventPayload<T extends GameEventKey = GameEventKey> =
  GameEvent[T];
export type GameEventCallback<T extends GameEventKey> = (
  payload: GameEvent[T]
) => void;

export type PluginEvent = {
  initializing: number;
  initialized: {
    ok: boolean;
  };
};
export type PluginEventKey = keyof PluginEvent;
export type PluginEventPayload<T extends PluginEventKey = PluginEventKey> =
  PluginEvent[T];
export type PluginCallback<T extends PluginEventKey> = (
  payload: PluginEvent[T]
) => void;

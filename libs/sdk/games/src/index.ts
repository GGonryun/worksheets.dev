export type GameMessage =
  | {
      event: 'start-session';
      input: null;
      output: {
        sessionId: string;
      } | null;
    }
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

export const communicator =
  (emitter: Window, timeout: number) =>
  <T extends GameMessageEvent>(message: MessageInput<T>) =>
    new Promise((resolve, reject) => {
      const event = 'message';
      const request = `${message.event}-request`;
      const success = `${message.event}-success`;
      const failure = `${message.event}-failure`;

      let timer: NodeJS.Timeout | undefined = undefined;

      // TODO: type gets clobbered
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const listener = ({ origin: messageOrigin, data }: any) => {
        if (timer) {
          clearTimeout(timer);
        }
        emitter.removeEventListener(event, listener);

        if (!isValidOrigin(messageOrigin)) {
          console.warn('Invalid origin in child', {
            messageOrigin,
          });
          return;
        }

        const d: MessageResponse<T> = data;
        if (d.event == success) {
          resolve(d.payload);
        }

        if (d.event === failure) {
          reject(d.error);
        }
      };

      emitter.addEventListener(event, listener);
      timer = setTimeout(() => {
        emitter.removeEventListener(event, listener);
        reject(new Error('timeout waiting for ' + request));
      }, timeout);

      emitter.parent.postMessage(
        { event: request, payload: message.payload },
        '*'
      );
    });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handlers = (emitter: Window, data: any) => {
  const promises: (() => Promise<void>)[] = [];
  const register = <T extends GameMessageEvent>(
    request: T,
    fn: (data: MessageRequest<T>['payload']) => Promise<GameMessageOutput<T>>
  ) => {
    const sender = (opts: MessageResponse<T>) => emitter.postMessage(opts, '*');

    promises.push(async () => {
      if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Invalid data type');
      }

      if (!('event' in data)) {
        throw new Error('Event not found');
      }

      if (!('payload' in data)) {
        throw new Error('Payload not found');
      }

      if (data.event === `${request}-request`) {
        try {
          sender({
            event: `${request}-success`,
            // TODO: type gets clobbered here
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            payload: (await fn(data.payload)) as any,
          });
        } catch (error) {
          sender({ event: `${request}-failure`, error });
        }
      }
    });
  };
  return {
    register,
    execute: async () => {
      await Promise.allSettled(promises.map((p) => p()));
    },
  };
};

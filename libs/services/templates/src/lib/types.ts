import { DiscordMessageInput } from '@worksheets/api/discord';
import { SendEmailInput } from '@worksheets/services/email';
import { TwitterTweetInput } from '@worksheets/services/twitter';

export type NotificationTemplate =
  | {
      type: 'new-game';
      payload: {
        id: string;
        title: string;
        description: string;
        developer: {
          id: string;
          name: string;
        };
      };
    }
  | {
      type: 'new-raffle';
      payload: {
        id: number;
        numWinners: number;
        expiresAt: Date;
        premium: boolean;
        name: string;
      };
    }
  | {
      type: 'won-raffle';
      payload: {
        raffle: {
          id: number;
        };
        user: {
          id: string;
          email: string;
        };
        item: {
          id: string;
          name: string;
          expiration: number | null;
        };
      };
    }
  | {
      type: 'expiring-item-reminder';
      payload: {
        user: {
          id: string;
          email: string;
        };
        item: {
          name: string;
        };
        expiresAt: Date;
      };
    }
  | {
      type: 'expired-item';
      payload: {
        user: {
          id: string;
          email: string;
        };
        item: {
          name: string;
        };
      };
    }
  | {
      type: 'raffle-expired';
      payload: {
        id: number;
        expiresAt: Date;
        numWinners: number;
        name: string;
        premium: boolean;
        participants: {
          user: {
            id: string;
          };
        }[];
      };
    }
  | {
      type: 'new-user';
      payload: {
        user: {
          id: string;
          email: string;
        };
      };
    }
  | {
      type: 'welcome-user';
      payload: {
        user: {
          id: string;
          email: string;
        };
      };
    }
  | {
      type: 'game-report';
      payload: {
        gameId: string;
        reason: string;
        text: string;
      };
    }
  | {
      type: 'user-report';
      payload: {
        againstId: string;
        senderId: string | null;
        text: string;
      };
    };

/** Helper Types **/
export type NotificationTemplateType = NotificationTemplate['type'];

// Create a typescript type that uses the NotificationType to determine the payload type
export type ExtractTemplatePayload<
  T extends NotificationTemplateType,
  U extends NotificationTemplate = NotificationTemplate
> = U extends {
  type: T;
  payload: infer P;
}
  ? P
  : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TemplateBuilder<T extends NotificationTemplateType = any> = (
  payload: ExtractTemplatePayload<T, NotificationTemplate>
) => {
  twitter?: TwitterTweetInput;
  discord?: DiscordMessageInput;
  email?: SendEmailInput;
};

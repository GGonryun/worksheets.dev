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
        expiresAt: Date;
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
        prize: {
          name: string;
        };
      };
    }
  | {
      type: 'expiring-code-reminder';
      payload: {
        user: {
          id: string;
          email: string;
        };
        code: {
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
        code: {
          name: string;
        };
      };
    }
  | {
      type: 'raffle-expired';
      payload: {
        id: number;
        expiresAt: Date;
        name: string;
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
    }
  | {
      type: 'game-submission';
      payload: {
        game: {
          id: string;
          title: string;
        };
        team: {
          id: string;
          name: string;
        };
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

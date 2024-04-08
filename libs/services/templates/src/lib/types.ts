import { PrizeType } from '@worksheets/prisma';
import { DiscordMessageInput } from '@worksheets/services/discord';
import { SendEmailInput } from '@worksheets/services/email';
import { ScheduleNewsletterInput } from '@worksheets/services/newsletter';
import { PushNotifyInput } from '@worksheets/services/push';
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
        prize: {
          id: string;
          name: string;
          type: PrizeType;
        };
        sponsor: {
          id: string;
          name: string;
        };
      };
    }
  | {
      type: 'won-raffle';
      payload: {
        user: {
          id: string;
          email: string;
        };
        prize: {
          id: string;
          name: string;
        };
      };
    }
  | {
      type: 'won-raffle-reminder';
      payload: {
        user: {
          id: string;
          email: string;
        };
        prize: {
          id: string;
          name: string;
        };
      };
    }
  | {
      type: 'unclaimed-prize';
      payload: {
        user: {
          id: string;
          email: string;
        };
        lastSentAt: Date | null;
      };
    }
  | {
      type: 'raffle-expired';
      payload: {
        id: number;
        expiresAt: Date;
        numWinners: number;
        participants: { userId: string }[];
        prize: { id: string; name: string };
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
      type: 'new-referral';
      payload: {
        user: {
          id: string;
        };
      };
    }
  | {
      type: 'gift-received';
      payload: {
        sender: {
          username: string;
        };
        recipient: {
          id: string;
        };
      };
    }
  | {
      type: 'new-follower';
      payload: {
        user: {
          id: string;
        };
        follower: {
          username: string;
        };
      };
    }
  | {
      type: 'new-game-submission';
      payload: {
        user: {
          id: string;
        };
        submission: {
          title: string | null;
        };
      };
    }
  | {
      type: 'confirm-newsletter-subscription';
      payload: {
        id: string;
        email: string;
      };
    }
  | {
      type: 'new-subscriber';
      payload: {
        email: string;
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
  newsletter?: ScheduleNewsletterInput[];
  discord?: DiscordMessageInput;
  push?: PushNotifyInput;
  email?: SendEmailInput;
  broadcast?: PushNotifyInput;
};

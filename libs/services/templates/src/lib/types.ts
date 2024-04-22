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
        premium: boolean;
        item: {
          id: string;
          name: string;
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
        item: {
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
        participants: {
          user: {
            id: string;
          };
        }[];
        item: { name: string };
      };
    }
  | {
      type: 'lost-raffle';
      payload: {
        id: number;
        expiresAt: Date;
        numWinners: number;
        participants: {
          user: {
            id: string;
          };
        }[];
        item: { name: string };
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
    }
  | {
      type: 'activation-code-redeemed';
      payload: {
        user: {
          id: string;
          email: string;
        };
        code: {
          content: string;
        };
        item: {
          name: string;
        };
      };
    }
  | {
      type: 'quest-completed';
      payload: {
        userId: string;
        quest: {
          title: string;
          reward: number;
        };
      };
    }
  | {
      type: 'new-battle';
      payload: {
        battleId: number;
        mobName: string;
        loot: number;
      };
    }
  | {
      type: 'battle-completed';
      payload: {
        mvp: string;
        userIds: string[];
        mob: {
          name: string;
          battleId: number;
          loot: number;
        };
      };
    }
  | {
      type: 'battle-mvp-awarded';
      payload: {
        userId: string;
        mob: {
          battleId: number;
          name: string;
          loot: number;
        };
      };
    }
  | {
      type: 'battle-loot-awarded';
      payload: {
        userIds: string[];
        mob: {
          battleId: number;
          name: string;
          loot: number;
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
  newsletter?: ScheduleNewsletterInput[];
  discord?: DiscordMessageInput;
  push?: PushNotifyInput;
  email?: SendEmailInput;
  broadcast?: PushNotifyInput;
};

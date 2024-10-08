import { DiscordMessageInput } from '@worksheets/api/discord';
import { SendEmailInput } from '@worksheets/services/email';
import { ScheduleNewsletterInput } from '@worksheets/services/newsletter';
import { PushNotifyInput } from '@worksheets/services/push';
import { TwitterTweetInput } from '@worksheets/services/twitter';
import {
  LeaderboardFrequency,
  PurchaseResultSchema,
} from '@worksheets/util/types';

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
      type: 'lost-raffle';
      payload: {
        id: number;
        expiresAt: Date;
        numWinners: number;
        participants: {
          user: {
            id: string;
          };
          numEntries: number;
        }[];
        item: { name: string; id: string };
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
      type: 'quest-completed';
      payload: {
        userId: string;
        quest: {
          name: string;
          loot: {
            item: {
              name: string;
            };
            quantity: number;
          }[];
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
        userIds: string[];
        battle: {
          id: number;
          mob: {
            name: string;
          };
        };
      };
    }
  | {
      type: 'battle-mvp-awarded';
      payload: {
        userId: string;
        battle: {
          id: number;
          mob: {
            name: string;
          };
        };
        loot: {
          item: {
            id: string;
            name: string;
          };
          quantity: number;
        };
      };
    }
  | {
      type: 'found-item';
      payload: {
        userId: string;
        item: {
          id: string;
          name: string;
        };
        game: {
          id: string;
          title: string;
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
      type: 'share-gift';
      payload: {
        friendId: string;
        from: {
          id: string;
          username: string;
        };
        item: {
          id: string;
          name: string;
        };
        giving: number;
        quantity: number;
      };
    }
  | {
      type: 'won-leaderboard';
      payload: {
        frequency: LeaderboardFrequency;
        rank: number;
        score: number;
        payout: number;
        game: {
          id: string;
          title: string;
        };
        user: {
          id: string;
          username: string;
        };
      };
    }
  | {
      type: 'achievement-unlocked';
      payload: {
        user: {
          id: string;
        };
        achievement: {
          id: string;
          name: string;
          game: {
            id: string;
            title: string;
          };
          loot: {
            item: {
              name: string;
            };
            quantity: number;
          }[];
        };
      };
    }
  | {
      type: 'prize-purchased';
      payload: PurchaseResultSchema;
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
  pushMany?: PushNotifyInput[];
  email?: SendEmailInput;
  broadcast?: PushNotifyInput;
};

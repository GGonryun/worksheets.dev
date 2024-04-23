import { QuestType } from '@worksheets/prisma';
import { assertNever } from '@worksheets/util/errors';
import { DetailedQuestSchema, QuestFormActions } from '@worksheets/util/types';

import { AddFriendQuestForm } from './add-friend-quest-form';
import { AddReferralQuestForm } from './add-referral-quest-form';
import { BasicActionQuestForm } from './basic-action-quest-form';
import { FollowTwitterQuestForm } from './follow-twitter-quest-form';
import { FriendPlayMinutesQuestForm } from './friend-play-minutes-quest-form';
import { PlayGameQuestForm } from './play-game-quest-form';
import { PlayMinutesQuestForm } from './play-minutes-quest-form';
import { RaffleParticipationQuestForm } from './raffle-participation-quest-form';
import { ReferralPlayMinutesQuestForm } from './referral-play-minutes-quest-form';
import { VisitWebsiteQuestForm } from './visit-website-quest-form';

export function QuestForm<T extends QuestType>({
  quest,
  actions,
}: {
  quest: DetailedQuestSchema<T>;
  actions: QuestFormActions<T>;
}) {
  switch (quest.type) {
    case QuestType.VISIT_WEBSITE:
      return (
        <VisitWebsiteQuestForm
          quest={quest as DetailedQuestSchema<'VISIT_WEBSITE'>}
          actions={actions as QuestFormActions<'VISIT_WEBSITE'>}
        />
      );
    case QuestType.PLAY_GAME:
      return (
        <PlayGameQuestForm quest={quest as DetailedQuestSchema<'PLAY_GAME'>} />
      );
    case QuestType.FOLLOW_TWITTER:
      return (
        <FollowTwitterQuestForm
          quest={quest as DetailedQuestSchema<'FOLLOW_TWITTER'>}
          actions={actions as QuestFormActions<'FOLLOW_TWITTER'>}
        />
      );
    case QuestType.ADD_FRIEND:
      return (
        <AddFriendQuestForm
          quest={quest as DetailedQuestSchema<'ADD_FRIEND'>}
        />
      );
    case QuestType.ADD_REFERRAL:
      return (
        <AddReferralQuestForm
          quest={quest as DetailedQuestSchema<'ADD_REFERRAL'>}
        />
      );
    case QuestType.RAFFLE_PARTICIPATION:
      return (
        <RaffleParticipationQuestForm
          quest={quest as DetailedQuestSchema<'RAFFLE_PARTICIPATION'>}
        />
      );
    case QuestType.PLAY_MINUTES:
      return (
        <PlayMinutesQuestForm
          quest={quest as DetailedQuestSchema<'PLAY_MINUTES'>}
        />
      );
    case QuestType.REFERRAL_PLAY_MINUTES:
      return (
        <ReferralPlayMinutesQuestForm
          quest={quest as DetailedQuestSchema<'REFERRAL_PLAY_MINUTES'>}
        />
      );
    case QuestType.FRIEND_PLAY_MINUTES:
      return (
        <FriendPlayMinutesQuestForm
          quest={quest as DetailedQuestSchema<'FRIEND_PLAY_MINUTES'>}
        />
      );
    case QuestType.BASIC_ACTION:
      return (
        <BasicActionQuestForm
          quest={quest}
          actions={actions as QuestFormActions<'BASIC_ACTION'>}
        />
      );
    default:
      throw assertNever(quest.type);
  }
}

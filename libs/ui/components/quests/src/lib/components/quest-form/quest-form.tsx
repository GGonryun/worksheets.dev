import { assertNever } from '@worksheets/util/errors';
import { Quest, QuestFormActions, QuestType } from '@worksheets/util/types';

import { AddFriendQuestForm } from './add-friend-quest-form';
import { AddReferralQuestForm } from './add-referral-quest-form';
import { FollowTwitterQuestForm } from './follow-twitter-quest-form';
import { FriendPlayMinutesQuestForm } from './friend-play-minutes-quest-form';
import { PlayGameQuestForm } from './play-game-quest-form';
import { PlayMinutesQuestForm } from './play-minutes-quest-form';
import { RaffleParticipationQuestForm } from './raffle-participation-quest-form';
import { ReferralPlayMinutesQuestForm } from './referral-play-minutes-quest-form';
import { VisitWebsiteQuestForm } from './visit-website-quest-form';

export const QuestForm: React.FC<{
  quest: Quest;
  actions: QuestFormActions;
}> = ({ quest, actions }) => {
  switch (quest.type) {
    case QuestType.VISIT_WEBSITE:
      return (
        <VisitWebsiteQuestForm
          quest={quest}
          actions={actions as QuestFormActions<'VISIT_WEBSITE'>}
        />
      );
    case QuestType.PLAY_GAME:
      return <PlayGameQuestForm quest={quest} />;
    case QuestType.FOLLOW_TWITTER:
      return (
        <FollowTwitterQuestForm
          quest={quest}
          actions={actions as QuestFormActions<'FOLLOW_TWITTER'>}
        />
      );
    case QuestType.ADD_FRIEND:
      return <AddFriendQuestForm quest={quest} />;
    case QuestType.ADD_REFERRAL:
      return <AddReferralQuestForm quest={quest} />;
    case QuestType.RAFFLE_PARTICIPATION:
      return <RaffleParticipationQuestForm quest={quest} />;
    case QuestType.PLAY_MINUTES:
      return <PlayMinutesQuestForm quest={quest} />;
    case QuestType.REFERRAL_PLAY_MINUTES:
      return <ReferralPlayMinutesQuestForm quest={quest} />;
    case QuestType.FRIEND_PLAY_MINUTES:
      return <FriendPlayMinutesQuestForm quest={quest} />;
    default:
      throw assertNever(quest);
  }
};

import { TaskType } from '@prisma/client';
import { assertNever } from '@worksheets/util/errors';
import { TaskFormProps } from '@worksheets/util/tasks';
import React from 'react';

import { AddFriendForm } from './add-friend-form';
import { AddReferralForm } from './add-referral-form';
import { BasicActionForm } from './basic-action-form';
import { BattleParticipationForm } from './battle-participation-form';
import { CustomInputForm } from './custom-input-form';
import { FollowTwitchForm } from './follow-twitch-form';
import { FollowTwitterForm } from './follow-twitter-form';
import { FriendPlayMinutesForm } from './friend-play-minutes-form';
import { JoinDiscordGuildForm } from './join-discord-guild-form';
import { PlayGameForm } from './play-game-form';
import { PlayMinutesForm } from './play-minutes-form';
import { PollForm } from './poll-form';
import { RaffleParticipationForm } from './raffle-participation-form';
import { ReferralPlayMinutesForm } from './referral-play-minutes-form';
import { RepostTwitterForm } from './repost-twitter-form';
import { SecretForm } from './secret-form';
import { VisitWebsiteForm } from './visit-website-form';
import { WatchAdForm } from './watch-ad-form';
import { WishlistSteamGameForm } from './wishlist-steam-game-form';

export const TaskForm: React.FC<TaskFormProps> = ({ task, actions }) => {
  switch (task.type) {
    case TaskType.VISIT_WEBSITE:
      return <VisitWebsiteForm task={task} actions={actions} />;
    case TaskType.PLAY_GAME:
      return <PlayGameForm task={task} actions={actions} />;
    case TaskType.FOLLOW_TWITTER:
      return <FollowTwitterForm task={task} actions={actions} />;
    case TaskType.REPOST_TWITTER:
      return <RepostTwitterForm task={task} actions={actions} />;
    case TaskType.ADD_FRIEND:
      return <AddFriendForm task={task} actions={actions} />;
    case TaskType.ADD_REFERRAL:
      return <AddReferralForm task={task} actions={actions} />;
    case TaskType.RAFFLE_PARTICIPATION:
      return <RaffleParticipationForm task={task} actions={actions} />;
    case TaskType.PLAY_MINUTES:
      return <PlayMinutesForm task={task} actions={actions} />;
    case TaskType.REFERRAL_PLAY_MINUTES:
      return <ReferralPlayMinutesForm task={task} actions={actions} />;
    case TaskType.FRIEND_PLAY_MINUTES:
      return <FriendPlayMinutesForm task={task} actions={actions} />;
    case TaskType.BASIC_ACTION:
      return <BasicActionForm task={task} actions={actions} />;
    case TaskType.WATCH_AD:
      return <WatchAdForm task={task} actions={actions} />;
    case TaskType.BATTLE_PARTICIPATION:
      return <BattleParticipationForm task={task} actions={actions} />;
    case TaskType.FOLLOW_TWITCH:
      return <FollowTwitchForm task={task} actions={actions} />;
    case TaskType.JOIN_DISCORD_GUILD:
      return <JoinDiscordGuildForm task={task} actions={actions} />;
    case TaskType.WISHLIST_STEAM_GAME:
      return <WishlistSteamGameForm task={task} actions={actions} />;
    case TaskType.FORM:
      return <CustomInputForm task={task} actions={actions} />;
    case TaskType.POLL:
      return <PollForm task={task} actions={actions} />;
    case TaskType.SECRET:
      return <SecretForm task={task} actions={actions} />;
    default:
      throw assertNever(task.type);
  }
};
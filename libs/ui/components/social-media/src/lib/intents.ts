import { routes } from '@worksheets/ui/routes';
import { FriendsPanels } from '@worksheets/util/enums';

const CHARITY_GAMES_TWITTER_HANDLE = 'charitydotgames';

type SocialProviderIntent = {
  twitter?: string;
  facebook?: string;
  reddit?: string;
};

export const shareGameIntent = ({
  title,
  id,
}: {
  title: string;
  id: string;
}): SocialProviderIntent => {
  const url = routes.game.url({
    params: {
      gameId: id,
    },
  });
  const text = `Play ${title} on Charity.Games, win free prizes, and earn money for charity!`;

  return {
    twitter: twitterIntent(
      url,
      text,
      ['browsergames', 'html5games'],
      CHARITY_GAMES_TWITTER_HANDLE
    ),
    facebook: facebookIntent(url),
    reddit: redditIntent('webgames', url, text),
  };
};

export const addFriendsIntent = ({
  friendCode,
}: {
  friendCode: string;
}): SocialProviderIntent => {
  const url = routes.account.friends.url({
    query: {
      code: friendCode,
    },
    bookmark: FriendsPanels.AddFriends,
  });

  const text = `Add me as a friend on Charity.Games!`;

  return {
    twitter: twitterIntent(
      url,
      text,
      ['browsergames', 'html5games'],
      CHARITY_GAMES_TWITTER_HANDLE
    ),
    facebook: facebookIntent(url),
  };
};

export const sharePrizeIntent = ({
  name,
  id,
}: {
  name: string;
  id: number;
}) => {
  const url = routes.prize.url({
    params: {
      prizeId: id,
    },
  });
  const text = `Win ${name} on Charity.Games, and earn money for charity!`;

  return {
    twitter: twitterIntent(
      url,
      text,
      ['freeprizes'],
      CHARITY_GAMES_TWITTER_HANDLE
    ),
    facebook: facebookIntent(url),
  };
};

export const shareRaffleIntent = ({
  name,
  id,
}: {
  name: string;
  id: number;
}) => {
  const url = routes.raffle.url({
    params: {
      raffleId: id,
    },
  });
  const text = `Enter to win ${name} on Charity.Games, and earn money for charity!`;

  return {
    twitter: twitterIntent(
      url,
      text,
      ['freeprizes', 'raffle'],
      CHARITY_GAMES_TWITTER_HANDLE
    ),
    facebook: facebookIntent(url),
  };
};

export const shareReferralIntent = (link: string) => {
  const url = link;
  const text = `Join me on Charity.Games, and earn money for charity!`;

  return {
    twitter: twitterIntent(
      url,
      text,
      ['freeprizes'],
      CHARITY_GAMES_TWITTER_HANDLE
    ),
    facebook: facebookIntent(url),
  };
};

type SubRedditName = 'webgames';

const redditIntent = (subreddit: SubRedditName, url: string, title: string) =>
  `https://www.reddit.com/r/${subreddit}/submit?url=${encodeURIComponent(
    url
  )}&title=${encodeURIComponent(title)}`;

const twitterIntent = (
  url: string,
  text: string,
  hashtags: string[],
  via: string
) =>
  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(text)}&hashtags=${encodeURIComponent(
    hashtags.join(',')
  )}&via=${encodeURIComponent(via)}`;

const facebookIntent = (url: string) =>
  `https://www.facebook.com/sharer.php?u=${url}`;

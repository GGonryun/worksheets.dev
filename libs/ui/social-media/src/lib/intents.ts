import { GameInfo } from '@worksheets/util/types';

const CHARITY_GAMES_TWITTER_HANDLE = 'charitydotgames';

export const shareGame = {
  twitter: ({ title, url }: GameInfo) =>
    `https://twitter.com/intent/tweet?url=${url}&text=${title}&hashtags=browsergames%20%23html5games&via=${CHARITY_GAMES_TWITTER_HANDLE}`,
  facebook: ({ url }: GameInfo) =>
    `https://www.facebook.com/sharer.php?u=${url}`,
  reddit: ({ title, url }: GameInfo) =>
    `https://www.reddit.com/r/webgames/submit?url=${url}&title=${title}`,
};

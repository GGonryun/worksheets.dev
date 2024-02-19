import {
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET,
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
} from '@worksheets/services/environment';
import { TwitterApi } from 'twitter-api-v2';

export const postTweet = async (text: string) => {
  const userClient = new TwitterApi({
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_SECRET,
    accessToken: TWITTER_ACCESS_TOKEN_KEY,
    accessSecret: TWITTER_ACCESS_TOKEN_SECRET,
  });

  try {
    await userClient.v2.tweet(text);
    console.log('Tweet posted successfully');
  } catch (e) {
    console.error('Error occurred while posting tweet', e);
  }
};

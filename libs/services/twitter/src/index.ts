import {
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET,
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
} from '@worksheets/services/environment';
import { TwitterApi } from 'twitter-api-v2';

export type TwitterTweetInput = string;
export class TwitterService {
  #client: TwitterApi;

  constructor() {
    this.#client = this.client();
  }

  private client() {
    return new TwitterApi({
      appKey: TWITTER_API_KEY,
      appSecret: TWITTER_API_SECRET,
      accessToken: TWITTER_ACCESS_TOKEN_KEY,
      accessSecret: TWITTER_ACCESS_TOKEN_SECRET,
    });
  }

  public async tweet(text: TwitterTweetInput) {
    if (!text) return;

    try {
      return await this.#client.v2.tweet(text);
    } catch (error) {
      console.error('Failed to post tweet', error);
      return undefined;
    }
  }

  public async me() {
    await this.#client.v2.user('me');
  }
}

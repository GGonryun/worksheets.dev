import {
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET,
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
} from '@worksheets/services/environment';
import { TwitterApi } from 'twitter-api-v2';

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

  public async tweet(text: string) {
    try {
      await this.#client.v2.tweet(text);
      console.log('Tweet posted successfully');
    } catch (e) {
      console.error('Error occurred while posting tweet', e);
    }
  }
}

import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { Options } from 'client-oauth2';
import ClientOAuth2 from 'client-oauth2';

export type OAuthToken = ClientOAuth2.Token;

type TokenData = ClientOAuth2.Token['data'] & { expiry: string };

export type BaseOAuthOptions = Options;

export type ParseUrlOverride = (
  options: BaseOAuthOptions,
  code: string
) => Promise<string>;

export type OAuthOptions = BaseOAuthOptions;

export type SecureToken = {
  expiry: number;
  data: unknown;
};

function baseOAuthUrl() {
  return SERVER_SETTINGS.WEBSITES.APP_URL();
}

export class OAuthClient {
  opts: BaseOAuthOptions;
  constructor(opts: OAuthOptions) {
    const { ...args } = opts;
    this.opts = { ...args, redirectUri: `${baseOAuthUrl()}/api/oauth` };
  }

  private client(state?: string) {
    return new ClientOAuth2({
      ...this.opts,
      state,
    });
  }

  getUri(state: string): string {
    return this.client(state).code.getUri();
  }

  async parseUrl(url: string): Promise<OAuthToken> {
    return await this.client().code.getToken(url);
  }

  serialize(token: OAuthToken): string {
    // suggested expiration:
    const suggestedExpiration =
      Number(token.data['expires_in'] || THIRTY_DAYS) * 1000; // ms
    const expiry = Date.now() + suggestedExpiration;
    return JSON.stringify({ ...token.data, expiry: `${expiry}` });
  }

  deserialize(raw: string): OAuthToken {
    if (typeof raw !== 'string') {
      throw Error('cannot check token expiration on non-stringified token');
    }
    const data: TokenData = JSON.parse(raw);

    const { expiry, ...token } = data;
    // reassign expiry to token as "expires_in"
    const expires_in = (Number(expiry) - Date.now()) / 1000;
    token['expires_in'] = `${expires_in}`;

    return this.client().createToken(token);
  }
}
// days * hours * minutes * seconds * ms in 1 second
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

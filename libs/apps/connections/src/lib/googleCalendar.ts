import { z } from '@worksheets/zod';
import {
  ConnectionContextTranslationFunction,
  ConnectionForm,
  ConnectionValidationFunction,
} from './framework';

const instructions = `
Lorem markdownum, spoliis dixit quid, una aquis murra fugaverat domos! Fuerat
quid: atque ut mutatus, et est primusque, noverit fere hac? Mihi sed speciem
quamvis *perforat domina dederis* rubetis geratur, ex ab.

- Iamque pari sitis hominum spectacula erat nunc. Angues exspectato detur, secuta est. Creditis pater, experiensque saltem.
- Aries deos guttura subsidere formam conceptas inmensum.
- *Pietas* alumni usum tenebris potiatur non potuit Clymene oculos, cum. Et bracchia dixerunt, candore, quem.
- Pressum ut sustulit custos et superet caesumque semel; tenet moror se est equi deposuit. Pro cum tenuit fugio tamen labentia precor at et mea viros! Partim de tot scelerata vestigia.`;

const security = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare arcu odio ut sem nulla pharetra diam sit. Curabitur gravida arcu ac tortor dignissim convallis aenean. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Mi ipsum faucibus vitae aliquet. Tortor pretium viverra suspendisse potenti nullam ac tortor. Hac habitasse platea dictumst quisque sagittis. Ultrices in iaculis nunc sed augue lacus. Molestie at elementum eu facilisis sed odio morbi. A lacus vestibulum sed arcu non odio. Urna duis convallis convallis tellus id interdum velit laoreet id.


Non sodales neque sodales ut etiam. In nibh mauris cursus mattis molestie a iaculis at erat. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Porttitor lacus luctus accumsan tortor. Aliquam ut porttitor leo a diam. Penatibus et magnis dis parturient montes nascetur. Elit ullamcorper dignissim cras tincidunt lobortis. In metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Feugiat scelerisque varius morbi enim. Neque laoreet suspendisse interdum consectetur libero id faucibus.`;

const form: ConnectionForm<'googleCalendar'> = {
  setupTime: 5,
  instructions,
  security,
  tutorialUrl:
    'https://docs.worksheets.dev/tutorial/integrations/googleCalendar',
  fields: {
    accessToken: {
      type: 'oauth' as const,
      title: 'Access Token',
      helpUrl:
        'https://docs.worksheets.dev/tutorial/integrations/googleCalendar#access-token',
      options: {
        clientId: process.env['GOOGLE_APP_CLIENT_KEY'],
        clientSecret: process.env['GOOGLE_APP_SECRET_KEY'],
        accessTokenUri: 'https://oauth2.googleapis.com/token',
        authorizationUri: 'https://accounts.google.com/o/oauth2/v2/auth',
        scopes: [
          'openid',
          'https://www.googleapis.com/auth/calendar',
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ],
        query: {
          access_type: 'offline',
          include_granted_scopes: 'true',
          prompt: 'consent',
        },
      },
      schema: z.object({
        access_token: z.string(),
      }),
    },
  },
};

export const translator: ConnectionContextTranslationFunction<
  'googleCalendar'
> = (connection) => {
  const response = {
    accessToken: '',
  };
  if (!connection.accessToken || typeof connection.accessToken != 'string') {
    return response;
  }
  const token = JSON.parse(connection.accessToken);
  if (!token.access_token) {
    return response;
  }

  response.accessToken = token.access_token;
  return response;
};

const validator: ConnectionValidationFunction<'googleCalendar'> = async (
  connection
) => {
  if (connection.accessToken === '') {
    return { errors: { '': 'Access Token is required' } };
  }

  console.error('TODO: validate googleCalendar access token');
  return {};
};

export default { form, validator, translator };
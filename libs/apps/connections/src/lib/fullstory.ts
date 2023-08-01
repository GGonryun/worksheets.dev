import { z } from '@worksheets/zod';
import {
  ConnectionContextTranslationFunction,
  ConnectionForm,
  ConnectionValidationFunction,
} from './framework';
import { handlers } from '@worksheets/apps-handlers';

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

const form: ConnectionForm<'fullstory'> = {
  setupTime: 5,
  instructions,
  security,
  tutorialUrl: 'https://docs.worksheets.dev/tutorial/integrations/fullstory',
  fields: {
    apiKey: {
      type: 'sensitive',
      title: 'API Key',
      helpUrl:
        'https://docs.worksheets.dev/tutorial/integrations/fullstory#api-key',
      schema: z.string(),
    },
  },
};

const translator: ConnectionContextTranslationFunction<'fullstory'> = (x) => x;

const validator: ConnectionValidationFunction<'fullstory'> = async (
  connection
) => {
  const context = translator(connection);
  if (context.apiKey === '') {
    return { error: 'API Key is required' };
  }

  try {
    const user = await handlers.fullstory.me({
      context,
      input: undefined,
    });
    if (user.role !== 'ADMIN') {
      return {
        error: 'You API Key must have the ADMIN role to connect to FullStory',
      };
    }
    return { error: undefined };
  } catch (error) {
    console.error('Unexpected FullStory validation error', error);
    return {
      error:
        'There is an unexpected error with your connection to FullStory, please resintall or reach out to Customer Support.',
    };
  }
};

export default { form, validator, translator };

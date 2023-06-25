import {
  newApplication,
  newSettings,
  newTokenSetting,
} from '@worksheets/apps/framework';
import { completionsCreate } from './lib/completions/create';
import { imagesCreate } from './lib/images/create';
import { modelsRead } from './lib/models/read';

export const settings = newSettings({
  apiKey: newTokenSetting({
    required: true,
  }),
});

export default newApplication({
  id: 'openai',
  logo: '',
  settings,
  label: 'Open AI',
  description: `The OpenAI API uses API keys for authentication. Visit your API Keys page to retrieve the API key you'll use in your requests.`,
  methods: [completionsCreate, imagesCreate, modelsRead],
});

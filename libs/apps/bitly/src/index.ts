import { newApplication } from '@worksheets/apps/framework';
import { shortenUrl } from './lib/shortenUrl';

export default newApplication({
  label: 'Bitly',
  description: '',
  methods: [shortenUrl],
});

import { newApplication } from '@worksheets/apps/framework';
import { length } from './lib/length';

export default newApplication({
  id: 'core',
  label: 'Core',
  description: 'These applications do not have a namespace',
  methods: [length],
  logo: '',
  settings: null,
});

import { newApplication } from '@worksheets/apps/framework';
import { take } from './lib/take';

export default newApplication({
  label: 'Screenshot One',
  description:
    'ScreenshotOne is a scalable and straightforward screenshot API to cover all your needs by making screenshots. It converts any given URL or HTML to PNG, PDF, etc.',
  methods: [take],
});

import { newApplication } from '@worksheets/apps/framework';

import { avg } from './lib/avg';
import { calc } from './lib/calc';
import { identity } from './lib/identity';
import { max } from './lib/max';
import { min } from './lib/min';

export default newApplication({
  label: 'Math',
  description: '',
  methods: {
    'math.avg': avg,
    'math.calc': calc,
    'math.identity': identity,
    'math.max': max,
    'math.min': min,
  },
});

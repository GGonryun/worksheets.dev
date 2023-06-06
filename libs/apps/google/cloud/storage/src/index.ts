import { newApplication } from '@worksheets/apps/framework';
import { getBuckets } from './lib/buckets/read';
import { bucketUpload } from './lib/buckets/upload';
import { bucketDownload } from './lib/buckets/download';

export default newApplication({
  label: 'Google Cloud Storage',
  description: '',
  methods: [getBuckets, bucketUpload, bucketDownload],
});

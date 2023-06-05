import {
  MethodCallFailure,
  newMethod,
  newTokenSetting,
} from '@worksheets/apps/framework';
import { z } from 'zod';

const access_key = newTokenSetting({
  required: true,
});

export const take = newMethod({
  path: 'screenshotone.take',
  label: 'Take a screenshot',
  description:
    'Converts any given URL or HTML into PNG, PDF, GIF, and more file types.',
  settings: { access_key },
  input: z.object({
    url: z.string(),
    format: z
      .enum([
        'png',
        'jpeg',
        'jpg',
        'webp',
        'gif',
        'jp2',
        'tiff',
        'avif',
        'heif',
        'pdf',
        // TODO: add support for html. 'html',
      ])
      .default('jpg'),
  }),
  output: z.string().describe('base64 encoded blob'),
  async call({ settings, input }) {
    const result = await fetch(
      `https://api.screenshotone.com/take?url=${input.url}&access_key=${settings.access_key}`,
      {
        method: 'GET',
      }
    );

    const buffer = Buffer.from(await result.arrayBuffer());
    const contentType = result.headers.get('Content-Type');
    const b64 = buffer.toString('base64');

    if (!result.ok) {
      console.error(`screenshot one failed`, result.status);
      throw new MethodCallFailure({
        code: result.status,
        message: 'screenshot one failed to capture image',
      });
    }

    console.info(
      `screenshot one create a new ${contentType} screenshot`,
      result.status
    );
    return `data:${contentType};base64,${b64}`;
  },
});

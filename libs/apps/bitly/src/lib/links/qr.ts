import { MethodCallFailure, newMethod } from '@worksheets/apps/framework';
import { z } from 'zod';
import { auth } from '../common';
import { ContentType, fetcher } from '@worksheets/util/http';

const { composer, bearer, content, method } = fetcher;

export const linksQR = newMethod({
  path: 'bitly.links.qr',
  label: 'Get QR Code',
  description:
    'After creating a short link, you can generate a QR Code for it via the API. QR Code colors and file type options may be available depending on your Bitly subscription plan.',

  settings: { auth },

  input: z.string().describe('bitlink'),

  output: z.object({
    created: z.string(),
    modified: z.string(),
    id: z.string(),
    link: z.string(),
    qr_code: z.string(),
    customization: z.unknown(),
  }),

  async call({ settings, input }) {
    const result = await composer()(
      method('GET'),
      bearer(settings.auth.accessToken),
      content(ContentType.JSON)
    )(`https://api-ssl.bitly.com/v4/bitlinks/${input}/qr`);

    const data = await result.json();

    if (!result.ok) {
      const message = `bitly failed to generate qr code`;
      console.error(message);
      throw new MethodCallFailure({
        code: result.status,
        message,
        data: data,
      });
    }

    console.info(`bitly generated a qr code`, data.link);

    return data;
  },
});

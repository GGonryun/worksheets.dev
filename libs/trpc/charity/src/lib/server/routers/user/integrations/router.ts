import { CaptchaService } from '@worksheets/services/captchas';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  recaptcha: t.router({
    verify: protectedProcedure
      .input(z.custom<Parameters<CaptchaService['verify']>[1]>())
      .output(z.custom<Awaited<ReturnType<CaptchaService['verify']>>>())
      .mutation(async ({ input, ctx: { user } }) => {
        const captcha = new CaptchaService();
        return captcha.verify(user.id, input);
      }),
  }),
});

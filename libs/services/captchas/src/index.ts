import { TRPCError } from '@trpc/server';

export class CaptchaService {
  async verify(userId: string, { token }: { token: string }): Promise<boolean> {
    console.info(`Verifying captcha for user ${userId}`);
    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env['RECAPTCHA_SECRET_KEY']}&response=${token}`,
        {
          method: 'POST',
        }
      );

      if (!response.ok) {
        console.error(
          `Captcha verification failed for user ${userId}`,
          await response.text()
        );
        return false;
      }

      const data = await response.json();
      console.log('Captcha verification response:', data);
      if ('success' in data) {
        return data.success;
      }
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Captcha verification failed',
        cause: data,
      });
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Captcha verification failed',
        cause: error,
      });
    }
  }
}

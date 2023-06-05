import { MethodCallFailure, newTokenSetting } from '@worksheets/apps/framework';

export const apikey = newTokenSetting({
  required: true,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleOpenAIError = (error: any, message: string) => {
  const data = error?.response?.data ?? {};
  console.error(`open-ai ${message}`, data);
  throw new MethodCallFailure({
    code: error?.response?.status ?? 500,
    message: data?.error?.message ?? 'unknown open ai failure',
    data,
  });
};

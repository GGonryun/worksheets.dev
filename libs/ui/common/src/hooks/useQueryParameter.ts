import { useRouter } from 'next/router';

export const useQueryParameter = (key: string, defaultValue?: string) => {
  const { query } = useRouter();
  return query[key] || defaultValue;
};

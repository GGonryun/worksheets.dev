import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

export const Redirect: FC<{ to: string }> = ({ to }) => {
  const { push } = useRouter();

  useEffect(() => {
    if (!to) return;
    push(to);
  }, [push, to]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

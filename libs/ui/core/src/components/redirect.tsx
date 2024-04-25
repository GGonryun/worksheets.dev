import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export const Redirect: React.FC<{
  href: string;
  placeholder?: React.ReactNode;
}> = ({ href, placeholder }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(href);
  }, [router, href]);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{placeholder ?? null}</>;
};

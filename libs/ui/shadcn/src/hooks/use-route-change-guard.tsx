import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRouteChangeGuard = (shouldWarn: boolean) => {
  const router = useRouter();

  useEffect(() => {
    if (!shouldWarn) return;

    const handleRouteChangeStart = (url: string) => {
      if (
        !confirm('You have unsaved changes. Are you sure you want to leave?')
      ) {
        throw 'Abort route change. Please ignore this error.';
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [shouldWarn]);
};

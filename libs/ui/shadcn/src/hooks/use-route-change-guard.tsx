import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

export const useRouteChangeGuard = (shouldWarn: boolean) => {
  const router = useRouter();

  const handleRouteChangeStart = useCallback(() => {
    if (!confirm('You have unsaved changes. Are you sure you want to leave?')) {
      throw 'Abort route change. Please ignore this error.';
    }
  }, []);

  useEffect(() => {
    if (!shouldWarn) return;

    router.events.on('routeChangeStart', handleRouteChangeStart);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [shouldWarn]);
};

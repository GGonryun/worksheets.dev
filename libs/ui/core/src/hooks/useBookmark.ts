'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useEventListener } from './useEventListener';

export const useBookmark = <T extends string>() => {
  const path = usePathname();
  const [bookmark, setBookmark] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (path && path.includes('#')) {
      setBookmark(path.split('#')[1] as T);
    }
  }, [path]);

  useEffect(() => {
    // when bookmark changes scroll to the element with the id
    if (bookmark) {
      const element = document?.getElementById(bookmark);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [bookmark]);

  // when the hash changes, update the bookmark state to the new hash
  // TODO: verify if this is needed and if it works on all browsers
  useEventListener('hashchange', (event) => {
    if (event.newURL && event.newURL.includes('#')) {
      setBookmark(event.newURL.split('#')[1] as T);
    }
  });

  return bookmark;
};

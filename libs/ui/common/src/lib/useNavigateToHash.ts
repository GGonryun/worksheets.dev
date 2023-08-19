import { useEffect } from 'react';

// source: https://github.com/vercel/next.js/issues/11109#issuecomment-751429015
export const useNavigateToHash = () => {
  useEffect(() => {
    const path = window.location.hash;
    if (path && path.includes('#')) {
      setTimeout(() => {
        const id = path.replace('#', '');
        const el = window.document.getElementById(id);
        const r = el?.getBoundingClientRect();
        window?.top?.scroll({
          // eslint-disable-next-line no-restricted-globals
          top: pageYOffset + (r?.top ?? 0),
          behavior: 'smooth',
        });
      }, 600);
    }
  });
};

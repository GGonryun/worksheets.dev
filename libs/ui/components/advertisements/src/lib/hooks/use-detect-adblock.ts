import { useEffect, useState } from 'react';

export const useDetectAdBlock = () => {
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    // grab a domain from https://github1s.com/gorhill/uBlock/blob/master/docs/tests/hostname-pool.js
    const urls = [
      'https://www3.doubleclick.net',
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    ];
    Promise.all(
      urls.map((url) =>
        fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-store' })
      )
    )
      .then((responses) => {
        if (responses.some((response) => response.redirected)) {
          console.info('AdBlock detected');
          setAdBlockDetected(true);
        }
      })
      .catch(() => {
        console.info('AdBlock detected');
        setAdBlockDetected(true);
      });
  }, []);

  return adBlockDetected;
};

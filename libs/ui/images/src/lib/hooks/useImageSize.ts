import { useEffect, useState } from 'react';

const ERROR = {
  WINDOW_IS_NOT_DEFINED: 'Window is not defined',
  URL_IS_NOT_DEFINED: 'Url is not defined',
  TIMEOUT: 'Timeout',
} as const;

type Options = {
  timeout?: number;
};

type Dimensions = {
  width: number;
  height: number;
};

export const getImageSize = (
  url: string,
  options: Options = {}
): Promise<Dimensions> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      return reject(ERROR.WINDOW_IS_NOT_DEFINED);
    }

    if (!url) {
      return reject(ERROR.URL_IS_NOT_DEFINED);
    }

    let timer: number | null = null;

    const img = new Image();

    img.addEventListener('load', () => {
      if (timer) {
        window.clearTimeout(timer);
      }

      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    });

    img.addEventListener('error', (event) => {
      if (timer) {
        window.clearTimeout(timer);
      }

      reject(`${event.type}: ${event.message}`);
    });

    img.src = url;

    if (options.timeout) {
      timer = window.setTimeout(() => reject(ERROR.TIMEOUT), options.timeout);
    }
  });
};

export const useImageSize = (url: string, options?: Options) => {
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setDimensions(null);

      try {
        const { width, height } = await getImageSize(url, options);

        setDimensions({ width, height });
      } catch (error: unknown) {
        setError((error as string).toString());
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [url, options]);

  return { dimensions, loading, error };
};

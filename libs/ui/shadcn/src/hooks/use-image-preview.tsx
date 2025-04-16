import { useState, useEffect } from 'react';

const loadImagePreview = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        // Check image dimensions
        const img = new Image();
        const newPreview = event.target?.result as string;

        img.onload = () => {
          resolve(newPreview);
        };
        img.src = newPreview;
      }
    };

    reader.readAsDataURL(file);
  });
};

export const useImagePreview = (files?: File[]) => {
  const [preview, setPreview] = useState<string[]>([]);

  useEffect(() => {
    const loader = async () => {
      setPreview([]);

      if (!files || !files.length) {
        return;
      }

      for (const file of files) {
        const preview = await loadImagePreview(file);
        setPreview((prev) => [...prev, preview]);
      }
    };

    loader();
  }, [files]);

  return preview;
};

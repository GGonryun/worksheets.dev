import { z } from 'zod';

export const fileSchema = z
  .custom<File>()
  .refine((file) => file instanceof File, { message: 'File is required' });

export const loadImage = async (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        const img = new Image();
        img.onload = () => {
          resolve(img);
        };
        img.onerror = (error) => {
          reject(error);
        };
        img.src = event.target.result;
      } else {
        reject(new Error('Failed to load image'));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export const uploadFileWithProgress = (
  file: File,
  signedUrl: string,
  onProgress: (progress: number) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', signedUrl, true);

    // Optional: Set the content type if your signed URL expects it
    xhr.setRequestHeader('Content-Type', file.type);

    // Progress event
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        onProgress(Math.ceil(percentComplete));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log('Upload successful!');
        resolve();
      } else {
        console.error('Upload failed:', xhr.responseText);
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      console.error('XHR error');
      reject(new Error('XHR error'));
    };

    xhr.send(file);
  });
};

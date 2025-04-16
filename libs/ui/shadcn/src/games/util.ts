import { z } from 'zod';

const loadImage = (file: File): Promise<HTMLImageElement | undefined> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      resolve(undefined);
    };
    img.src = URL.createObjectURL(file);
  });
};

export const sizeConstraint = (maxBytes: number) => (file: File) =>
  file.size <= maxBytes;

export const dimensionsConstraint =
  ({ width, height }: { width?: number; height?: number }) =>
  async (file: File) => {
    const img = await loadImage(file);
    if (!img) return false;
    let isHeight = true;
    let isWidth = true;
    if (width) isWidth = img.width >= width;
    if (height) isHeight = img.height >= height;
    return isHeight && isWidth;
  };

export const typeConstraint = (validTypes: string[]) => (file: File) =>
  validTypes.includes(file.type);

export const fileSchema = z
  .custom<File>()
  .refine((file) => file instanceof File, { message: 'File is required' });

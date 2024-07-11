export type RGB = { r: number; g: number; b: number };
export const hexToRgb = (hex: number): RGB => {
  const r = (hex >> 16) & 255;
  const g = (hex >> 8) & 255;
  const b = hex & 255;

  return { r, g, b };
};

export const formatRgb = (rgb: RGB) => {
  return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
};

export const paintBody = (color: number) => {
  const body = document.querySelector('body');
  if (body) {
    const rgb = hexToRgb(color);
    body.style.backgroundColor = formatRgb(rgb);
  }
};

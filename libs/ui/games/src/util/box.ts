export type Boxy = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export function getBox(element: HTMLDivElement): Boxy {
  const bounds = getBoundsWithoutTransform(element);
  return {
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
  };
}

export function getBoundsWithoutTransform(element: HTMLDivElement) {
  const transform = element.style.transform;
  element.style.transform = '';
  const bounds = element.getBoundingClientRect();
  element.style.transform = transform;
  return bounds;
}

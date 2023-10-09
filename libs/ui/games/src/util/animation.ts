export const animate = (y: number, delay: number) => ({
  initial: {
    opacity: 0,
    y,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    delay,
    duration: DEFAULT_ANIMATION_DURATION,
  },
});

export const DEFAULT_ANIMATION_TIMEOUT = 1000; // milliseconds
export const DEFAULT_ANIMATION_SPEED = 0.3; // seconds
export const DEFAULT_ANIMATION_DURATION = 0.5; // seconds

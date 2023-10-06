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
    duration: 0.5,
  },
});

export const tabletBoxShadow = `rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.4) 0px -3px 0px inset`;

export const svgBoxShadow = (height = 1.5, power = 0.5) =>
  `drop-shadow(${height * 0.75}px ${
    height * 0.75
  }px ${height}px rgba(0, 0, 0, ${power}))`;

export const textShadow = (height = 1.5, power = 0.5) =>
  `rgba(0, 0, 0, ${power}) ${height * 0.75}px ${height * 0.75}px ${height}px`;

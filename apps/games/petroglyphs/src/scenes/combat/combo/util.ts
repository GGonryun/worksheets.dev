export const getCascadeMessage = (n: number) => {
  switch (n) {
    case 2:
      return 'DOUBLE CASCADE!';
    case 3:
      return 'TRIPLE CASCADE!';
    case 4:
      return 'QUADRUPLE CASCADE!';
    case 5:
      return 'QUINTUPLE CASCADE!';
    case 6:
      return 'SEXTUPLE CASCADE!';
    case 7:
      return 'SEPTUPLE CASCADE!';
    case 8:
      return 'OCTUPLE CASCADE!';
    case 9:
      return 'NONUPLE CASCADE!';
    case 10:
      return 'DECUPLE CASCADE!';
    default:
      return 'MEGA CASCADE!';
  }
};

export const getComboMatchMessage = (n: number) => {
  switch (n) {
    case 2:
      return 'DOUBLE MATCH!';
    case 3:
      return 'TRIPLE MATCH!';
    case 4:
      return 'QUADRUPLE MATCH!';
    case 5:
      return 'QUINTUPLE MATCH!';
    case 6:
      return 'SEXTUPLE MATCH!';
    case 7:
      return 'SEPTUPLE MATCH!';
    case 8:
      return 'OCTUPLE MATCH!';
    case 9:
      return 'NONUPLE MATCH!';
    case 10:
      return 'DECUPLE MATCH!';
    default:
      return 'MEGA COMBO!';
  }
};

export const toTuple = (n: number) => {
  switch (n) {
    case 2:
      return 'double';
    case 3:
      return 'triple';
    case 4:
      return 'quadruple';
    case 5:
      return 'quintuple';
    case 6:
      return 'sextuple';
    case 7:
      return 'septuple';
    case 8:
      return 'octuple';
    case 9:
      return 'nonuple';
    case 10:
      return 'decuple';
    default:
      return 'mega';
  }
};

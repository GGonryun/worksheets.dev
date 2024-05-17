import { PaletteColor } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body3: React.CSSProperties;
    mPlus1p: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    mPlus1p?: React.CSSProperties;
  }

  interface SimplePaletteColorOptions {
    gradient?: string;
    shadow?: string;
  }

  interface PaletteColor {
    gradient: string;
    shadow: string;
  }

  interface Palette {
    discord: SimplePaletteColorOptions;
    steam: SimplePaletteColorOptions;
    twitch: SimplePaletteColorOptions;
    black: SimplePaletteColorOptions;
    white: SimplePaletteColorOptions;
    border: SimplePaletteColorOptions;
    'dark-grey': SimplePaletteColorOptions;
  }

  interface TypeText {
    marketing: {
      gradients: {
        blue: {
          light: string;
          main: string;
          dark: string;
        };
        red: {
          main: string;
        };
        orange: {
          main: string;
        };
        yellow: {
          main: string;
        };
      };
    };
    white: string;
    arcade: string;
    red: { light: string; dark: string };
    yellow: string;
    blue: {
      soft: string;
      lightest: string;
      lighter: string;
      light: string;
      main: string;
      dark: string;
      darker: string;
    };
  }

  interface TypeBackground {
    wallpaper: string;
    marketing: {
      gradients: {
        blue: {
          transparent: string;
          secondary: string;
          primary: string;
        };
      };
    };
    ['transparent-blue']: string;
    ['solid-blue']: string;
    ['gradient-blue']: string;
    ['gradient-soft']: string;
    ['soft']: string;
  }

  interface PaletteOptions {
    discord: SimplePaletteColorOptions;
    steam: SimplePaletteColorOptions;
    twitch: SimplePaletteColorOptions;
    black: SimplePaletteColorOptions;
    white?: SimplePaletteColorOptions;
    border?: SimplePaletteColorOptions;
    'dark-grey'?: SimplePaletteColorOptions;
  }

  interface BreakpointOverrides {
    mobile1: true;
    mobile2: true;
    desktop1: true;
    desktop2: true;
    desktop3: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    default: true;
    black: true;
    discord: true;
    steam: true;
    twitch: true;
    white: true;
    'dark-grey': true;
  }

  interface ButtonPropsVariantOverrides {
    arcade: true;
    square: true;
  }
}

declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    default: true;
    black: true;
    white: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    default: true;
    steam: true;
    discord: true;
    twitch: true;
    black: true;
    white: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    default: true;
    black: true;
    white: true;
  }
}

// TODO: not working as expected yet
// https://github.com/mui/material-ui/issues/33054
declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    default: true;
    black: true;
    white: true;
  }
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    white: true;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    primary: true;
    title: true;
    body3: true;
  }
}

declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    white: true;
    black: true;
  }
}

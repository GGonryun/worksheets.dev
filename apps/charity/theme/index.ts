import { createTheme, responsiveFontSizes } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    primary: React.CSSProperties;
    secondary: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    primary?: React.CSSProperties;
    secondary?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    primary: true;
  }
}

const theme = createTheme({
  typography: {
    primary: {
      fontFamily: 'Corben,serif',
    },
    secondary: {
      fontFamily: 'Montserrat,sans-serif',
    },
  },
});

export default responsiveFontSizes(theme, {});

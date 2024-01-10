import { grey, pink, yellow } from '@mui/material/colors';
import { createTheme, darken } from '@mui/material/styles';

export type PaletteColor =
  | 'success'
  | 'error'
  | 'warning'
  | 'primary'
  | 'secondary'
  | 'highlight'
  | 'love'
  | 'default';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mobile1: 375,
      mobile2: 480,
      sm: 600,
      desktop1: 768,
      md: 900,
      desktop2: 1024,
      lg: 1200,
      desktop3: 1440,
      xl: 1536,
    },
  },
  typography: {
    h1: {
      fontFamily: 'Dangrek,serif',
    },
    h2: {
      fontFamily: 'Dangrek,serif',
    },
    h3: {
      fontFamily: 'Dangrek,serif',
    },
    h4: {
      fontFamily: 'Dangrek,serif',
    },
    h5: {
      fontFamily: 'Dangrek,serif',
    },
    h6: {
      fontFamily: 'Dangrek,serif',
    },
    body1: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
    },
    body2: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
    },
    body3: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
      fontSize: '0.775rem',
    },
    dangrek: {
      fontFamily: 'Dangrek,serif',
    },
    mPlus1p: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
    },
    corben: {
      fontFamily: 'Corben,serif',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'round' },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style: (tx: any) => {
            const currentColor = tx.theme.palette[tx.ownerState.color];
            const boxShadow = tx.theme.shadows[2];
            return {
              backgroundColor: tx.ownerState.disabled
                ? tx.theme.palette.grey[300]
                : currentColor.main,
              color: currentColor.contrastText,
              borderRadius: 50,
              boxShadow:
                tx.ownerState.disabled || tx.ownerState.disableElevation
                  ? 'none'
                  : boxShadow,
              fontFamily: tx.theme.typography.dangrek.fontFamily,
              // transition box-shadow and background-color .2s ease-in-out
              transition: tx.theme.transitions.create(
                ['box-shadow', 'background-color'],
                {
                  duration: tx.theme.transitions.duration.standard,
                  easing: tx.theme.transitions.easing.easeInOut,
                }
              ),
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: darken(currentColor.main, 0.2),
              },
              //small size
              ...(tx.ownerState.size === 'small' && {
                padding: tx.theme.spacing(0.5, 1),
                fontSize: tx.theme.typography.pxToRem(12),
              }),
              //medium size
              ...(tx.ownerState.size === 'medium' && {
                padding: tx.theme.spacing(0.625, 2),
                fontSize: tx.theme.typography.pxToRem(14),
              }),
              //large size
              ...(tx.ownerState.size === 'large' && {
                padding: tx.theme.spacing(0.75, 3),
                fontSize: tx.theme.typography.pxToRem(16),
              }),
            };
          },
        },
      ],
    },
  },
  palette: {
    border: {
      light: grey[300],
      main: grey[400],
      dark: grey[500],
      contrastText: '#000',
    },
    white: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#000',
    },
    highlight: {
      light: yellow[500],
      main: yellow[700],
      dark: yellow[900],
      contrastText: '#fff',
    },
    love: {
      light: pink[200],
      main: pink[400],
      dark: pink[600],
      contrastText: '#fff',
    },
    default: {
      light: grey[500],
      main: grey[600],
      dark: grey[700],
      contrastText: '#000',
    },
    black: {
      light: '#000',
      main: '#000',
      dark: '#000',
      contrastText: '#fff',
    },
  },
});

export default theme;

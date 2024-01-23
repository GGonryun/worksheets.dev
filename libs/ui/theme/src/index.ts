import { grey } from '@mui/material/colors';
import { createTheme, darken } from '@mui/material/styles';

export type PaletteColor =
  | 'success'
  | 'error'
  | 'warning'
  | 'primary'
  | 'secondary';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arcadeButtonStyle = (square?: boolean) => (tx: any) => {
  const currentColor = tx.theme.palette[tx.ownerState.color];
  const disabled = tx.ownerState.disabled;
  const shadow = disabled ? tx.theme.palette.grey[500] : currentColor.shadow;
  return {
    backgroundColor: disabled ? tx.theme.palette.grey[300] : currentColor.main,
    background: disabled ? undefined : currentColor.gradient,
    borderRadius: 13,
    color: currentColor.contrastText,
    boxShadow: `0px 6px 0px 0px ${shadow}`,
    fontFamily: tx.theme.typography.mPlus1p.fontFamily,
    fontWeight: 700,
    textTransform: 'none' as const,
    minWidth: square ? 0 : 64,
    transition: tx.theme.transitions.create(
      ['box-shadow', 'background-color', 'transform'],
      {
        duration: tx.theme.transitions.duration.standard,
        easing: tx.theme.transitions.easing.easeInOut,
      }
    ),
    '&:hover': {
      backgroundColor: darken(currentColor.main, 0.05),
    },
    '&:active': {
      boxShadow: `0px 1px 0px 0px ${shadow}`,
      transform: 'translateY(5px)',
    },
    //small size
    ...(tx.ownerState.size === 'small' && {
      boxShadow: `0px 5px 0px 0px ${shadow}`,
      '&:active': {
        boxShadow: `0px 1px 0px 0px ${shadow}`,
        transform: 'translateY(4px)',
      },
      height: square ? tx.theme.spacing(4) : undefined,
      width: square ? tx.theme.spacing(4.25) : undefined,
      padding: square ? tx.theme.spacing(0.5) : tx.theme.spacing(0.5, 2),
      fontSize: 12,
    }),
    //medium size
    ...(tx.ownerState.size === 'medium' && {
      height: square ? tx.theme.spacing(5) : undefined,
      width: square ? tx.theme.spacing(5.5) : undefined,
      padding: square ? tx.theme.spacing(1, 1) : tx.theme.spacing(1, 4),
      fontSize: tx.theme.typography.body1.fontSize,
    }),
    //large size
    ...(tx.ownerState.size === 'large' && {
      height: square ? tx.theme.spacing(6) : undefined,
      width: square ? tx.theme.spacing(6.5) : undefined,
      padding: square ? tx.theme.spacing(1.5, 1.5) : tx.theme.spacing(1.25, 5),
      fontSize: tx.theme.typography.h6.fontSize,
    }),
  };
};

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
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
      fontWeight: 700,
    },
    h5: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
      fontWeight: 700,
    },
    h6: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
      fontWeight: 700,
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
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      variants: [
        {
          props: { variant: 'arcade' },
          // There isn't a good type for the sx prop yet.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style: arcadeButtonStyle(),
        },
        {
          props: { variant: 'square' },
          // There isn't a good type for the sx prop yet.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style: arcadeButtonStyle(true),
        },
      ],
    },
  },
  palette: {
    primary: {
      light: '#61E8FF',
      main: '#2477F4',
      dark: '#3D68BC',
      contrastText: '#FFF',
      gradient: 'linear-gradient(181deg, #70BAFF 0.5%, #2477F4 177.86%)',
      shadow: '#3D68BC',
    },
    error: {
      light: '#FE697D',
      main: '#F4243C', // hand-picked.
      dark: '',
      contrastText: '#FFF',
      gradient:
        'linear-gradient(181deg, #FF596F 0.5%, #FF7183 15.66%, #FE697D 30.81%, #F4243C 177.3%)',
      shadow: '#BC3D4D',
    },
    secondary: {
      light: '',
      main: '#FF70C6',
      dark: '',
      contrastText: '#FFF',
      gradient: 'linear-gradient(181deg, #FF70C6 0.5%, #F4243C 242.97%)',
      shadow: '#BC3D4D',
    },
    success: {
      light: '',
      main: '#5BB83C',
      dark: '#32812B',
      contrastText: '#FFF',
      gradient:
        'linear-gradient(181deg, #61EA31 0.5%, #5BB83C 121.74%, #156B07 242.97%)',
      shadow: '#2B8E23',
    },
    warning: {
      light: '#FFB470',
      main: '#FF810A', // hand-picked.
      dark: '#B54E48',
      contrastText: '#FFF',
      gradient: 'linear-gradient(181deg, #FFB470 0.5%, #F4243C 242.97%)',
      shadow: '#BC3D3D',
    },
    'dark-grey': {
      light: grey[500],
      main: grey[600],
      dark: grey[700],
      contrastText: '#FFF',
      gradient: `linear-gradient(181deg, ${grey[500]} 0.5%, ${grey[600]} 242.97%)`,
      shadow: grey[700],
    },
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
    black: {
      light: '#000',
      main: '#000',
      dark: '#000',
      contrastText: '#fff',
    },
    background: {
      'transparent-blue': 'rgba(12,98,176,0.8)',
      'solid-blue': `#0C62B0`,
      'gradient-blue':
        'linear-gradient(177deg, #106FBC 38.27%, rgba(16, 111, 188, 0.00) 153.53%)',
      'gradient-soft': 'linear-gradient(180deg, #FFF 0%, #D0EEFF 100%)',
      soft: '#E3F2FF',
    },
    text: {
      blue: {
        light: '#61E8FF',
        main: '#106FBC',
      },
      arcade: '#D8F1FF',
      darkRed: '#841B2E',
    },
  },
});

export default theme;

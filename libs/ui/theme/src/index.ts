import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export type PaletteColor =
  | 'success'
  | 'error'
  | 'warning'
  | 'primary'
  | 'secondary';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arcadeButtonStyle = (tx: any) => {
  const currentColor = tx.theme.palette[tx.ownerState.color];
  const disabled = tx.ownerState.disabled;
  const shadow = disabled ? tx.theme.palette.grey[500] : currentColor.shadow;

  return {
    backgroundColor: disabled ? tx.theme.palette.grey[300] : currentColor.main,
    background: disabled ? undefined : currentColor.gradient,
    borderRadius: 10,
    color: currentColor.contrastText,
    boxShadow: `0px 4px 0px 0px ${shadow}`,
    marginBottom: '2px',
    fontFamily: tx.theme.typography.mPlus1p.fontFamily,
    fontWeight: 700,
    textTransform: 'none' as const,
    lineHeight: 'unset' as const,
    transition: tx.theme.transitions.create(['box-shadow', 'transform'], {
      duration: tx.theme.transitions.duration.standard,
      easing: tx.theme.transitions.easing.easeInOut,
    }),

    '&:active': {
      boxShadow: `0px 0px 0px 0px ${shadow}`,
      transform: 'translateY(4px)',
    },
    //small size
    ...(tx.ownerState.size === 'small' && {
      borderRadius: 8,
      padding: tx.theme.spacing(0.75, 2),
      fontSize: tx.theme.typography.body2.fontSize,
    }),
    //medium size
    ...(tx.ownerState.size === 'medium' && {
      padding: tx.theme.spacing(1, 4),
      fontSize: tx.theme.typography.body1.fontSize,
    }),
    //large size
    ...(tx.ownerState.size === 'large' && {
      padding: tx.theme.spacing(1.25, 5),
      fontSize: tx.theme.typography.h6.fontSize,
    }),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arcadeSquareButtonStyle = (tx: any) => {
  const currentColor = tx.theme.palette[tx.ownerState.color];
  const disabled = tx.ownerState.disabled;
  const shadow = disabled ? tx.theme.palette.grey[500] : currentColor.shadow;
  return {
    backgroundColor: disabled ? tx.theme.palette.grey[300] : currentColor.main,
    background: disabled ? undefined : currentColor.gradient,
    borderRadius: 10,
    color: currentColor.contrastText,
    boxShadow: `0px 4px 0px 0px ${shadow}`,
    marginBottom: '2px',
    fontFamily: tx.theme.typography.mPlus1p.fontFamily,
    fontWeight: 700,
    textTransform: 'none' as const,
    minWidth: 0,
    minHeight: 0,
    aspectRatio: '1/1',
    linHeight: 'unset' as const,
    transition: tx.theme.transitions.create(
      ['box-shadow', 'background-color', 'transform'],
      {
        duration: tx.theme.transitions.duration.standard,
        easing: tx.theme.transitions.easing.easeInOut,
      }
    ),
    '&:active': {
      boxShadow: `0px 0px 0px 0px ${shadow}`,
      transform: 'translateY(4px)',
    },
    //small size
    ...(tx.ownerState.size === 'small' && {
      borderRadius: 8,
      padding: tx.theme.spacing(0.8),
      fontSize: tx.theme.typography.body3.fontSize,
    }),
    //medium size
    ...(tx.ownerState.size === 'medium' && {
      padding: tx.theme.spacing(1.25),
      fontSize: tx.theme.typography.body2.fontSize,
    }),
    //large size
    ...(tx.ownerState.size === 'large' && {
      padding: tx.theme.spacing(1.5),
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
    mPlus1p: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
    },
  },
  components: {
    MuiAlert: {
      // green and orange alerts use wrong contrast text
      // https://github.com/mui/material-ui/issues/33512
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'filled' && {
            color: '#fff',
          }),
        }),
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 8,
      },
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        text: {
          textTransform: 'none',
          fontFamily: "'M PLUS Rounded 1c', sans-serif",
        },
      },

      variants: [
        {
          props: { variant: 'arcade' },
          // There isn't a good type for the sx prop yet.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style: arcadeButtonStyle,
        },
        {
          props: { variant: 'square' },
          // There isn't a good type for the sx prop yet.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style: arcadeSquareButtonStyle,
        },
      ],
    },
  },
  palette: {
    primary: {
      light: '#61E8FF',
      main: '#2477F4',
      dark: '#0150AF',
      contrastText: '#FFFFFF',
      gradient: 'linear-gradient(181deg, #70BAFF 0.5%, #2477F4 177.86%)',
      shadow: '#3D68BC',
    },
    discord: {
      light: '#7289DA',
      main: '#7289DA',
      dark: '#7289DA',
      contrastText: '#FFFFFF',
      gradient: 'linear-gradient(145deg, #7289DA 11.5%, #4E6AD0 91.2%)',
      shadow: '#3352C1',
    },
    steam: {
      light: '#2a475e',
      main: '#1b2838',
      dark: '#171a21',
      contrastText: '#FFFFFF',
      gradient: 'linear-gradient(120deg, #00adee, #000000)',
      shadow: '#2a475e',
    },
    twitch: {
      light: '#b9a3e3',
      main: '#772ce8',
      dark: '#6441a5',
      contrastText: '#FFFFFF',
      gradient:
        'linear-gradient(145deg, rgba(119, 44, 232, 0.68) 11.5%, rgb(119, 44, 232) 91.2%)',
      shadow: '#6441a5',
    },
    error: {
      light: '#FE697D',
      main: '#F4243C', // hand-picked.
      dark: '',
      contrastText: '#FFFFFF',
      gradient:
        'linear-gradient(181deg, #FF596F 0.5%, #FF7183 15.66%, #FE697D 30.81%, #F4243C 177.3%)',
      shadow: '#BC3D4D',
    },
    secondary: {
      light: '',
      main: '#FF70C6',
      dark: '',
      contrastText: '#FFFFFF',
      gradient: 'linear-gradient(181deg, #FF70C6 0.5%, #F4243C 242.97%)',
      shadow: '#BC3D4D',
    },
    success: {
      light: '',
      main: '#5BB83C',
      dark: '#32812B',
      contrastText: '#FFFFFF',
      gradient:
        'linear-gradient(181deg, #61EA31 0.5%, #5BB83C 121.74%, #156B07 242.97%)',
      shadow: '#2B8E23',
    },
    warning: {
      light: '#FFB470',
      main: '#FF810A', // hand-picked.
      dark: '#B54E48',
      contrastText: '#FFFFFF',
      gradient: 'linear-gradient(181deg, #FFB470 0.5%, #F4243C 242.97%)',
      shadow: '#BC3D3D',
    },
    'dark-grey': {
      light: grey[500],
      main: grey[600],
      dark: grey[700],
      contrastText: '#FFFFFF',
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
      gradient: `linear-gradient(181deg, #FFFFFF} 0.5%, ${grey[100]} 242.97%)`,
      shadow: grey[300],
    },
    black: {
      light: '#000',
      main: '#000',
      dark: '#000',
      contrastText: '#fff',
      gradient: `linear-gradient(109.6deg, rgba(0, 0, 0, 0.93) 11.2%, rgb(63, 61, 61) 78.9%)`,
      shadow: grey[900],
    },
    background: {
      wallpaper: '#2BD9FF',
      marketing: {
        gradients: {
          blue: {
            transparent: `linear-gradient(180deg, rgba(193,224,255,1) 0%, rgba(193,224,255,0) 100%)`,
            secondary:
              'linear-gradient(0deg, rgba(20,86,214,1) -50%, rgba(15,53,88,1) 80%)',
            primary:
              'linear-gradient(180deg, rgba(0,52,153,1) -30%, rgba(0,142,222,1) 95%, rgba(152,218,255,1) 130%)',
          },
        },
      },
      'transparent-blue': 'rgba(12,98,176,0.8)',
      'solid-blue': `#0C62B0`,
      'gradient-blue':
        'linear-gradient(177deg, #106FBC 38.27%, rgba(16, 111, 188, 0.00) 153.53%)',
      'gradient-soft': 'linear-gradient(180deg, #FFF 0%, #D0EEFF 100%)',
      soft: '#E3F2FF',
    },
    text: {
      marketing: {
        gradients: {
          blue: {
            light: `linear-gradient(180deg, rgba(255,255,255,1) 50%, rgba(163,227,255,1) 90%)`,
            main: `linear-gradient(180deg, rgba(183,220,255,1) 0%, rgba(36,119,244,1) 80%)`,
            dark: `linear-gradient(180deg, rgba(44,127,210,1) 0%, rgba(87,44,156,1) 150%)`,
          },
          red: {
            main: `linear-gradient(180deg, rgba(255,174,156,1) 0%, rgba(255,113,113,1) 15%, rgba(244,36,60,1) 100%)`,
          },
          orange: {
            main: `linear-gradient(180deg, rgba(255,246,36,1) 0%, rgba(255,215,112,1) 20%, rgba(255,132,19,1) 100%)`,
          },
          yellow: {
            main: `linear-gradient(180deg, rgba(255,241,112,1) 0%, rgba(255,195,39,1) 160%)`,
          },
        },
      },
      white: '#fff',
      yellow: '#FFE135',
      blue: {
        soft: '#98C1F9',
        lightest: '#97D3FF',
        lighter: '#59AFFF',
        light: '#1C9FEA',
        main: '#017ED2',
        dark: '#0063AC',
        darker: '#003499',
      },
      arcade: '#D8F1FF',
      red: {
        light: '#DA3A4C',
        dark: '#841B2E',
      },
    },
  },
});

export default theme;

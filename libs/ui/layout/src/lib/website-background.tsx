import { styled } from '@mui/material';
import Box from '@mui/material/Box';

const WALLPAPER_URL = '/common/wallpaper/coins.png';

export const WebsiteBackground = () => (
  <FullscreenBox overflow="hidden">
    <Box
      sx={{
        zIndex: -5,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle, rgba(43,217,255,1) 0%, rgba(13,106,215,1) 50%, rgba(0,33,71,1) 100%)`,
      }}
    />
    <Box
      sx={{
        zIndex: -4,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: `rgb(43,217,255)`,
        backgroundSize: '10%',
        backgroundImage: `url('${WALLPAPER_URL}')`,
        backgroundBlendMode: 'color-dodge',
        backgroundRepeat: 'repeat',
        opacity: 0.1,
      }}
    />
    <Box
      sx={{
        zIndex: -1,
        position: 'absolute',
        top: '-20%',
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 1,
      }}
    >
      <BlobOne />
    </Box>
    <Box
      sx={{
        zIndex: -1,
        position: 'absolute',
        top: '25%',
        right: 0,
        flexShrink: 0,
        opacity: 1,
      }}
    >
      <BlobTwo />
    </Box>
    <Box
      sx={{
        zIndex: -1,
        position: 'absolute',
        top: 'max(1000px, 70%)',
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 1,
      }}
    >
      <BlobThree />
    </Box>
  </FullscreenBox>
);

const FullscreenBox = styled(Box)({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -1,
});

const BlobOne = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="227"
    height="1035"
    viewBox="0 0 227 1035"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M-269.257 0.00068621C-35.9807 -0.42786 133.918 199.931 201.55 423.261C264.632 631.564 211.534 868.319 30.0665 988.403C-133.404 1096.58 -333.121 997.777 -490.946 881.515C-644.491 768.405 -781.294 609.966 -734.772 424.981C-678.109 199.669 -501.513 0.427358 -269.257 0.00068621Z"
      fill="#7FE0FF"
      fillOpacity="0.6"
    />
  </svg>
);

const BlobTwo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="277"
    height="1035"
    viewBox="0 0 277 1035"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M474.743 0.00068621C708.019 -0.42786 877.918 199.931 945.55 423.261C1008.63 631.564 955.534 868.319 774.066 988.404C610.596 1096.58 410.879 997.777 253.054 881.515C99.5086 768.405 -37.2936 609.967 9.22784 424.981C65.8909 199.669 242.487 0.427358 474.743 0.00068621Z"
      fill="#7FE0FF"
      fillOpacity="0.6"
    />
  </svg>
);

const BlobThree = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="435"
    height="1335"
    viewBox="0 0 435 1335"
    fill="none"
  >
    <g opacity="0.6" filter="url(#filter0_b_17_271)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M-121.959 0.75109C35.0566 -11.0737 169.554 118.734 259.171 248.232C335.087 357.93 292.141 497.688 313.12 629.442C342.182 811.965 501.428 998.304 403.566 1155.08C302.127 1317.59 67.5147 1354.51 -121.959 1326.44C-292.063 1301.25 -399.296 1149.46 -511.931 1019.5C-612.908 902.986 -739.344 783.059 -726.03 629.442C-713.201 481.416 -552.648 408.746 -449.715 301.617C-342.897 190.445 -275.68 12.3277 -121.959 0.75109Z"
        fill="#57D5FF"
      />
    </g>
    <defs>
      <filter
        id="filter0_b_17_271"
        x="-731"
        y="-4"
        width="1170"
        height="1343"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_17_271"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_17_271"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

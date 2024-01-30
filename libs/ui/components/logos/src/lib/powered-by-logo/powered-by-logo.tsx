import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';

// Hard coded to match the design
export const PoweredByLogo = () => (
  <Box
    width={167}
    height={84}
    // border={'1px solid black'}
    sx={{
      position: 'relative',
      userSelect: 'none',
    }}
  >
    <Typography
      fontWeight={500}
      fontSize="14px"
      lineHeight="19px"
      color="text.blue.light"
      sx={{
        position: 'absolute',
        top: 2,
        right: 16,
      }}
    >
      Powered by
    </Typography>
    <Box
      sx={{
        position: 'absolute',
        top: 26,
        left: 37,
        borderRadius: '28px',
        height: 42,
        width: 130,
        backgroundColor: (theme) => theme.palette.background.soft,
      }}
    >
      <Typography
        fontWeight={700}
        fontSize="16px"
        paddingLeft="43px"
        paddingTop="3px"
        lineHeight="18px"
        color="text.blue.main"
      >
        Charity Games
      </Typography>
    </Box>
    <Box position="absolute" top={18}>
      <Image
        src="/common/charity-games/logos/tertiary-small.png"
        alt={'Powered by Charity Games'}
        width={72}
        height={60.5}
      />
    </Box>
  </Box>
);

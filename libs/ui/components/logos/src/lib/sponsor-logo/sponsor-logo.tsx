import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import common from '@worksheets/assets-common';
import Image from 'next/image';

// Hard coded to match the design
export const SponsorLogo: React.FC<{
  label?: string;
  text?: string;
  logo?: string;
  color?: string;
}> = ({
  text = 'Charity Games',
  logo = common.charityGames.logos.square,
  label = 'Powered By',
  color,
}) => (
  <Box
    minWidth={174}
    width="fit-content"
    height={84}
    sx={{
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Image
      height={92}
      width={92}
      style={{ marginRight: -44, marginTop: 8, zIndex: 1 }}
      src={logo}
      alt={text}
    />
    <Box
      mt={-2}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
      }}
    >
      <Typography
        fontWeight={500}
        fontSize="14px"
        lineHeight="19px"
        color={color ?? 'primary.light'}
        pl="43px"
        sx={{
          width: '100%',
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          borderRadius: '28px',
          width: '100%',
          backgroundColor: (theme) => theme.palette.background.soft,
        }}
      >
        <Typography
          fontWeight={700}
          fontSize="16px"
          pl="43px"
          pr="12px"
          py="3px"
          lineHeight="18px"
          textOverflow="wrap"
          color={'text.blue.dark'}
          whiteSpace="break-spaces"
        >
          {text.replace(' ', '\n')}
        </Typography>
      </Box>
    </Box>
  </Box>
);

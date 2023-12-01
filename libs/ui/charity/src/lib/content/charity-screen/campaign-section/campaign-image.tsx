import { ExploreOutlined, HelpOutline } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { FC } from 'react';
import { ResponsiveImage } from '../../../images';
import { CharityScreenProps } from '../charity-screen';

export const CampaignImage: FC<Pick<CharityScreenProps, 'charity'>> = ({
  charity,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: { xs: '100%', sm: '53%' },
    }}
  >
    <Link
      href={charity.url}
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <ResponsiveImage src={charity.bannerSrc} alt={charity.name} />
    </Link>
    <Box
      display="flex"
      gap={{ xs: 1, sm: 2 }}
      flexWrap="wrap"
      alignItems="center"
      mt={0.5}
    >
      <Typography
        variant="body2"
        display="flex"
        alignItems={'center'}
        gap={0.5}
      >
        <ExploreOutlined fontSize="inherit" />
        {charity.category}
      </Typography>
      <Typography
        variant="body2"
        display="flex"
        alignItems={'center'}
        gap={0.5}
      >
        <HelpOutline fontSize="inherit" />
        <Link href="/help">How can I help?</Link>
      </Typography>
    </Box>
  </Box>
);

import { Box, Link, styled, Typography } from '@mui/material';
import {
  ValentinesDiamondIcon,
  ValentinesGiftIcon,
  ValentinesLoveLetterIcon,
} from '@worksheets/icons/valentines';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { FC, ReactNode } from 'react';

export const CampaignFooter: FC<{ pollUrl: string }> = ({ pollUrl }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="space-evenly"
      flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
      gap={1.5}
    >
      <IconSection
        icon={<ValentinesLoveLetterIcon size={isMobile ? 42 : 64} />}
        text="Get Involved"
        href="/help"
        description="We need your help. Learn how you can get involved and help us reach our goal."
      />
      <IconSection
        icon={<ValentinesGiftIcon size={isMobile ? 42 : 64} />}
        text="Track Donations"
        href="/donations"
        description="We want to be transparent about where your money is going and how it's being used."
      />
      <IconSection
        icon={<ValentinesDiamondIcon size={isMobile ? 42 : 64} />}
        text="Vote for Charity"
        href={pollUrl}
        description="Be a part of the decision-making process. Vote for the next charity we support."
      />
    </Box>
  );
};

const IconSection: FC<{
  icon: ReactNode;
  text: string;
  href: string;
  description: string;
}> = ({ icon, text, href, description }) => {
  return (
    <CustomBox>
      {icon}
      <Box
        pt={{ xs: 0, sm: 2 }}
        display="flex"
        flexDirection="column"
        gap={{ xs: 0, sm: 1 }}
      >
        <Link variant="h6" href={href} color="text.arcade">
          {text}
        </Link>
        <Typography variant="body2" color="text.arcade">
          {description}
        </Typography>
      </Box>
    </CustomBox>
  );
};

const CustomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
    textAlign: 'left',
    gap: theme.spacing(2),
  },
}));

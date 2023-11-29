import { Box, Link, Typography, styled } from '@mui/material';
import { HeartGem } from '../../../icons/heart-gem';
import { FC } from 'react';
import { SvgIconComponent } from '@mui/icons-material';
import { BlueDiamond } from '../../../icons/blue-diamond';
import { GiftBox } from '../../../icons/gift-box';

export const CampaignFooter: FC<{ pollUrl: string }> = ({ pollUrl }) => (
  <Box
    display="flex"
    justifyContent="space-evenly"
    flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
    gap={1.5}
  >
    <IconSection
      Icon={HeartGem}
      text="Get Involved"
      href="/help"
      description="We need your help. Learn how you can get involved and help us reach our goal."
    />
    <IconSection
      Icon={GiftBox}
      text="Track Donations"
      href="/donations"
      description="We want to be transparent about where your money is going and how it's being used."
    />
    <IconSection
      Icon={BlueDiamond}
      text="Vote for Charity"
      href={pollUrl}
      description="Be a part of the decision-making process. Vote for the next charity we support."
    />
  </Box>
);

const IconSection: FC<{
  Icon: SvgIconComponent;
  text: string;
  href: string;
  description: string;
}> = ({ Icon, text, href, description }) => {
  return (
    <CustomBox>
      <Icon
        sx={{
          fontSize: { xs: '3rem', sm: '4rem' },
        }}
      />
      <Box
        pt={{ xs: 0, sm: 2 }}
        display="flex"
        flexDirection="column"
        gap={{ xs: 0, sm: 1 }}
      >
        <Typography variant="h6">
          <Link href={href}>{text}</Link>
        </Typography>
        <Typography variant="body2">{description}</Typography>
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

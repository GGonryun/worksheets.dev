import { Diversity1Outlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { ValentinesTicket } from '@worksheets/icons/valentines';
import { ClipboardText } from '@worksheets/ui/inputs';
import { SocialButtons } from '@worksheets/ui/social-media';
import { shorthandNumber } from '@worksheets/util/numbers';

export const ReferralInfo: React.FC<{
  referrals: number;
  link: string;
  tokens: number;
}> = ({ referrals, link, tokens }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box width="100%">
        <Box
          sx={{
            mb: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'flex-start' },
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Typography variant="h6">Share your link</Typography>
          <SocialButtons facebook={'#'} twitter={'#'} reddit={'#'} />
        </Box>
        <ClipboardText text={link} label="My Referral Link" />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Diversity1Outlined color="error" />
          <Typography variant="body2" fontWeight={900}>
            {shorthandNumber(referrals)} Accounts Referred
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <ValentinesTicket />
          <Typography variant="body2" fontWeight={900}>
            {shorthandNumber(tokens)} Tokens Earned
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

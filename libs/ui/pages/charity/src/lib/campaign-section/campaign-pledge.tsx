import { OpenInNew } from '@mui/icons-material';
import {
  Box,
  Button,
  LinearProgress,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { FC, JSXElementConstructor } from 'react';

import { CharityScreenProps } from '../charity-screen';

export const CampaignPledge: FC<
  Pick<CharityScreenProps, 'pledge' | 'charity' | 'statistics'>
> = ({ charity, pledge, statistics }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        mt: 1,
        width: { xs: '100%', sm: '43%' },
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <LinearProgress
        variant="determinate"
        value={(pledge.current / pledge.required) * 100}
        color="success"
        sx={{ height: 8 }}
      />
      <Box>
        <PrimaryText color="success.main">${pledge.current}.00</PrimaryText>
        <SecondaryText>raised of ${pledge.required} goal</SecondaryText>
      </Box>
      <Box>
        <PrimaryText color="text.arcade">
          {statistics?.uniqueGames ?? '??'}
        </PrimaryText>
        <SecondaryText>unique games played</SecondaryText>
      </Box>
      <Box>
        <PrimaryText color="text.arcade">
          {(statistics?.players.new ?? 0) +
            (statistics?.players.returning ?? 0)}
        </PrimaryText>
        <SecondaryText>total players</SecondaryText>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Button
          fullWidth
          variant="arcade"
          color="success"
          size={isMobile ? 'small' : 'medium'}
          href={charity.url}
          target={'_blank'}
          endIcon={<OpenInNew sx={{ mt: -0.5 }} />}
        >
          Visit {charity.name}
        </Button>

        <Typography variant="body3" textAlign="center" color="text.arcade">
          {charity.name} is a registered 501(c)(3) nonprofit organization.
        </Typography>
      </Box>
    </Box>
  );
};

const PrimaryText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '2rem',
  lineHeight: 1,
}));

const SecondaryText = styled<JSXElementConstructor<TypographyProps>>(
  (props) => <Typography variant="body3" {...props} />
)(({ theme }) => ({
  fontWeight: 500,
  paddingLeft: '2px',
  color: theme.palette.text.arcade,
}));

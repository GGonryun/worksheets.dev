import {
  OpenInNew,
  Mail,
  Facebook,
  Twitter,
  LinkedIn,
} from '@mui/icons-material';
import {
  LinearProgress,
  Button,
  Typography,
  IconButton,
  Box,
  styled,
  TypographyProps,
} from '@mui/material';
import { FC, JSXElementConstructor } from 'react';
import { CharityScreenProps } from '../charity-screen';
import { Discord } from '@worksheets/ui/icons';

export const CampaignPledge: FC<
  Pick<CharityScreenProps, 'pledge' | 'charity' | 'statistics'>
> = ({ charity, pledge, statistics }) => (
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
      <PrimaryText color="text.secondary">
        {statistics?.uniqueGames ?? '??'}
      </PrimaryText>
      <SecondaryText>unique games played</SecondaryText>
    </Box>
    <Box>
      <PrimaryText color="text.secondary">
        {(statistics?.players.new ?? 0) + (statistics?.players.returning ?? 0)}
      </PrimaryText>
      <SecondaryText>total players</SecondaryText>
    </Box>
    <Box display="flex" flexDirection="column" gap={2}>
      <Button
        fullWidth
        variant="contained"
        color="success"
        href={charity.url}
        target={'_blank'}
        endIcon={<OpenInNew sx={{ mt: -0.5 }} />}
        sx={{
          textTransform: 'none',
          borderRadius: 8,
        }}
      >
        <Typography>Visit {charity.name}</Typography>
      </Button>
      <Box display="flex" justifyContent="space-evenly" alignItems="center">
        <IconButton size="small">
          <Mail fontSize="small" color="black" />
        </IconButton>
        <IconButton size="small">
          <Facebook fontSize="small" color="black" />
        </IconButton>
        <IconButton size="small">
          <Twitter fontSize="small" color="black" />
        </IconButton>
        <IconButton size="small">
          <Discord fontSize="small" color="black" />
        </IconButton>
        <IconButton size="small">
          <LinkedIn fontSize="small" color="black" />
        </IconButton>
      </Box>
      <Typography variant="body3" textAlign={'center'}>
        {charity.name} is a registered 501(c)(3) nonprofit organization.
      </Typography>
    </Box>
  </Box>
);

const PrimaryText = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: '2rem',
  lineHeight: 1,
}));

const SecondaryText = styled<JSXElementConstructor<TypographyProps>>(
  (props) => <Typography variant="body3" {...props} />
)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.secondary,
  paddingLeft: '2px',
}));

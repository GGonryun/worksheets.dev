import { FeaturedVideoOutlined, StarBorder } from '@mui/icons-material';
import { Button, LinearProgress, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { ContainImage } from '@worksheets/ui/components/images';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { useInterval } from '@worksheets/ui-core';
import { GruvianAdvertisementSchema } from '@worksheets/util/types';
import { useState } from 'react';

export const WatchAdvertisement: React.FC<{
  network: string;
  onSubmit: () => void;
  disabled?: boolean;
}> = ({ network, onSubmit, disabled }) => {
  const [showAd, setShowAd] = useState(false);

  const advertisement = trpc.maybe.advertisements.get.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <Column>
      {showAd ? (
        <AdvertisementContainer
          onSubmit={onSubmit}
          loading={advertisement.isLoading}
        >
          {network === 'gruvian' ? (
            <GruvianAdvertisement advertisement={advertisement.data} />
          ) : (
            <CharityGamesAdvertisement />
          )}
        </AdvertisementContainer>
      ) : (
        <Button
          variant="arcade"
          startIcon={<FeaturedVideoOutlined />}
          disabled={disabled}
          onClick={() => setShowAd(true)}
        >
          {disabled ? 'Come Back Later' : 'Display Ad'}
        </Button>
      )}
    </Column>
  );
};

const AdvertisementContainer: React.FC<{
  children: React.ReactNode;
  loading: boolean;
  onSubmit: () => void;
}> = (props) => {
  const ADVERTISEMENT_TIMER = 5000; //ms
  const SPEED = 25; //ms
  const [timer, setTimer] = useState(ADVERTISEMENT_TIMER);

  useInterval(() => {
    if (timer > 0 || !props.loading) {
      setTimer((prev) => Math.max(prev - SPEED, 0));
    }
  }, SPEED);

  return (
    <Column gap={3}>
      {props.children}
      <Column>
        <LinearProgress
          variant="determinate"
          value={(timer / ADVERTISEMENT_TIMER) * 100}
          sx={{
            height: 10,
            borderRadius: 5,
          }}
        />
        <Typography variant="body2" textAlign="center">
          {(timer / 1000).toFixed(2)} seconds remaining
        </Typography>
      </Column>
      <Button
        variant="arcade"
        disabled={timer > 0}
        startIcon={!timer && <StarBorder />}
        endIcon={!timer && <StarBorder />}
        onClick={props.onSubmit}
      >
        Claim Reward
      </Button>
    </Column>
  );
};

const GruvianAdvertisement: React.FC<{
  advertisement: GruvianAdvertisementSchema | undefined;
}> = (props) => {
  if (!props.advertisement || !props.advertisement.filled) {
    return <CharityGamesAdvertisement />;
  }

  return (
    <Column alignItems="center" textAlign="center">
      <Typography variant="h6">{props.advertisement.ad.title.data}</Typography>
      <Typography>{props.advertisement.ad.description.data}</Typography>
      <Link
        position="relative"
        width="100%"
        height={200}
        my={1.5}
        href={props.advertisement.ad.link_to.data}
      >
        <ContainImage
          src={props.advertisement.ad.logo_image.data.url}
          alt={props.advertisement.ad.title.data}
        />
      </Link>
      <Typography
        variant="body3"
        component={Link}
        href={'https://gruvian.com'}
        underline="hover"
        color="text.secondary"
      >
        Powered by Gruvian
      </Typography>
    </Column>
  );
};

const CharityGamesAdvertisement = () => {
  return (
    <Column textAlign="center">
      <PulsingLogo hideMessage />
      <Typography variant="h6">Your advertisement here!</Typography>
      <Typography variant="body2">
        <Link href={routes.contact.path()}>Contact Us</Link> if you are
        interested in advertising on Charity.Games.
        <br />
        Join us in our mission to raise money for charity!
      </Typography>
    </Column>
  );
};

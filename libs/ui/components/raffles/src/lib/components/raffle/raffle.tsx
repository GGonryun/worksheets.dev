import { ArcadeItemLayout } from '@worksheets/ui/components/arcade';
import { prizeTypeLogos } from '@worksheets/ui/components/prizes';
import { printTimeRemaining } from '@worksheets/util/time';
import { BasicRaffleDetails } from '@worksheets/util/types';
import React from 'react';

export const Raffle: React.FC<BasicRaffleDetails> = ({
  id,
  name,
  expiresAt,
  type,
  imageUrl,
}) => {
  const expired = expiresAt < Date.now();

  const PlatformLogo = prizeTypeLogos[type];

  return (
    <ArcadeItemLayout
      href={`/raffles/${id}`}
      imageUrl={imageUrl}
      icon={PlatformLogo}
      name={name}
      caption={
        expired ? 'Raffle Over' : `${printTimeRemaining(expiresAt)} left`
      }
    />
  );
};

export type RaffleProps = React.ComponentProps<typeof Raffle>;
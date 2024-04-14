import { routes } from '@worksheets/routes';
import { ArcadeItemLayout } from '@worksheets/ui/components/arcade';
import { printTimeRemaining } from '@worksheets/util/time';
import { BasicRaffleDetails } from '@worksheets/util/types';
import React from 'react';

export const Raffle: React.FC<BasicRaffleDetails> = ({
  id,
  name,
  expiresAt,
  imageUrl,
}) => {
  const expired = expiresAt < Date.now();

  return (
    <ArcadeItemLayout
      href={routes.raffle.path({ params: { raffleId: id } })}
      imageUrl={imageUrl}
      name={name}
      caption={
        expired ? 'Raffle Over' : `${printTimeRemaining(expiresAt)} left`
      }
    />
  );
};

export type RaffleProps = React.ComponentProps<typeof Raffle>;

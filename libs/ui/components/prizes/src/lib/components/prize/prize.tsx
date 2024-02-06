import { ArcadeItemLayout } from '@worksheets/ui/components/arcade';
import { printTimeRemaining } from '@worksheets/util/time';
import { BasicPrizeDetails } from '@worksheets/util/types';
import React from 'react';

import { prizeTypeLogos } from '../../data/prize-type';

export const Prize: React.FC<BasicPrizeDetails> = ({
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
      href={`/prizes/${id}`}
      imageUrl={imageUrl}
      icon={PlatformLogo}
      name={name}
      caption={
        expired ? 'Raffle Over' : `${printTimeRemaining(expiresAt)} left`
      }
    />
  );
};

export type PrizeProps = React.ComponentProps<typeof Prize>;

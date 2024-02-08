import { ArcadeItemLayout } from '@worksheets/ui/components/arcade';
import { BasicPrizeDetails } from '@worksheets/util/types';
import React from 'react';

import { prizeTypeLogos } from '../data';

export const Prize: React.FC<BasicPrizeDetails> = ({
  id,
  name,
  type,
  imageUrl,
  monetaryValue,
}) => {
  const PlatformLogo = prizeTypeLogos[type];

  return (
    <ArcadeItemLayout
      href={`/prizes/${id}`}
      imageUrl={imageUrl}
      icon={PlatformLogo}
      name={name}
      caption={`$${monetaryValue} Value`}
    />
  );
};

export type PrizeProps = React.ComponentProps<typeof Prize>;

import { routes } from '@worksheets/routes';
import { ArcadeItemLayout } from '@worksheets/ui/components/arcade';
import { BasicPrizeDetails } from '@worksheets/util/types';
import React from 'react';

import { prizeTypeLabel, prizeTypeLogos } from '../data';

export const Prize: React.FC<BasicPrizeDetails> = ({
  id,
  name,
  type,
  imageUrl,
}) => {
  const PlatformLogo = prizeTypeLogos[type];

  return (
    <ArcadeItemLayout
      href={routes.prize.path({ params: { prizeId: id } })}
      imageUrl={imageUrl}
      icon={PlatformLogo}
      name={name}
      caption={prizeTypeLabel[type]}
    />
  );
};

export type PrizeProps = React.ComponentProps<typeof Prize>;

import { QuestionMark, SvgIconComponent } from '@mui/icons-material';
import { ColoredSteamGames } from '@worksheets/icons/companies';
import { ArcadeItemLayout } from '@worksheets/ui/components/arcade';
import { printTimeRemaining } from '@worksheets/util/time';
import { BasicPrizeDetails, PrizeCompany } from '@worksheets/util/types';
import React from 'react';

const companyLogos: Record<PrizeCompany, SvgIconComponent> = {
  'steam-games': ColoredSteamGames,
  'epic-games': QuestionMark,
};

export const Prize: React.FC<BasicPrizeDetails> = ({
  id,
  name,
  expires,
  company,
  imageUrl,
}) => {
  const expired = expires < Date.now();

  const CompanyLogo = companyLogos[company];

  return (
    <ArcadeItemLayout
      href={`/prizes/${id}`}
      imageUrl={imageUrl}
      icon={CompanyLogo}
      name={name}
      caption={expired ? 'Raffle Over' : `${printTimeRemaining(expires)} left`}
    />
  );
};

export type PrizeProps = React.ComponentProps<typeof Prize>;

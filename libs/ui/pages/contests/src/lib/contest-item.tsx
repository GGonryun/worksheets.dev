import { routes } from '@worksheets/routes';
import { ArcadeItemLayout } from '@worksheets/ui/components/arcade';
import { printTimeRemaining } from '@worksheets/util/time';
import { ContestSchema } from '@worksheets/util/types';

export const ContestItem: React.FC<ContestSchema> = ({
  id,
  game: { title, thumbnail },
  endAt,
}) => {
  const expired = endAt < Date.now();

  return (
    <ArcadeItemLayout
      href={routes.contest.path({ params: { contestId: id } })}
      imageUrl={thumbnail}
      name={title}
      caption={expired ? 'Contest Over' : `${printTimeRemaining(endAt)} left`}
    />
  );
};

import { routes } from '@worksheets/routes';
import { ArcadeItemCarousel } from '@worksheets/ui/components/arcade';
import { ArcadeItemLayout } from '@worksheets/ui/components/arcade';
import { BattleSchema, isBattleComplete } from '@worksheets/util/types';
import { ReactNode } from 'react';
import React from 'react';

export const BattlesCarousel: React.FC<{
  items: BattleSchema[];
  title: string;
  action?: ReactNode;
}> = ({ items, title, action }) => {
  return (
    <ArcadeItemCarousel
      items={items}
      title={title}
      action={action}
      render={(item) => <Battle {...item} />}
    />
  );
};

export const Battle: React.FC<BattleSchema> = (props) => {
  const status = isBattleComplete(props)
    ? 'Battle Over'
    : `${props.health}/${props.mob.maxHp} HP`;

  return (
    <ArcadeItemLayout
      href={routes.battle.path({ params: { battleId: props.id } })}
      imageUrl={props.mob.imageUrl}
      name={props.mob.name}
      caption={status}
    />
  );
};

import Image from 'next/image';
import React from 'react';

export type Icons =
  // game icons
  | 'versus'
  | 'heart-full'
  | 'heart-empty'
  | 'crown'
  | 'sword'
  | 'fire'
  | 'axe'
  | 'clock'
  | 'diamond'
  | 'cancel'
  // movement
  | 'movement'
  | 'arrow-up'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-top-left'
  | 'arrow-top-right'
  | 'arrow-bottom-left'
  | 'arrow-bottom-right'
  // attacks
  | 'attack-01'
  | 'attack-02'
  | 'attack-03'
  | 'attack-04'
  | 'attack-05'
  | 'attack-06'
  | 'attack-07'
  | 'attack-08'
  | 'attack-09'
  | 'attack-10'
  | 'attack-11'
  | 'attack-12'
  | 'attack-13'
  | 'attack-14'
  | 'attack-15'
  | 'attack-16'
  | 'attack-17'
  | 'attack-18'
  | 'attack-19'
  | 'attack-20';

const src: Record<Icons, string> = {
  versus: '/icons/x.svg',
  sword: '/icons/sword.svg',
  'heart-full': '/icons/heart-full.svg',
  'heart-empty': '/icons/heart-empty.svg',
  clock: '/icons/clock.svg',
  crown: '/icons/crown.svg',
  diamond: '/icons/diamond.svg',
  fire: '/icons/fire.svg',
  axe: '/icons/axe.svg',
  cancel: '/icons/cancel.svg',
  // movement
  movement: '/icons/movement.svg',
  'arrow-up': '/icons/movement/up.svg',
  'arrow-down': '/icons/movement/down.svg',
  'arrow-left': '/icons/movement/left.svg',
  'arrow-right': '/icons/movement/right.svg',
  'arrow-top-left': '/icons/movement/top-left.svg',
  'arrow-top-right': '/icons/movement/top-right.svg',
  'arrow-bottom-left': '/icons/movement/bottom-left.svg',
  'arrow-bottom-right': '/icons/movement/bottom-right.svg',
  // attacks
  'attack-01': '/icons/attacks/01.svg',
  'attack-02': '/icons/attacks/02.svg',
  'attack-03': '/icons/attacks/03.svg',
  'attack-04': '/icons/attacks/04.svg',
  'attack-05': '/icons/attacks/05.svg',
  'attack-06': '/icons/attacks/06.svg',
  'attack-07': '/icons/attacks/07.svg',
  'attack-08': '/icons/attacks/08.svg',
  'attack-09': '/icons/attacks/09.svg',
  'attack-10': '/icons/attacks/10.svg',
  'attack-11': '/icons/attacks/11.svg',
  'attack-12': '/icons/attacks/12.svg',
  'attack-13': '/icons/attacks/13.svg',
  'attack-14': '/icons/attacks/14.svg',
  'attack-15': '/icons/attacks/15.svg',
  'attack-16': '/icons/attacks/16.svg',
  'attack-17': '/icons/attacks/17.svg',
  'attack-18': '/icons/attacks/18.svg',
  'attack-19': '/icons/attacks/19.svg',
  'attack-20': '/icons/attacks/20.svg',
};

export const Icon: React.FC<{
  name: Icons;
  size?: number;
}> = ({ size = 20, name }) => (
  <Image height={size} width={size} src={src[name]} alt={name} />
);

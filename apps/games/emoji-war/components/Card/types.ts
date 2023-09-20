import { ShapeColor, ShapeProps } from '@worksheets/ui-core';
import { BoardPosition } from '../Board';
import { Icons } from '../Icon';

export type PlayableCard = {
  type: CardType;
  color: ShapeProps['color'];
};

export const isPlayableCard = (card: CardSlot): card is PlayableCard =>
  'type' in card;

export type RespawnTimer = {
  duration: number;
};

export const isRespawnTimer = (card: CardSlot): card is RespawnTimer =>
  'duration' in card;

export type CardSlot = PlayableCard | RespawnTimer;

export type CardType =
  // movement
  | 'move-up'
  | 'move-down'
  | 'move-left'
  | 'move-right'
  | 'move-top-left'
  | 'move-top-right'
  | 'move-bottom-left'
  | 'move-bottom-right'
  // attacks
  | 'attack-1'
  | 'attack-2'
  | 'attack-3'
  | 'attack-4'
  | 'attack-5'
  | 'attack-6'
  | 'attack-7'
  | 'attack-8'
  | 'attack-9'
  | 'attack-10'
  | 'attack-11'
  | 'attack-12';

export type MovementCardType = Extract<
  CardType,
  | 'move-up'
  | 'move-down'
  | 'move-left'
  | 'move-right'
  | 'move-top-left'
  | 'move-top-right'
  | 'move-bottom-left'
  | 'move-bottom-right'
>;

export const movementAction: Record<MovementCardType, BoardPosition> = {
  'move-down': { x: 0, y: 1 },
  'move-left': { x: -1, y: 0 },
  'move-right': { x: 1, y: 0 },
  'move-up': { x: 0, y: -1 },
  'move-top-left': { x: -1, y: -1 },
  'move-top-right': { x: 1, y: -1 },
  'move-bottom-left': { x: -1, y: 1 },
  'move-bottom-right': { x: 1, y: 1 },
};

export const attackAction: Record<AttackCardType, BoardPosition[]> = {
  'attack-1': [
    { x: 0, y: 1 },
    { x: 2, y: 1 },
  ],
  'attack-2': [
    { x: 1, y: 0 },
    { x: 1, y: 2 },
  ],
  'attack-3': [
    { x: 0, y: 0 },
    { x: 2, y: 2 },
  ],
  'attack-4': [
    { x: 2, y: 0 },
    { x: 0, y: 2 },
  ],
  'attack-5': [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ],
  'attack-6': [
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
  'attack-7': [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ],
  'attack-8': [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
  'attack-9': [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
  ],
  'attack-10': [
    { x: 0, y: 0 },
    { x: 0, y: 2 },
  ],
  'attack-11': [
    { x: 0, y: 2 },
    { x: 2, y: 2 },
  ],
  'attack-12': [
    { x: 2, y: 0 },
    { x: 2, y: 2 },
  ],
};

export type AttackCardType = Extract<
  CardType,
  | 'attack-1'
  | 'attack-2'
  | 'attack-3'
  | 'attack-4'
  | 'attack-5'
  | 'attack-6'
  | 'attack-7'
  | 'attack-8'
  | 'attack-9'
  | 'attack-10'
  | 'attack-11'
  | 'attack-12'
>;

export const cardSpawnChance: Record<CardType, number> = {
  // straight movement (16)
  'move-up': 4,
  'move-down': 4,
  'move-left': 4,
  'move-right': 4,
  // diagonal movement (16)
  'move-top-left': 4,
  'move-top-right': 4,
  'move-bottom-left': 4,
  'move-bottom-right': 4,
  // total movement options (32)
  // 2-prong attacks (12)
  'attack-1': 1,
  'attack-2': 1,
  'attack-3': 1,
  'attack-4': 1,
  'attack-5': 1,
  'attack-6': 1,
  'attack-7': 1,
  'attack-8': 1,
  'attack-9': 1,
  'attack-10': 1,
  'attack-11': 1,
  'attack-12': 1,
  // total cards (44)
};

export const cardTypesByCategory: Record<CardCategory, CardType[]> = {
  movement: [
    'move-up',
    'move-down',
    'move-left',
    'move-right',
    'move-top-left',
    'move-top-right',
    'move-bottom-left',
    'move-bottom-right',
  ],
  sword: [
    'attack-1',
    'attack-2',
    'attack-3',
    'attack-4',
    'attack-5',
    'attack-6',
    'attack-7',
    'attack-8',
    'attack-9',
    'attack-10',
    'attack-11',
    'attack-12',
  ],
};

// these map to specific Icons
export type CardCategory = Extract<Icons, 'movement' | 'sword'>;

export const cardCategory: Record<CardType, CardCategory> = {
  'move-up': 'movement',
  'move-down': 'movement',
  'move-left': 'movement',
  'move-right': 'movement',
  'move-top-left': 'movement',
  'move-top-right': 'movement',
  'move-bottom-left': 'movement',
  'move-bottom-right': 'movement',
  'attack-1': 'sword',
  'attack-2': 'sword',
  'attack-3': 'sword',
  'attack-4': 'sword',
  'attack-5': 'sword',
  'attack-6': 'sword',
  'attack-7': 'sword',
  'attack-8': 'sword',
  'attack-9': 'sword',
  'attack-10': 'sword',
  'attack-11': 'sword',
  'attack-12': 'sword',
};

export const cardName: Record<CardType, string> = {
  'move-up': 'Move',
  'move-down': 'Move',
  'move-left': 'Move',
  'move-right': 'Move',
  'move-top-left': 'Move',
  'move-top-right': 'Move',
  'move-bottom-left': 'Move',
  'move-bottom-right': 'Move',
  'attack-1': 'Strike',
  'attack-2': 'Strike',
  'attack-3': 'Strike',
  'attack-4': 'Strike',
  'attack-5': 'Strike',
  'attack-6': 'Strike',
  'attack-7': 'Strike',
  'attack-8': 'Strike',
  'attack-9': 'Strike',
  'attack-10': 'Strike',
  'attack-11': 'Strike',
  'attack-12': 'Strike',
};

export const cardIcon: Record<CardType, Icons> = {
  'move-up': 'arrow-up',
  'move-down': 'arrow-down',
  'move-left': 'arrow-left',
  'move-right': 'arrow-right',
  'move-top-left': 'arrow-top-left',
  'move-top-right': 'arrow-top-right',
  'move-bottom-left': 'arrow-bottom-left',
  'move-bottom-right': 'arrow-bottom-right',
  'attack-1': 'attack-01',
  'attack-2': 'attack-02',
  'attack-3': 'attack-03',
  'attack-4': 'attack-04',
  'attack-5': 'attack-05',
  'attack-6': 'attack-06',
  'attack-7': 'attack-07',
  'attack-8': 'attack-08',
  'attack-9': 'attack-09',
  'attack-10': 'attack-10',
  'attack-11': 'attack-11',
  'attack-12': 'attack-12',
};

export const comboColors: ComboColor[] = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
];

export type ComboColor = Extract<
  ShapeColor,
  'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple'
>;

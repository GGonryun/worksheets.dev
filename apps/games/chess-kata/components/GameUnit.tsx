import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC, forwardRef, Ref } from 'react';
import { CSS_FILTER_COLOR, PlayerColor } from '../util/board';

export type GameUnitProps = {
  color: PlayerColor;
  id: number;
  zIndex: number;
};
export const GameUnit: FC<GameUnitProps> = forwardRef(
  ({ color, id, zIndex }, ref) => {
    const key = color + '-unit-' + id;
    const filter = CSS_FILTER_COLOR[color];
    const unit = id !== 2 ? `/unit/pawn.svg` : `/unit/king.svg`;
    return (
      <motion.div
        ref={ref as Ref<HTMLDivElement>}
        layout
        layoutId={key}
        exit={{ opacity: 1 }}
        style={{
          position: 'relative',
          borderRadius: '10px',
          height: '80%',
          width: '80%',
          zIndex: zIndex,
        }}
      >
        {id}
        <Image
          draggable="false"
          src={unit}
          alt="Game Piece"
          fill
          style={{
            filter: filter,
          }}
        />
      </motion.div>
    );
  }
);

GameUnit.displayName = 'Unit';

import { useEffect } from 'react';
import { BoardPosition } from '../Board';

// if the attacks and position overlap, apply damage.
export const useDamageObserver = ({
  attacks,
  position,
  dealDamage,
}: {
  attacks: BoardPosition[];
  position: BoardPosition;
  dealDamage: () => void;
}) => {
  useEffect(() => {
    if (attacks.length > 0) {
      const find = attacks.find((attack) => {
        return attack.x === position.x && attack.y === position.y;
      });

      if (find) {
        dealDamage();
      }
    }
  }, [attacks, position]);
};

import { DragHandlers, motion } from 'framer-motion';
import { FC, useState } from 'react';
import Image from 'next/image';
import { CARD_IMAGES, CardType } from '../util/playing-cards';
import { GameDifficulty } from '../util/enums';

// Letters represents a group of letters that can be dragged up and down.
export const PlayingCard: FC<{
  type: CardType;
  height: number;
  width: number;
  left: number;
  top: number;
  zIndex: number;
  revealed: boolean;
  draggable: boolean;
  difficulty: GameDifficulty;
  onClick: () => void;
  onDragEnd: (rect: DOMRect) => void;
  onDragStart: (rect: DOMRect) => void;
}> = ({
  onDragEnd,
  onDragStart,
  onClick,
  revealed,
  draggable,
  difficulty,
  zIndex,
  height,
  width,
  type,
  left,
  top,
}) => {
  // cache the start point so that we can animate from the start point
  const [clicked, setClicked] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startingPoint, setStartingPoint] = useState({ x: 0, y: 0 });

  const clickHandler = () => {
    setClicked(true);
    onClick();
  };

  const dragStartHandler: DragHandlers['onDragStart'] = (event, info) => {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    onDragStart(rect);
    // save the starting point so that we can start our animations from there
    setStartingPoint({ x: info.point.x, y: info.point.y });
    setDragging(true);
  };

  const dragEndHandler: DragHandlers['onDragEnd'] = (event) => {
    // the info point says nothing about the position of the card.
    // it only says where the mouse was when the drag ended.
    // but we care about the position of the card.
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    onDragEnd(rect);
    setDragging(false);
  };

  return (
    <motion.div
      onClick={clickHandler}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      drag={draggable}
      dragMomentum={false}
      animate={clicked ? 'clicked' : dragging ? 'dragging' : 'idle'}
      onAnimationComplete={() => {
        // if we clicked, then we want to reset the clicked state
        // this prevents the card from animating back to the starting point
        if (clicked) {
          setClicked(false);
        }
      }}
      variants={{
        clicked: {},
        dragging: {
          x: startingPoint.x,
          y: startingPoint.y,
          transition: {
            // instant transition
            type: false,
          },
        },
        idle: {
          x: left,
          y: top,
          transition: {
            duration: 0.5,
          },
        },
      }}
      dragElastic={0.2}
      dragSnapToOrigin={!dragging}
      style={{
        position: 'absolute',
        zIndex: dragging ? zIndex + 100 : zIndex,
      }}
    >
      <Image
        draggable="false"
        style={{
          touchAction: 'none',
          userSelect: 'none',
        }}
        src={revealed ? CARD_IMAGES[type] : CARD_IMAGES[difficulty]}
        alt={'ace of hearts'}
        width={width}
        height={height}
      />
    </motion.div>
  );
};

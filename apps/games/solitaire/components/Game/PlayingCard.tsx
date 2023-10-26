import { DragHandlers, motion } from 'framer-motion';
import { FC, useState } from 'react';
import Image from 'next/image';
import {
  CARD_IMAGES,
  CardType,
  GameDifficulty,
} from '../../util/playing-cards';

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
  isMobile: boolean;
  dragging: boolean;
  onClick: () => boolean;
  onDrag: (rect: DOMRect) => void;
  onDragEnd: (rect: DOMRect) => void;
  onDragStart: (rect: DOMRect) => void;
}> = ({
  onDragEnd,
  onDragStart,
  onDrag,
  onClick,
  revealed,
  draggable,
  difficulty,
  dragging: externalDragging,
  zIndex,
  isMobile,
  height,
  width,
  type,
  left,
  top,
}) => {
  // the moving state is used to keep the card on top of the other cards while dragging or clicking.
  const [moving, setMoving] = useState(false);
  // the clicked state is used to trigger the animation which makes sure that the card snaps to the new position when clicked.
  const [clicked, setClicked] = useState(false);
  // internal dragging state is used to trigger the animation which makes sure that the card snaps to the new position when dragging ends.
  const [dragging, setDragging] = useState(false);
  // cache the start point so that we can animate from the start point
  const [startingPoint, setStartingPoint] = useState<{
    x?: number;
    y?: number;
  }>({});

  const clickHandler = () => {
    if (!dragging && onClick()) {
      setClicked(true);
    }
  };

  const dragStartHandler: DragHandlers['onDragStart'] = (event, info) => {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    onDragStart(rect);
    // save the starting point so that we can start our animations from there
    setStartingPoint({ x: info.point.x, y: info.point.y });
    setDragging(true);
  };

  const dragEndHandler: DragHandlers['onDragEnd'] = (event, info) => {
    // the info point says nothing about the position of the card.
    // it only says where the mouse was when the drag ended.
    // but we care about the position of the card.
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    onDragEnd(rect);
    setDragging(false);
    setStartingPoint({});
  };

  const dragHandler: DragHandlers['onDrag'] = (event, info) => {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    if (!rect || !rect.x || !rect.y) {
      return;
    }
    onDrag(rect);
  };

  const dragGroupTransition = !isMobile
    ? { type: false }
    : {
        duration: 0.05 * zIndex,
      };

  return (
    <motion.div
      onClick={clickHandler}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDrag={dragHandler}
      drag={draggable}
      dragMomentum={false}
      animate={clicked ? 'clicked' : dragging ? 'dragging' : 'idle'}
      onAnimationStart={(e) => {
        if (e === 'idle' && !moving) {
          setMoving(true);
        }
      }}
      onAnimationComplete={(e) => {
        if (e === 'idle' && moving) {
          setMoving(false);
        }
        if (clicked) {
          setClicked(false);
        }
      }}
      variants={{
        clicked: {},
        dragging: {
          x: startingPoint.x,
          y: startingPoint.y,
          transition: externalDragging
            ? dragGroupTransition
            : {
                // instant transition
                type: false,
              },
        },
        idle: {
          x: left,
          y: top,
          transition: externalDragging
            ? dragGroupTransition
            : {
                duration: 0.3,
              },
        },
      }}
      dragElastic={0.2}
      dragSnapToOrigin={!dragging}
      style={{
        position: 'absolute',
        zIndex:
          revealed && (moving || dragging || externalDragging)
            ? zIndex + 1000
            : zIndex,
      }}
    >
      <Image
        priority
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

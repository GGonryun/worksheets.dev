import { PanHandlers, motion } from 'framer-motion';
import { LetterSelection } from './LetterSelection';
import { FC } from 'react';
import { useIntersectionObserver } from '../hooks';
import { useTheme } from '@mui/material';

export type WordBuilderProps = {
  anagram: string[];
  intersections: number[];
  onIntersect: (key: number) => void;
  onRelease: PanHandlers['onPanEnd'];
};

export const WordBuilder: FC<WordBuilderProps> = ({
  anagram,
  intersections,
  onIntersect,
  onRelease,
}) => {
  const { detect, register } = useIntersectionObserver({ onIntersect });
  const borderDiameter = 180;
  const dotDiameter = 130;
  const letterDiameter = 40;

  const theme = useTheme();

  return (
    <motion.div
      onPan={detect}
      onPanEnd={onRelease}
      style={{
        width: `${borderDiameter}px`,
        height: `${borderDiameter}px`,
        position: 'relative',
        borderRadius: '50%',
        border: `2px solid ${theme.palette.grey[600]}`,
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      {anagram.map((letter, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            margin: `calc(-${letterDiameter}px/2)`,
          }}
        >
          <LetterSelection
            selected={intersections.includes(index)}
            index={index}
            letter={letter}
            diameter={letterDiameter}
            registerPosition={register}
            transform={transformation({
              index,
              count: anagram.length,
              width: dotDiameter,
            })}
          />
        </div>
      ))}
    </motion.div>
  );
};

type TransformationOptions = { index: number; count: number; width: number };
const transformation = ({ index, count, width }: TransformationOptions) => {
  // angle of rotation
  const rotation = 360 / count;
  // offset of angle
  const offset = 360 - 90;

  const angle = offset + rotation * index;

  return `rotate(${angle}deg) translate(${width / 2}px) rotate(-${angle}deg)`;
};

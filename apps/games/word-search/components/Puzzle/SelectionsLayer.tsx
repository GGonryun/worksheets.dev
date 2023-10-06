import { drawLine } from '@worksheets/util-shapes';
import { motion } from 'framer-motion';
import { FC, Fragment } from 'react';
import { Pair, Registry } from '../../types';
import { colors, getCenter } from '../../util';

export const LineSelectionsLayer: FC<{
  lines: Pair[];
  registry: Registry;
  size: number;
}> = ({ lines, registry, size }) => (
  <Fragment>
    {lines.map(([a, b], i) => (
      <motion.div
        key={i}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.25,
        }}
        style={{
          ...drawLine(getCenter(a, registry), getCenter(b, registry), {
            thickness: size,
            padding: size,
            radius: size,
            color: colors[i + 1],
          }),
        }}
      />
    ))}
  </Fragment>
);

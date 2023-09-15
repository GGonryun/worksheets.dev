import { FC, ReactNode } from 'react';
import { Box, styled } from '@mui/material';
import { arrayFromLength } from '@worksheets/util/arrays';

// Based on this code sandbox:
// https://codesandbox.io/s/infinite-horizontal-auto-scroll-forked-cpf9g2?file=/src/Banner.jsx:232-250

const ScrollContainerOuter = styled(Box)({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
});

const ScrollContainerInner = styled(Box)({
  position: 'absolute',
  display: 'flex',
});

const ScrollContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'speed' && prop !== 'reversed',
})<Pick<AutoScrollProps, 'speed' | 'reversed'>>(({ speed, reversed }) => ({
  display: 'flex',
  animation: `scroll ${speed} linear infinite ${
    reversed ? 'reverse' : 'normal'
  }`,
  '@keyframes scroll': {
    from: {
      transform: 'translate(0)',
    },
    to: {
      transform: 'translate(-100%)',
    },
  },
}));

type Seconds = `${number}s`;
export type AutoScrollProps = {
  children: ReactNode;
  speed?: Seconds;
  reversed?: boolean;
  height: string;
  duplication?: number; // may help smoothen out the experience if the amount of elements is small
};

/**
 * AutoScroll pretends to do "inifite scroll" by duplicating the content and scrolling it, an unfortunate side effect of this hack is that we must specify a height for the container or else it will be 0px tall.
 */
export const AutoScroll: FC<AutoScrollProps> = ({
  children,
  height,
  duplication = 4,
  ...contentProps
}) => {
  return (
    <ScrollContainerOuter height={height}>
      <ScrollContainerInner>
        {/* Duplicate the content to make it appear infinite */}
        {arrayFromLength(duplication).map((_, i) => (
          <ScrollContent key={i} {...contentProps}>
            {children}
          </ScrollContent>
        ))}
      </ScrollContainerInner>
    </ScrollContainerOuter>
  );
};

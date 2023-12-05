import { forwardRef } from 'react';
import classes from './game-frame.module.scss';

export type GameFrameProps = { url: string };

export const GameFrame = forwardRef<HTMLIFrameElement, GameFrameProps>(
  ({ url }, ref) => {
    return (
      <iframe
        ref={ref}
        style={{
          userSelect: 'none',
        }}
        title="game-frame"
        src={url}
        className={classes.iframe}
        // sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-downloads allow-gamepad"
        // allow="autoplay; fullscreen *; geolocation; microphone; camera; midi; xr-spatial-tracking; gamepad; gyroscope; accelerometer; cross-origin-isolated; keyboard-map *; clipboard-write;"
      />
    );
  }
);

GameFrame.displayName = 'GameFrame';

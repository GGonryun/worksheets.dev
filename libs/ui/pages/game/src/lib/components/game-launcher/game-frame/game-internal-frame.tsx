import { forwardRef } from 'react';

import classes from './game-frame.module.scss';

export type GameInternalFrameProps = { url: string };

export const GameInternalFrame = forwardRef<
  HTMLIFrameElement,
  GameInternalFrameProps
>(({ url }, ref) => {
  return (
    <iframe
      ref={ref}
      id="game-frame"
      name="game-frame"
      title="game-frame"
      src={url}
      className={classes.iframe}
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-storage-access-by-user-activation allow-forms allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads"
      allow={`accelerometer; magnetometer; gyroscope; autoplay; payment; fullscreen; microphone; clipboard-read; clipboard-write 'self' ${url}`}
    />
  );
});

GameInternalFrame.displayName = 'GameInternalFrame';

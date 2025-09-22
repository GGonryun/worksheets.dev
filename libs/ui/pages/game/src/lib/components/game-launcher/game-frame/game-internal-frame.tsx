import { GameSchema } from '@worksheets/util/types';

import classes from './game-frame.module.scss';

type GameInternalFrameProps = {
  frameRef?: React.RefObject<HTMLIFrameElement | null>;
  file: GameSchema['file'];
};

export const GameInternalFrame: React.FC<GameInternalFrameProps> = ({
  file,
  frameRef,
}) => {
  const url = fixUrl(file);
  return (
    <iframe
      tabIndex={0}
      ref={frameRef}
      id="game-frame"
      name="game-frame"
      title="game-frame"
      src={url}
      className={classes.iframe}
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-storage-access-by-user-activation allow-forms allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads"
      allow={`accelerometer; magnetometer; gyroscope; autoplay; payment; fullscreen; microphone; clipboard-read; clipboard-write 'self' ${url}`}
    />
  );
};

GameInternalFrame.displayName = 'GameInternalFrame';

// added for legacy reasons, some games have a path with `/`index.html or just `/` at the end
const fixUrl = (file: GameSchema['file']) => {
  if (file.type === 'EXTERNAL') return file.url; // external links are assumed to be correct

  let fixed = file.url;
  if (fixed.endsWith('index.html')) {
    fixed.replace('index.html', '');
  }

  if (fixed.endsWith('/')) {
    fixed = fixed.slice(0, -1);
  }

  return `${fixed}/index.html`;
};

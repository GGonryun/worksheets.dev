import classes from './game-frame.module.scss';

type GameInternalFrameProps = {
  frameRef?: React.RefObject<HTMLIFrameElement | null>;
  url: string;
};

export const GameInternalFrame: React.FC<GameInternalFrameProps> = ({
  url,
  frameRef,
}) => {
  // check to see if the url ends in .index.html
  return (
    <iframe
      ref={frameRef}
      id="game-frame"
      name="game-frame"
      title="game-frame"
      src={fixUrl(url)}
      className={classes.iframe}
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-storage-access-by-user-activation allow-forms allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads"
      allow={`accelerometer; magnetometer; gyroscope; autoplay; payment; fullscreen; microphone; clipboard-read; clipboard-write 'self' ${url}`}
    />
  );
};

GameInternalFrame.displayName = 'GameInternalFrame';

// added for legacy reasons, some games have a path with `/`index.html or just `/` at the end
const fixUrl = (url: string) => {
  let fixed = url;
  if (fixed.endsWith('index.html')) {
    fixed.replace('index.html', '');
  }

  if (fixed.endsWith('/')) {
    fixed = fixed.slice(0, -1);
  }

  return `${fixed}/index.html`;
};

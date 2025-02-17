import { RefObject, useRef, useState } from 'react';

// game banner and game menu are allowed to be touched when in pseudo-fullscreen.
// this is a work around for ios safari, where the touch events get registered
// as scroll events and the page scrolls when the user tries to interact with the game.
export const GAME_BANNER_ID = 'game-banner';
export const GAME_MENU_ID = 'game-menu';
export const PLAY_NOW_BUTTON_ID = 'play-now-button';

const ALLOWED_TOUCH = [PLAY_NOW_BUTTON_ID, GAME_BANNER_ID, GAME_MENU_ID];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function customTouch(e: any) {
  // traverse all parents to see if any of them have id of game-banner
  let element = e.target;
  while (element != null) {
    if (ALLOWED_TOUCH.includes(element.id)) {
      return;
    }
    element = element.parentElement;
  }

  e.preventDefault();
  e.stopPropagation();
}
const usePseudoFullscreen = (
  docRef: RefObject<Document>,
  boxRef: RefObject<HTMLDivElement | null>
) => {
  const [fullscreen, setFullscreen] = useState(false);

  return {
    fullscreen,
    canRequestFullscreen: () => true,
    requestFullscreen: () => {
      if (!docRef.current) return;
      if (!boxRef.current) return;
      setFullscreen(true);
      boxRef.current.style.position = 'fixed';
      boxRef.current.style.left = '0px';
      boxRef.current.style.top = '0px';
      boxRef.current.style.bottom = '0px';
      boxRef.current.style.right = '0px';
      boxRef.current.style.minHeight = '100.1%';
      boxRef.current.style.height = '100.1%';
      boxRef.current.style.width = '100vw';
      boxRef.current.style.zIndex = '10000';
      boxRef.current.style.backgroundColor = 'black';

      boxRef.current.addEventListener('touchstart', customTouch, true);
      boxRef.current.addEventListener('touchmove', customTouch, true);
      boxRef.current.addEventListener('touchend', customTouch, true);
      boxRef.current.addEventListener('touchcancel', customTouch, true);

      docRef.current.documentElement.style.overflow = 'hidden';
      docRef.current.documentElement.style.userSelect = 'none';
      docRef.current.documentElement.style.touchAction = 'none';

      docRef.current.body.style.touchAction = 'none';
      docRef.current.body.style.userSelect = 'none';

      docRef.current.documentElement.scrollTop = 0;
      docRef.current.body.scrollTop = 0;
      window.scrollTo(0, 1);
    },
    canExitFullscreen: () => true,
    exitFullscreen: () => {
      if (!docRef.current) return;
      if (!boxRef.current) return;
      setFullscreen(false);
      boxRef.current.style.position = 'initial';
      boxRef.current.style.left = '';
      boxRef.current.style.top = '';
      boxRef.current.style.bottom = '';
      boxRef.current.style.right = '';
      boxRef.current.style.height = '';
      boxRef.current.style.minHeight = '';
      boxRef.current.style.width = '';
      boxRef.current.style.zIndex = '1';
      boxRef.current.style.backgroundColor = 'transparent';

      boxRef.current.removeEventListener('touchstart', customTouch, true);
      boxRef.current.removeEventListener('touchmove', customTouch, true);
      boxRef.current.removeEventListener('touchend', customTouch, true);
      boxRef.current.removeEventListener('touchcancel', customTouch, true);

      docRef.current.documentElement.style.overflow = 'auto';
      docRef.current.documentElement.style.userSelect = 'auto';
      docRef.current.documentElement.style.touchAction = 'auto';
      docRef.current.body.style.userSelect = 'auto';
      docRef.current.body.style.touchAction = 'auto';
    },
  };
};

export const useFullscreen = (boxRef: RefObject<HTMLDivElement | null>) => {
  const documentRef = useRef<Document>(document);

  const pseudo = usePseudoFullscreen(documentRef, boxRef);

  function requestFullScreen() {
    pseudo.requestFullscreen();
  }

  function exitFullScreen() {
    pseudo.exitFullscreen();
  }

  return {
    fullscreen: pseudo.fullscreen,
    requestFullScreen,
    exitFullScreen,
  };
};

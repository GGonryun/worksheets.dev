import { useEventListener } from '@worksheets/ui-core';
import { RefObject, useState, useRef } from 'react';

const useNativeFullscreen = (
  docRef: RefObject<Document>,
  boxRef: RefObject<HTMLDivElement>
) => {
  const [fullscreen, setFullscreen] = useState(false);

  const handleFullscreenChange = (e: Event) => {
    if (!docRef.current) return;
    setFullscreen(docRef.current.fullscreenElement !== null);
  };

  useEventListener('fullscreenchange', handleFullscreenChange, docRef);
  useEventListener('webkitfullscreenchange', handleFullscreenChange, docRef);
  useEventListener('mozfullscreenchange', handleFullscreenChange, docRef);
  useEventListener('msfullscreenchange', handleFullscreenChange, docRef);

  return {
    fullscreen,
    canRequestFullscreen: () => !!boxRef.current?.requestFullscreen,
    requestFullscreen: () => {
      const element = boxRef.current;
      const requestFullscreen = element?.requestFullscreen;
      if (!requestFullscreen) return;

      requestFullscreen.call(element);
    },
    canExitFullscreen: () => !!docRef.current?.exitFullscreen,
    exitFullscreen: () => {
      const exitFullscreen = docRef.current?.exitFullscreen;
      if (!exitFullscreen) return;

      exitFullscreen.call(docRef.current);
    },
  };
};

const usePseudoFullscreen = (
  docRef: RefObject<Document>,
  boxRef: RefObject<HTMLDivElement>
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
      boxRef.current.style.minHeight = '100dvh';
      boxRef.current.style.height = '100dvh';
      boxRef.current.style.width = '100vw';
      boxRef.current.style.zIndex = '10000';

      docRef.current.documentElement.style.overflow = 'hidden';
      docRef.current.documentElement.style.userSelect = 'none';
      docRef.current.documentElement.style.touchAction = 'none';

      docRef.current.body.style.touchAction = 'none';
      docRef.current.body.style.userSelect = 'none';

      docRef.current.documentElement.scrollTop = 0;
      docRef.current.body.scrollTop = 0;
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

      docRef.current.documentElement.style.overflow = 'auto';
      docRef.current.documentElement.style.userSelect = 'auto';
      docRef.current.documentElement.style.touchAction = 'auto';
      docRef.current.body.style.userSelect = 'auto';
      docRef.current.body.style.touchAction = 'auto';
    },
  };
};

export const useFullscreen = (boxRef: RefObject<HTMLDivElement>) => {
  const documentRef = useRef<Document>(document);

  const native = useNativeFullscreen(documentRef, boxRef);
  const pseudo = usePseudoFullscreen(documentRef, boxRef);

  function requestFullScreen() {
    pseudo.requestFullscreen();
  }

  function exitFullScreen() {
    pseudo.exitFullscreen();
  }

  return {
    fullscreen: native.fullscreen || pseudo.fullscreen,
    requestFullScreen,
    exitFullScreen,
  };
};

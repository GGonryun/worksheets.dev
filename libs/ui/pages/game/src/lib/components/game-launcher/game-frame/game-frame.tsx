import { Box, Typography } from '@mui/material';
import {
  GameEventCallback,
  GameEventKey,
  GameEventPayload,
  PlatformEventKey,
  PlatformEventPayload,
} from '@worksheets/sdk-games';
import { trpc } from '@worksheets/trpc-charity';
import {
  AdBlockModal,
  useDetectAdBlock,
  useGoogleAdsense,
} from '@worksheets/ui/components/advertisements';
import { PulsingIcon } from '@worksheets/ui/components/loading';
import { useEventListener } from '@worksheets/ui-core';
import { noop } from 'lodash';
import { SessionContextValue } from 'next-auth/react';
import React, { useRef } from 'react';

import { GameTrackingProvider } from '../../../context/game-tracking-context';
import { useGameNotifications } from '../../../hooks/use-game-notifications';
import classes from './game-frame.module.scss';
import { GameInternalFrame } from './game-internal-frame';

const VERIFIED_GAME_ORIGINS = [
  '*',
  'https://storage.googleapis.com',
  'https://cdn.charity.games',
];

const isValidOrigin = (origin: string) => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  return VERIFIED_GAME_ORIGINS.includes(origin);
};

const usePlatformListener = (
  frameRef: React.RefObject<HTMLIFrameElement | null>
) => {
  const callbacks = new Map<GameEventKey, GameEventCallback<GameEventKey>>();

  useEventListener('message', (message) => {
    if (!frameRef.current?.contentWindow) {
      console.warn('No content window');
      return;
    }
    const { data, origin } = message;

    if (origin === 'https://www.google.com') {
      return; // Ignore Google Adsense messages
    }

    if (!isValidOrigin(origin)) {
      console.warn('Invalid origin in parent', origin);
      return;
    }

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Invalid data type');
    }

    if (!('event' in data)) {
      throw new Error('Event not found');
    }

    if (!('payload' in data)) {
      throw new Error('Payload not found');
    }

    const event = data.event as GameEventKey;
    const payload = data.payload as GameEventPayload<typeof event>;

    for (const [key, callback] of callbacks.entries()) {
      if (event === key) {
        callback(payload);
      }
    }
  });

  return {
    on: <T extends GameEventKey>(key: T, callback: GameEventCallback<T>) => {
      callbacks.set(key, callback as GameEventCallback<GameEventKey>);
    },
    send: <T extends PlatformEventKey>(
      event: T,
      payload: PlatformEventPayload<T>
    ) => {
      if (!frameRef.current?.contentWindow)
        return console.warn('No content window');
      frameRef.current?.contentWindow.postMessage({ event, payload }, '*');
    },
  };
};

export const GameFrame: React.FC<{
  status: SessionContextValue['status'];
  url: string;
  gameId: string;
}> = ({ gameId, url, status }) => {
  const [showAdBlockModal, setShowAdBlockModal] = React.useState(false);
  const adsense = useGoogleAdsense();
  const adBlockDetected = useDetectAdBlock();
  const notifications = useGameNotifications();
  const utils = trpc.useUtils();
  const authenticated = status === 'authenticated';
  const loadStorage = trpc.user.game.storage.load.useMutation();
  const saveStorage = trpc.user.game.storage.save.useMutation();
  const startSession = trpc.user.game.session.start.useMutation();
  const loadAchievements = trpc.user.game.achievements.load.useMutation();
  const unlockAchievements = trpc.user.game.achievements.unlock.useMutation();
  const submitScore = trpc.user.leaderboards.submit.useMutation();
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  const child = usePlatformListener(frameRef);

  child.on('start-session', async () => {
    if (authenticated) {
      try {
        const session = await startSession.mutateAsync({
          gameId,
        });
        child.send('session-started', {
          ok: true,
          sessionId: session.sessionId,
        });
      } catch (error) {
        child.send('session-started', {
          ok: false,
          error,
        });
      }
    } else {
      child.send('session-started', {
        ok: true,
        sessionId: null,
      });
    }
  });

  child.on('load-storage', async ({ sessionId }) => {
    if (authenticated && sessionId) {
      try {
        const storage = await loadStorage.mutateAsync({
          sessionId,
        });
        child.send('storage-loaded', {
          ok: true,
          storage: storage?.storage ?? {},
        });
      } catch (error) {
        child.send('storage-loaded', {
          ok: false,
          error,
        });
      }
    } else {
      const storage = localStorage.getItem(`game-storage-${gameId}`);
      child.send('storage-loaded', {
        ok: true,
        storage: storage ? JSON.parse(storage) : {},
      });
    }
  });

  child.on('load-achievements', async ({ sessionId }) => {
    if (!authenticated || !sessionId) {
      child.send('achievements-loaded', {
        ok: true,
        achievements: [],
      });
    } else {
      try {
        const data = await loadAchievements.mutateAsync({
          sessionId: sessionId,
        });
        child.send('achievements-loaded', {
          ok: true,
          achievements: data?.achievements ?? [],
        });
      } catch (error) {
        child.send('achievements-loaded', {
          ok: false,
          error,
        });
      }
    }
  });

  child.on('unlock-achievements', async ({ sessionId, achievementIds }) => {
    if (!authenticated || !sessionId) {
      child.send('achievement-unlocked', {
        ok: true,
        unlocked: false,
      });
    } else {
      try {
        const result = await unlockAchievements.mutateAsync({
          sessionId,
          achievementIds,
        });

        if (!result.messages.length) {
          child.send('achievement-unlocked', {
            ok: true,
            unlocked: false,
          });
        } else {
          result.messages.forEach((m) => notifications.add(m));

          utils.user.game.achievements.list.invalidate();

          child.send('achievement-unlocked', {
            ok: true,
            unlocked: true,
          });
        }
      } catch (error) {
        child.send('achievement-unlocked', {
          ok: false,
          error,
        });
      }
    }
  });

  child.on('save-storage', async ({ sessionId, data }) => {
    if (authenticated && sessionId) {
      try {
        await saveStorage.mutateAsync({
          sessionId,
          data,
        });
        child.send('storage-saved', {
          ok: true,
          saved: true,
        });
      } catch (error) {
        child.send('storage-saved', {
          ok: false,
          error,
        });
      }
    } else {
      localStorage.setItem(`game-storage-${gameId}`, JSON.stringify(data));
      child.send('storage-saved', {
        ok: true,
        saved: true,
      });
    }
  });

  child.on('submit-score', async ({ sessionId, score }) => {
    if (!authenticated || !sessionId) {
      child.send('score-submitted', {
        ok: true,
        submitted: false,
      });
    } else {
      try {
        const result = await submitScore.mutateAsync({
          sessionId,
          score,
        });

        notifications.add(result.message, { color: 'success' });
        child.send('score-submitted', {
          ok: true,
          submitted: true,
        });
      } catch (error) {
        child.send('score-submitted', {
          ok: false,
          error,
        });
      }
    }
  });

  child.on('show-reward-ad', async ({ name }) => {
    if (adBlockDetected) {
      setShowAdBlockModal(true);
    } else {
      adsense.adBreak({
        name: 'reward-ad',
        type: 'reward',
        beforeAd: noop,
        afterAd: noop,
        adDismissed: noop,
        adViewed: noop,
        beforeReward: (showAdFn) => {
          showAdFn();
        },
        adBreakDone: (placementInfo) => {
          child.send('ad-break-done', { ...placementInfo, ok: true });
        },
      });
    }
  });

  child.on('show-interstitial-ad', async ({ name }) => {
    if (adBlockDetected) {
      setShowAdBlockModal(true);
    } else {
      adsense.adBreak({
        name: name ?? 'interstitial-ad',
        type: 'start',
        beforeAd: noop,
        afterAd: noop,
        adBreakDone: (placementInfo) => {
          child.send('ad-break-done', { ...placementInfo, ok: true });
        },
      });
    }
  });

  const handleClose = () => {
    setShowAdBlockModal(false);
    child.send('ad-break-done', {
      ok: false,
      error: 'AdBlock detected',
    });
  };

  return (
    <Box width="100%" height="100%" position="relative">
      <Box className={classes.placeholder}>
        <PulsingIcon size={164} />
        <Typography variant="h4" component="h1" color="error.main">
          Downloading Game...
        </Typography>
      </Box>
      <AdBlockModal open={showAdBlockModal} onClose={handleClose} />
      <GameTrackingProvider gameId={gameId}>
        <GameInternalFrame frameRef={frameRef} url={url} />
      </GameTrackingProvider>
    </Box>
  );
};

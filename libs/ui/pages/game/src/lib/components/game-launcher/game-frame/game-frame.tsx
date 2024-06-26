import { Box, Typography } from '@mui/material';
import { handlers } from '@worksheets/sdk-games';
import { trpc } from '@worksheets/trpc-charity';
import { PulsingIcon } from '@worksheets/ui/components/loading';
import { useEventListener } from '@worksheets/ui-core';
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

export const GameFrame: React.FC<{
  status: SessionContextValue['status'];
  url: string;
  gameId: string;
}> = ({ gameId, url, status }) => {
  const notifications = useGameNotifications();
  const utils = trpc.useUtils();
  const authenticated = status === 'authenticated';
  const loadStorage = trpc.user.game.storage.load.useMutation();
  const saveStorage = trpc.user.game.storage.save.useMutation();
  const startSession = trpc.user.game.session.start.useMutation();
  const loadAchievements = trpc.user.game.achievements.load.useMutation();
  const unlockAchievement = trpc.user.game.achievements.unlock.useMutation();
  const submitScore = trpc.user.leaderboards.submit.useMutation();
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEventListener('message', async ({ origin, data }) => {
    const contentWindow = frameRef.current?.contentWindow;

    if (!contentWindow) {
      console.warn('No content window');
      return;
    }

    if (!isValidOrigin(origin)) {
      console.warn('Invalid origin in parent', origin);
      return;
    }

    const { register, execute } = handlers(contentWindow, data);

    register('start-session', async () => {
      const session = authenticated
        ? await startSession.mutateAsync({
            gameId,
          })
        : null;
      return session ?? null;
    });

    register('load-storage', async (payload) => {
      if (authenticated && payload.sessionId) {
        const storage = await loadStorage.mutateAsync({
          sessionId: payload.sessionId,
        });
        return storage?.storage ?? {};
      } else {
        const storage = localStorage.getItem(`game-storage-${gameId}`);
        return JSON.parse(storage ?? '{}');
      }
    });

    register('load-achievements', async ({ sessionId }) => {
      if (!authenticated || !sessionId) return [];

      const data = await loadAchievements.mutateAsync({
        sessionId: sessionId,
      });

      return data?.achievements ?? [];
    });

    register('unlock-achievement', async ({ sessionId, achievementId }) => {
      if (!authenticated || !sessionId) return false;

      const result = await unlockAchievement.mutateAsync({
        sessionId,
        achievementId,
      });

      if (!result.unlocked) return false;

      notifications.add(result.message);
      utils.user.game.achievements.list.invalidate();

      return true;
    });

    register('save-storage', async ({ sessionId, data }) => {
      if (authenticated && sessionId) {
        await saveStorage.mutateAsync({
          sessionId,
          data,
        });
      } else {
        localStorage.setItem(`game-storage-${gameId}`, JSON.stringify(data));
      }
      return true;
    });

    register('submit-score', async ({ sessionId, score }) => {
      if (!authenticated || !sessionId) return false;

      const result = await submitScore.mutateAsync({
        sessionId,
        score,
      });

      if (!result.tokens) return false;

      notifications.add(result.message, { color: 'success' });

      return true;
    });

    await execute();
  });

  return (
    <Box width="100%" height="100%" position="relative">
      <Box className={classes.placeholder}>
        <PulsingIcon size={164} />
        <Typography variant="h4" component="h1" color="error.main">
          Downloading Game...
        </Typography>
      </Box>
      <GameTrackingProvider gameId={gameId}>
        <GameInternalFrame frameRef={frameRef} url={url} />
      </GameTrackingProvider>
    </Box>
  );
};

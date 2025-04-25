import { TRPCError } from '@trpc/server';
import { Prisma } from '@worksheets/prisma';
import { gameFileMetadataSchema, GameFileSchema } from '@worksheets/util/types';

export const parseGameFileVersion = (
  file: Prisma.GameFileGetPayload<{
    include: {
      uploader: true;
    };
  }>
): GameFileSchema => {
  const metadata = gameFileMetadataSchema.safeParse(file.metadata);
  if (!metadata.success) {
    console.error('Invalid metadata', metadata.error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Invalid file metadata',
    });
  }
  return {
    id: file.id,
    // TODO: add errors from unzip process.
    error: '',
    version: file.version,
    notes: file.notes,
    // TODO: remove failover this after migration
    gameId: file.gameId ?? '',
    uploader: {
      id: file.uploader?.id ?? '',
      username: file.uploader?.username ?? 'unknown',
    },
    createdAt: file.createdAt.toISOString(),
    isCurrent: file.isCurrent,
    metadata: metadata.data,
  };
};

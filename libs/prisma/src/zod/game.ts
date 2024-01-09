import * as z from 'zod';
import { GameCategory } from '@prisma/client';
import {
  CompleteGameFile,
  RelatedGameFileModel,
  CompleteViewport,
  RelatedViewportModel,
  CompleteProfile,
  RelatedProfileModel,
} from './index';

export const GameModel = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  headline: z.string(),
  description: z.string(),
  instructions: z.string(),
  markets: z.string().nullish(),
  category: z.nativeEnum(GameCategory),
  tags: z.string().array(),
  thumbnail: z.string(),
  cover: z.string(),
  screenshots: z.string().array(),
  trailer: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  fileId: z.string(),
  viewportId: z.string(),
  ownerId: z.string().nullish(),
});

export interface CompleteGame extends z.infer<typeof GameModel> {
  file: CompleteGameFile;
  viewport: CompleteViewport;
  owner?: CompleteProfile | null;
}

/**
 * RelatedGameModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGameModel: z.ZodSchema<CompleteGame> = z.lazy(() =>
  GameModel.extend({
    file: RelatedGameFileModel,
    viewport: RelatedViewportModel,
    owner: RelatedProfileModel.nullish(),
  })
);

import * as z from 'zod';
import { ViewportType, GameDevices, DeviceOrientations } from '@prisma/client';
import { CompleteGame, RelatedGameModel } from './index';

export const ViewportModel = z.object({
  id: z.string(),
  type: z.nativeEnum(ViewportType),
  width: z.number().int().nullish(),
  height: z.number().int().nullish(),
  devices: z.nativeEnum(GameDevices).array(),
  orientations: z.nativeEnum(DeviceOrientations).array(),
});

export interface CompleteViewport extends z.infer<typeof ViewportModel> {
  games: CompleteGame[];
}

/**
 * RelatedViewportModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedViewportModel: z.ZodSchema<CompleteViewport> = z.lazy(() =>
  ViewportModel.extend({
    games: RelatedGameModel.array(),
  })
);

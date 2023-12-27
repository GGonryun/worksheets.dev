import * as z from "zod"
import { GameStatus, GameDevices } from "@prisma/client"

export const GameModel = z.object({
  id: z.string(),
  key: z.string(),
  status: z.nativeEnum(GameStatus),
  name: z.string().nullish(),
  headline: z.string().nullish(),
  description: z.string().nullish(),
  banner: z.string().nullish(),
  logo: z.string().nullish(),
  video: z.string().nullish(),
  screenshots: z.string().array(),
  file: z.string().nullish(),
  devices: z.nativeEnum(GameDevices).array(),
  tags: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
  teamId: z.string(),
})

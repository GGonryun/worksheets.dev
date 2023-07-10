import { isAuthed } from '../middleware';
import { publicProcedure } from './public';

export const privateProcedure = publicProcedure.use(isAuthed);

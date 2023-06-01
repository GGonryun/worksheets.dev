import { z } from 'zod';
import { newApplication } from './applications';
import { newMethod } from './methods';

export const w = {
  newMethod,
  newApplication,
  z,
};

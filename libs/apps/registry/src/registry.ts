import { newRegistry } from './framework';
import { time } from './lib/time';
import { sys } from './lib/sys';
import { openai } from './lib/openai';
import { math } from './lib/math';

export const registry = newRegistry({ time, openai, sys, math });

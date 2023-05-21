/* eslint-disable @typescript-eslint/no-explicit-any */
import { Failure } from '@worksheets/util-errors';
import { Context } from './context';
import { Stack } from '../structures';

export type Address = string;

export interface Operation {
  process(ctx: Context): void;
}
export interface Instruction {
  process(ctx: Context): Promise<void>;
}

export function isInstruction(definition: unknown): definition is Instruction {
  if (!definition) return false;
  if (typeof definition != 'object') return false;
  if (Array.isArray(definition)) return false;
  if (!('type' in definition)) return false;
  return true;
}

export class Register {
  public name: string | undefined;
  public version: number | undefined;
  public failure: Stack<Failure>;
  public output: unknown;
  public input: unknown;
  /**
   * The Register contains named parameters known ahead of time and shared by all instructions.
   */
  constructor() {
    this.failure = new Stack();
  }
}

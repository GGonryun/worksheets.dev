import { Heap, Stack } from '@worksheets/util/data-structures';
import { ScriptEvaluator } from './evaluator';
import {
  ApplicationLibrary,
  MethodCallFailure,
} from '@worksheets/apps/framework';

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

/**
 * The Register contains named parameters known ahead of time and shared by all instructions.
 */
export class Register {
  public name?: string;
  public version?: number;
  public failure?: MethodCallFailure;
  public output: unknown;
  public input: unknown;
}

/**
 * Information about the current execution.
 */
export class Context {
  public readonly memory: Heap;
  public readonly register: Register;
  public readonly instructions: Stack<Instruction>;
  public readonly scripts: ScriptEvaluator;
  public readonly library: ApplicationLibrary;

  constructor({ memory, register, instructions, scripts, library }: Context) {
    this.memory = memory;
    this.register = register;
    this.instructions = instructions;
    this.scripts = scripts;
    this.library = library;
  }
}

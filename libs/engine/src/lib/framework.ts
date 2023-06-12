import { Heap, Stack } from '@worksheets/util/data-structures';
import { ScriptEvaluator } from './evaluator';
import { Library, MethodCallFailure } from '@worksheets/apps/framework';
import { Controller } from './controller';
import { Logger } from './logger';

export type Address = string;

export interface Operation {
  process(ctx: Context): void;
}

export interface Instruction {
  type: string;
  definition: unknown;
  process(ctx: Context): Promise<void>;
}

export type SerializedInstruction = Pick<Instruction, 'type' | 'definition'>;

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
  public readonly library: Library;
  public readonly controller: Controller;
  public readonly logger: Logger;

  constructor({
    memory,
    register,
    instructions,
    scripts,
    library,
    controller,
    logger,
  }: Context) {
    this.memory = memory;
    this.register = register;
    this.instructions = instructions;
    this.scripts = scripts;
    this.library = library;
    this.controller = controller;
    this.logger = logger;
  }
}

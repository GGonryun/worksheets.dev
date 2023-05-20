import { ScriptProcessor } from '../scripts/processor';
import { Heap, Register, Stack, Instruction } from './framework';

export class Context {
  public readonly memory: Heap;
  public readonly register: Register;
  public readonly instructions: Stack<Instruction>;
  public readonly scripts: ScriptProcessor;

  constructor(opts?: {
    register?: Register;
    memory?: Heap;
    instructions?: Stack<Instruction>;
  }) {
    // TODO: create a real library.
    const library = new Heap();
    this.memory = opts?.memory ?? new Heap();
    this.instructions = opts?.instructions ?? new Stack<Instruction>();
    this.register = opts?.register ?? new Register();
    this.scripts = new ScriptProcessor(this.memory, library);
  }
}

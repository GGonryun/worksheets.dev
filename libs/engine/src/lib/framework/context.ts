import { ApplicationLibrary, LibraryProcessor } from '../applications';
import { ScriptProcessor } from '../scripts';
import { Heap, Stack } from '../structures';
import { Register, Instruction } from './framework';

export interface ContextOptions {
  register: Register;
  memory: Heap;
  instructions: Stack<Instruction>;
  apps: ApplicationLibrary;
}
export class Context {
  public readonly memory: Heap;
  public readonly register: Register;
  public readonly instructions: Stack<Instruction>;
  public readonly scripts: ScriptProcessor;
  public readonly lib: LibraryProcessor;

  constructor(opts?: Partial<ContextOptions>) {
    this.memory = opts?.memory ?? new Heap();
    this.instructions = opts?.instructions ?? new Stack<Instruction>();
    this.register = opts?.register ?? new Register();
    this.lib = new LibraryProcessor(opts?.apps?.instructionsBridge());
    this.scripts = new ScriptProcessor(
      this.memory,
      opts?.apps?.scriptsBridge()
    );
  }
}

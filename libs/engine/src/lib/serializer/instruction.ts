import { Instruction, SerializedInstruction } from '../framework';
import {
  Assign,
  AssignDefinition,
  Assignment,
  AssignmentDefinition,
  Break,
  Call,
  CallDefinition,
  Catch,
  CatchDefinition,
  Continue,
  Copy,
  CopyDefinition,
  CreateScope,
  CreateScopeDefinition,
  Delay,
  DelayDefinition,
  End,
  Evaluate,
  EvaluateDefinition,
  Finally,
  FinallyDefinition,
  For,
  ForDefinition,
  If,
  IfDefinition,
  Init,
  InitDefinition,
  Jump,
  JumpDefinition,
  Log,
  LogDefinition,
  Loop,
  LoopDefinition,
  Next,
  NextDefinition,
  Parameters,
  ParametersDefinition,
  PullRegister,
  PullRegisterDefinition,
  PushRegister,
  PushRegisterDefinition,
  RestoreScope,
  RestoreScopeDefinition,
  Retry,
  RetryDefinition,
  Return,
  ReturnDefinition,
  Steps,
  StepsDefinition,
  Throw,
  ThrowDefinition,
  Try,
  TryDefinition,
  Wait,
  WaitDefinition,
  Worksheet,
  WorksheetDefinition,
} from '../instructions';
import { Serializer } from './serializer';
import { SerializerFailure } from './failures';

export class InstructionSerializer
  implements Serializer<Instruction, SerializedInstruction>
{
  serialize({ type, definition }: Instruction): SerializedInstruction {
    return { type, definition };
  }

  deserialize(serialized: SerializedInstruction): Instruction {
    if (serialized.type === 'assign') {
      return new Assign(serialized.definition as AssignDefinition);
    }
    if (serialized.type === 'assignment') {
      return new Assignment(serialized.definition as AssignmentDefinition);
    }
    if (serialized.type === 'break') {
      return new Break();
    }
    if (serialized.type === 'call') {
      return new Call(serialized.definition as CallDefinition);
    }
    if (serialized.type === 'catch') {
      return new Catch(serialized.definition as CatchDefinition);
    }
    if (serialized.type === 'continue') {
      return new Continue();
    }
    if (serialized.type === 'copy') {
      return new Copy(serialized.definition as CopyDefinition);
    }
    if (serialized.type === 'end') {
      return new End();
    }
    if (serialized.type === 'for') {
      return new For(serialized.definition as ForDefinition);
    }
    if (serialized.type === 'jump') {
      return new Jump(serialized.definition as JumpDefinition);
    }
    if (serialized.type === 'if') {
      return new If(serialized.definition as IfDefinition);
    }
    if (serialized.type === 'init') {
      return new Init(serialized.definition as InitDefinition);
    }
    if (serialized.type === 'loop') {
      return new Loop(serialized.definition as LoopDefinition);
    }
    if (serialized.type === 'next') {
      return new Next(serialized.definition as NextDefinition);
    }
    if (serialized.type === 'parameters') {
      return new Parameters(serialized.definition as ParametersDefinition);
    }
    if (serialized.type === RestoreScope.type) {
      return new RestoreScope(serialized.definition as RestoreScopeDefinition);
    }
    if (serialized.type === 'return') {
      return new Return(serialized.definition as ReturnDefinition);
    }
    if (serialized.type === 'steps') {
      return new Steps(serialized.definition as StepsDefinition);
    }
    if (serialized.type === 'try') {
      return new Try(serialized.definition as TryDefinition);
    }
    if (serialized.type === 'log') {
      return new Log(serialized.definition as LogDefinition);
    }
    if (serialized.type === 'delay') {
      return new Delay(serialized.definition as DelayDefinition);
    }
    if (serialized.type === 'wait') {
      return new Wait(serialized.definition as WaitDefinition);
    }
    if (serialized.type === 'throw') {
      return new Throw(serialized.definition as ThrowDefinition);
    }
    if (serialized.type === 'retry') {
      return new Retry(serialized.definition as RetryDefinition);
    }
    if (serialized.type === 'finally') {
      return new Finally(serialized.definition as FinallyDefinition);
    }
    if (serialized.type === 'evaluate') {
      return new Evaluate(serialized.definition as EvaluateDefinition);
    }
    if (serialized.type === CreateScope.type) {
      return new CreateScope(serialized.definition as CreateScopeDefinition);
    }
    if (serialized.type === Worksheet.type) {
      return new Worksheet(serialized.definition as WorksheetDefinition);
    }
    if (serialized.type === PushRegister.type) {
      return new PushRegister(serialized.definition as PushRegisterDefinition);
    }
    if (serialized.type === PullRegister.type) {
      return new PullRegister(serialized.definition as PullRegisterDefinition);
    }

    console.error('encountered unrecognized instruction', serialized);
    throw new SerializerFailure({
      code: 'unrecognized-instruction',
      data: serialized,
    });
  }
}

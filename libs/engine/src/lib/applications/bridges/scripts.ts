import { CallExpressionBridge, ScriptProcessor } from '../../scripts/processor';
import {
  SimpleCallExpression,
  Expression,
  PrivateIdentifier,
  Super,
} from 'estree';
import { ApplicationRegistry } from '../registries';

export class LoggingCallExpressionBridge implements CallExpressionBridge {
  async evaluate(_: ScriptProcessor, call: SimpleCallExpression) {
    console.log('LoggingApplicationBridge', call);
  }
}

export class UnimplementedCallExpressionBridge implements CallExpressionBridge {
  async evaluate() {
    throw new Error(
      'an application bridge for call expressions has not been configured yet'
    );
  }
}

export class ScriptsApplicationBridge implements CallExpressionBridge {
  private readonly registry: ApplicationRegistry;
  constructor(registry: ApplicationRegistry) {
    this.registry = registry;
  }
  async evaluate(
    processor: ScriptProcessor,
    call: SimpleCallExpression
  ): Promise<unknown> {
    const path = evaluateCallPath(call.callee);
    const args = await processor.evaluateCallExpressionArguments(
      call.arguments as Expression[]
    );
    return await this.registry.run({ path, input: args });
  }
}

export function evaluateCallPath(
  call: Expression | Super | PrivateIdentifier
): string {
  if (call.type === 'Identifier') {
    return call.name;
  }
  if (call.type === 'MemberExpression') {
    const object = evaluateCallPath(call.object);
    const property = evaluateCallPath(call.property);
    return `${object}.${property}`;
  }
  throw new Error('failed to evaluate call path, unrecognized type');
}

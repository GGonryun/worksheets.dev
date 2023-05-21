import {
  CallExpressionBridge,
  ScriptProcessor,
  evaluateCallPath,
} from '../../scripts/processor';
import { SimpleCallExpression, Expression } from 'estree';
import { ApplicationRegistry } from '../applications';

export class LoggingCallExpressionBridge implements CallExpressionBridge {
  async evaluate(processor: ScriptProcessor, call: SimpleCallExpression) {
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

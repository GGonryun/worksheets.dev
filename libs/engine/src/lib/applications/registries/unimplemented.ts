import { ApplicationRegistry } from './framework';

export class UnimplementedRegistry implements ApplicationRegistry {
  async run() {
    throw new Error('an application registry has not been set');
  }
}

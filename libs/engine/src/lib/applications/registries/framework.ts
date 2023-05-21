import { ApplicationExecutor } from '../applications';

export interface ApplicationRegistry {
  run: ApplicationExecutor<unknown, unknown>;
}

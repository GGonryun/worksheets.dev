import { ServiceProviderBridges } from '../framework';
import { create } from './create';
import { read } from './read';
import { remove } from './remove';
import { update } from './update';

export const crud: ServiceProviderBridges<'crud'> = {
  create,
  read,
  update,
  delete: remove,
};

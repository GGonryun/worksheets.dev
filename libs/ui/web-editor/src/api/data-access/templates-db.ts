import { listTemplates } from '@worksheets/templates';
export function newTemplatesDb() {
  return {
    list: () => {
      return listTemplates();
    },
  };
}

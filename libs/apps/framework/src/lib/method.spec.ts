import { z } from 'zod';
import { w } from './framework';
import { newMethod } from './methods';
import { newOAuthSetting, Infer, newFlagSetting } from './settings';
describe('newMethod', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {
      // do nothing.
    });
  });
  describe('creates a method definition', () => {
    it('empty', () => {
      const method = newMethod({
        path: '',
        label: '',
        description: '',
        settings: null,
        input: null,
        output: null,
        async call() {
          throw new Error('Function not implemented.');
        },
      });

      expect(method).not.toBeUndefined();
    });

    it('typesafe inputs', () => {
      const method = newMethod({
        path: '',
        label: '',
        description: '',
        settings: null,
        input: z.object({
          id: z.string(),
          count: z.number(),
          active: z.boolean().optional(),
        }),
        output: null,
        async call(ctx) {
          // hover over each to see  type suggestions.
          let { id, count, active } = ctx.input;
          id = 'test';
          count = 1;
          active = undefined;
          active = true;
          console.debug(id, count, active);
        },
      });

      expect(method).not.toBeUndefined();
    });

    it('typesafe outputs', () => {
      const method = w.newMethod({
        path: '',
        label: '',
        description: '',
        settings: null,
        input: null,
        output: z.object({
          id: z.string(),
          count: z.number(),
          active: z.boolean().optional(),
        }),
        async call() {
          // change type to see compiler errors.
          const id = 'test';
          const count = 1;
          const active = undefined;
          return { id, count, active };
        },
      });

      expect(method).not.toBeUndefined();
    });
    it('typesafe settings', () => {
      const method = newMethod({
        path: '',
        label: '',
        description: '',
        settings: {
          credentials: newOAuthSetting({
            options: {},
            schema: z.boolean(),
            required: true,
          }),
          feature: newFlagSetting({
            required: false,
          }),
        },
        input: null,
        output: null,
        async call(ctx) {
          // hover over ctx.settings or it's children to see typed properties.
          const { credentials, feature } = ctx.settings;
          console.debug(credentials, feature);
        },
      });

      expect(method).not.toBeUndefined();
    });
  });
});

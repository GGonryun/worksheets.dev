import { searchForFunctions, splitFunctionDeclaration } from './worksheets';

describe('searchForFunctions', () => {
  describe('contrived', () => {
    it('finds one', () => {
      const text = 'call:app1';
      const apps = searchForFunctions(text);
      expect(apps).toEqual(['app1']);
    });
    it("doesn't find one", () => {
      const text = 'callc:app2';
      const apps = searchForFunctions(text);
      expect(apps).toEqual([]);
    });
    it('finds two', () => {
      const text = 'call:app1\ncall:app2';
      const apps = searchForFunctions(text);
      expect(apps).toEqual(['app1', 'app2']);
    });
    it('finds some with spaces', () => {
      const text = 'call:app1\ncall: app2\ncall: app3';
      const apps = searchForFunctions(text);
      expect(apps).toEqual(['app1', 'app2', 'app3']);
    });
  });
  describe('templates', () => {
    it('finds apps in templates', () => {
      const text = `
      input: [args]
      steps:
          - call: google-gmail/get-user-email
              output: user
          - call: google-gmail/send-email
              input:
              to: \${args.email}
              subject: "Hello \${args.name}"
              body: "This is a test message using my current identity as \${user}"
              output: email
      return: \${email}
          `;
      const apps = searchForFunctions(text);
      expect(apps).toEqual([
        'google-gmail/get-user-email',
        'google-gmail/send-email',
      ]);
    });
  });
});

describe('splitFunctionDeclaration', () => {
  it('splits a function declaration', () => {
    const text = 'app/method@version';
    const declaration = splitFunctionDeclaration(text);
    expect(declaration).toEqual({
      app: 'app',
      method: 'method',
      version: 'version',
    });
  });
  it('splits functions without versions', () => {
    const text = 'app/method';
    const declaration = splitFunctionDeclaration(text);
    expect(declaration).toEqual({
      app: 'app',
      method: 'method',
      version: undefined,
    });
  });
});
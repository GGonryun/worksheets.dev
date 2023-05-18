import { getTextBetweenReferenceBrackets } from './util';

describe('engine', () => {
  it.each(['test', '', '${}', '${test', 'test}'])(
    "'%s' should not have any references to select",
    (data) => {
      const instances = getTextBetweenReferenceBrackets(data);
      expect(instances).toHaveLength(0);
    }
  );
  it.each([
    '${test}',
    'some ${interpolated} text',
    '${some ${nested}}',
    '${ ${ ${ ${test} } } }',
  ])("'%s' should one have any references to select", expectReferences(1));
  it.each([
    '${test} ${test}',
    '${some ${nested} ${text}}',
    '${} ${test} ${test}',
    '${ ${test} ${test} }',
    '${ ${ ${test} ${test} } }',
  ])("'%s' should one have any references to select", expectReferences(2));
});

function expectReferences(count: number) {
  return (data: string) => {
    const instances = getTextBetweenReferenceBrackets(data);
    expect(instances).toHaveLength(count);
  };
}

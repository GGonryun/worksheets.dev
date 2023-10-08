import { dictionaryByLength } from '@worksheets/ui-games';
import { Puzzle } from '../components/Puzzle';
import { DictionaryByLength, WordSlots, generatePuzzle } from '../util';
import { useEffect, useState } from 'react';

const t = true,
  f = false;

export function Index() {
  // take care to make sure that all words can intersect at some point
  const layout1 = [
    [f, f, f, f, f, f, f],
    [f, f, f, f, f, f, f],
    [f, f, f, f, f, f, f],
    [f, f, t, t, t, f, f],
    [f, f, t, f, t, f, f],
    [f, f, t, t, t, f, f],
    [f, f, f, f, f, f, f],
  ];

  const layout2 = [
    [t, t, t, f, t],
    [f, f, f, f, t],
    [f, f, f, f, t],
    [f, f, f, f, f],
    [f, f, f, f, f],
  ];

  const layout3 = [
    [t, f, t, f, f],
    [t, t, t, f, f],
    [t, f, t, t, t],
    [f, f, f, f, f],
    [f, f, f, f, f],
  ];

  const layout4 = [
    [t, f, t, f, f],
    [t, t, t, f, t],
    [t, f, t, t, t],
    [f, f, t, f, t],
    [f, f, t, t, t],
  ];

  const layout5 = [
    [t, f, t, f, f, f, t],
    [t, t, t, f, t, f, t],
    [t, f, t, t, t, f, t],
    [f, f, t, f, t, t, t],
    [f, f, t, t, t, f, t],
    [f, f, t, f, t, f, t],
    [f, f, t, t, t, t, t],
  ];
  const layout6 = [
    [t, t, t, t, f, t, t, t, t, t],
    [f, f, t, f, t, f, t, f, t, f],
    [f, t, t, t, t, f, t, t, t, t],
    [t, f, t, f, t, f, t, f, t, f],
    [t, t, t, f, t, f, t, f, t, f],
    [t, f, t, t, t, t, t, t, t, t],
    [f, t, f, t, f, f, t, f, f, t],
    [t, t, t, t, t, t, t, t, t, t],
    [f, t, f, f, t, f, t, f, f, t],
    [t, t, t, t, t, t, t, f, f, t],
  ];

  const layouts = [layout1, layout2, layout3, layout4, layout5, layout6];
  const layout = layouts[3];

  const testDictionary: DictionaryByLength = {
    ...dictionaryByLength,
  };

  const [props, setProps] = useState<{
    raw: WordSlots;
    slots: WordSlots;
    grid: string[][];
    layout: boolean[][];
  }>({
    raw: new WordSlots(),
    slots: new WordSlots(),
    grid: [[]],
    layout: [[]],
  });

  useEffect(() => {
    const grid = generatePuzzle(layout, testDictionary);
    const props = {
      layout,
      ...grid,
    };
    setProps(props);
  }, []);

  return <Puzzle {...props} />;
}

export default Index;

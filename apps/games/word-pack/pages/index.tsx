import { Puzzle } from '../components/Puzzle';
import {
  DictionaryByLength,
  constrainSlots,
  fillSlots,
  findSlots,
} from '../util';

const t = true,
  f = false;

export function Index() {
  const seed = 0;

  const layout1 = [
    [t, t, t, f, f],
    [t, f, t, f, f],
    [t, f, t, f, f],
    [f, f, f, f, f],
    [f, f, f, f, f],
  ];

  // take care to make sure that all words can intersect at some point
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
    [t, t, t, f, f],
    [t, f, t, t, t],
    [f, f, t, f, t],
    [f, f, t, t, t],
  ];

  const layouts = [layout1, layout2, layout3, layout4];
  const layout = layouts[2];

  const testDictionary: DictionaryByLength = {
    3: [
      'man',
      'mod',
      'dog',
      'ore',
      'red',
      'rod',
      'god',
      'and',
      'den',
      'end',
      'ear',
      'are',
    ],
  };

  const slots = findSlots(layout);
  fillSlots(slots, testDictionary);

  const g = constrainSlots(slots);

  const props = {
    layout,
  };
  return <Puzzle {...props} />;
}

export default Index;

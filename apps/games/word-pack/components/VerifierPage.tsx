import { GeneratedPuzzle, WordSlots, generatePuzzle } from '../util';
import { useEffect, useState } from 'react';
import { Puzzle } from './Puzzle';
import { CircularProgress } from '@mui/material';
import { AbsolutelyCentered } from '@worksheets/ui-core';
import { Layout } from './Layout';
import { dictionaryByLength } from '@worksheets/util-dictionary';

// this is a special page used to test new puzzles.

const x = true;
const o = false;

const level = {
  title: 'Love U',
  layout: [
    [o, x, x, x, x, o, x, x, x, x, o],
    [x, x, o, o, x, x, x, o, o, x, x],
    [x, o, o, o, o, x, o, o, o, o, x],
    [x, o, o, o, o, x, o, o, o, o, x],
    [x, x, x, o, o, o, o, o, x, x, x],
    [o, x, o, o, o, o, o, o, o, x, o],
    [o, x, o, o, o, o, o, o, o, x, o],
    [o, o, x, x, x, o, x, x, x, o, o],
    [o, o, o, x, x, x, x, x, o, o, o],
    [o, o, o, o, x, x, x, o, o, o, o],
    [o, o, o, o, o, x, o, o, o, o, o],
  ],
  dictionary: dictionaryByLength,
};

export const VerifierPage = () => {
  const [loading, setLoading] = useState(true);
  const [props, setProps] = useState<GeneratedPuzzle>({
    id: 0,
    title: '',
    slots: new WordSlots(),
    grid: [[]],
    layout: [[]],
  });

  useEffect(() => {
    setLoading(true);

    const puzzle = generatePuzzle(9999, level);
    setProps({ ...puzzle });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Layout
        content={
          <AbsolutelyCentered>
            <CircularProgress size={128} />
          </AbsolutelyCentered>
        }
      ></Layout>
    );
  }

  return (
    <Puzzle
      {...props}
      maxLevel={9999}
      loading={false}
      goToNextLevel={() => alert("Verification Page doesn't have a next level")}
      setSelections={() =>
        alert("Verification Page doesn't support selections")
      }
      selections={[[]]}
      onCompleteLevel={() =>
        alert("Verification Page doesn't support completion of levels")
      }
    />
  );
};

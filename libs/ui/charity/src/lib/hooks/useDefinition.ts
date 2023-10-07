/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
export type WordDefinition = {
  pronounciation: string;
  audio: string;
  meanings: WordMeaning[];
  source: string;
};

export type WordMeaning = {
  partOfSpeech: string;
  definitions: {
    definition: string;
    example?: string;
  }[];
};

export const useDefinition = (word: string) => {
  const [wordDefinition, setWordDefinition] = useState<WordDefinition | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDefinition = async () => {
      setLoading(true);
      try {
        const data = await memoRequest(word);
        const definition = await definer(data);
        setWordDefinition(definition);
        setError(null);
      } catch (error: any) {
        setError("Couldn't find definition");
      } finally {
        setLoading(false);
      }
    };

    if (word) {
      fetchDefinition();
    } else {
      setWordDefinition(null);
      setError(null);
    }
  }, [word]);

  return { definition: wordDefinition, loading, error };
};

// a very simple memoization function
const cache: Record<string, WordDefinition> = {};

async function memoRequest(word: string) {
  if (cache[word]) {
    return cache[word];
  }
  const data = await request(word);
  cache[word] = data;
  return data;
}

const request = async (word: string) => {
  // make a fetch request to https://api.dictionaryapi.dev/api/v2/entries/en/${word}
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  if (!response.ok) {
    throw new Error('Could not find definition');
  }

  // take the response and map it to the WordDefinition type
  return await response.json();
};

const definer = async (data: any): Promise<WordDefinition> => {
  const wordDefinition = data[0];
  const { audio, pronounciation } = audibles(data);
  const meanings = wordDefinition.meanings.map((meaning: any) => {
    return {
      partOfSpeech: meaning.partOfSpeech,
      definitions: meaning.definitions.map((definition: any) => {
        return {
          definition: definition.definition,
          example: definition.example,
        };
      }),
    };
  });

  const source = wordDefinition.sourceUrls[0];

  return {
    pronounciation,
    audio,
    meanings,
    source,
  };
};

const audibles = (data: any): { audio: string; pronounciation: string } => {
  for (const word of data) {
    for (const phonetic of word.phonetics) {
      if (phonetic.audio) {
        const audio = phonetic.audio;
        const pronounciation = phonetic.text;
        return { audio, pronounciation };
      }
    }
  }

  return { audio: '', pronounciation: '' };
};

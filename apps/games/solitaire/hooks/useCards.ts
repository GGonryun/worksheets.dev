import {
  randomizeArray,
  arrayFromLength,
  lastElement,
} from '@worksheets/util/arrays';
import cloneDeep from 'lodash/cloneDeep';
import { useState, useCallback } from 'react';
import {
  CardType,
  CARDS,
  CARD_TO_SUITE,
  CARDS_PER_SUITE,
  MAX_CARD_VALUE,
  areOppositeColors,
  GameDifficulty,
  PileType,
} from '../util/playing-cards';
import { usePlayer } from './usePlayer';
import { useTimer } from '@worksheets/ui-core';

export type CardData = ReturnType<typeof useCards>;

export const useCards = (difficulty: GameDifficulty) => {
  const player = usePlayer();
  const timer = useTimer();
  // start with all cards in the deck
  const [piles, setPiles] = useState<CardType[][]>([
    // deck pile
    CARDS,
    // reveal pile
    [],
    // suite piles
    [], //hearts
    [], // diamonds
    [], // clubs
    [], // spades
    // board piles
    [], // pile 1
    [], // pile 2
    [], // pile 3
    [], // pile 4
    [], // pile 5
    [], // pile 6
    [], // pile 7
  ]);

  // the # of cards in a pile that are flipped face down.
  const [hidden, setHidden] = useState<CardType[]>([]);
  // the state is used to undo moves.
  const [pileState, setPileState] = useState<CardType[][][]>([]);
  const [hiddenState, setHiddenState] = useState<CardType[][]>([]);
  const [scoreState, setScoreState] = useState<number[]>([]);
  // the score is calculated based on the following rules:
  // * 15 points for each card moved to a suit stack.
  // * 5 points for each card moved from the deck to a row stack.
  // * 5 points for each card turned face-up in a row stack.
  // * 3 points for each card moved from one row stack to another.
  // * -2 points for each 10 seconds elapsed during a timed game.
  // * -15 points for each card moved from a suit stack to a row stack.
  // * -20 points for each pass through the deck after four passes (Draw Three option).
  // * -100 points for each pass through the deck after one pass (Draw One option).
  // * You receive a bonus when you complete a timed game. The shorter the game, the larger the bonus.
  const [score, setScore] = useState(0);
  // use this to show the gameover screen.
  const [gameOver, setGameOver] = useState(false);

  const saveState = useCallback(() => {
    setPileState((state) => [...state, piles]);
    setHiddenState((state) => [...state, hidden]);
    setScoreState((state) => [...state, score]);
  }, [piles, hidden, score]);

  const getPile = useCallback(
    // returns the pile that the card is in, the type of that pile, and the cards index in the pile.
    (
      type: CardType
    ): { pile: CardType[]; pileType: PileType; cardIndex: number } => {
      for (let i = 0; i < piles.length; i++) {
        if (piles[i].includes(type)) {
          return {
            pile: piles[i],
            pileType: i,
            cardIndex: piles[i].indexOf(type),
          };
        }
      }

      throw new Error(`Could not find pile for card ${type}`);
    },
    [piles]
  );

  const peekTopCardOfDeck = useCallback(() => {
    saveState();
    // take the last card from the deck and move it to the reveal pile.
    const deck = cloneDeep(piles[PileType.Deck]);
    const peek = cloneDeep(piles[PileType.Peek]);
    if (!deck.length) return;
    let count = difficulty === GameDifficulty.Easy ? 1 : 3;
    while (count--) {
      const card = deck.pop();
      if (card != null) {
        peek.push(card);
      }
    }

    setPiles((piles) => [
      deck,
      peek,
      // rest of the piles are unchanged.
      ...piles.slice(PileType.Peek + 1),
    ]);
  }, [difficulty, piles, saveState]);

  const resetRevealPile = useCallback(() => {
    // take all the cards from the reveal pile and move them back to the deck.
    // the cards should be in the same order that they were in the reveal pile.
    const deck = piles[PileType.Deck];
    const peek = piles[PileType.Peek];
    if (!peek.length) return;
    if (deck.length) return;
    const cards = peek.slice().reverse();
    setPiles((piles) => [
      cards,
      [],
      // rest of the piles are unchanged.
      ...piles.slice(PileType.Peek + 1),
    ]);
    // score -100 points on easy.
    if (difficulty === GameDifficulty.Easy) {
      setScore((score) => Math.max(0, score - 100));
    }
  }, [difficulty, piles]);

  // this starts a new game.
  const shuffleAndServe = useCallback(() => {
    // clear the state.
    setPileState([]);
    setHiddenState([]);
    setScoreState([]);
    setGameOver(false);
    setScore(0);
    timer.reset();
    timer.start();
    // take all the cards from the deck and shuffle them.
    const deck = cloneDeep(CARDS);
    const shuffledDeck = randomizeArray([...deck]);

    // deal the cards to the board piles.
    // the first pile should have 1 card, the second pile should have 2 cards, the third pile should have 3 cards, etc.
    // the last card in each pile should be flipped face up.
    const boardPiles: CardType[][] = arrayFromLength(7).map(
      (_, index) => [] as CardType[]
    );

    for (let i = 0; i < 7; i++) {
      // place 1 + i cards in each pile
      let cards = i + 1;
      while (cards--) {
        const card = shuffledDeck.pop();
        if (card == null) throw new Error('Ran out of cards in the deck');
        boardPiles[i].push(card);
      }
    }

    // all the cards that are face down should be added to the hidden pile.
    const flipped = boardPiles
      .map((pile) => lastElement(pile))
      .filter((p) => p != null) as CardType[];

    const hidden = boardPiles
      .map((pile) => pile.filter((p) => !flipped.includes(p)))
      .flat();

    setHidden(hidden);

    setPiles(() => [
      shuffledDeck,
      // empty peek pile
      [],
      // empty suite piles.
      [],
      [],
      [],
      [],
      // the board piles
      ...boardPiles,
    ]);
  }, [timer]);

  const canMoveToPile = useCallback(
    (type: CardType): PileType[] => {
      if (gameOver) return [];
      const { pileType: currentPileType } = getPile(type);
      // there are 4 suite piles. hearts, diamonds, clubs, and spades.
      // a card can move to a suite pile if it is the next card in the suite pile.
      // the first card in a suite pile is an ace.
      // otherwise the card must be the next card in the suite.
      const suite = CARD_TO_SUITE[type];
      // offset by 2 because the suite piles are enum valued 2-5.
      const suitePile = piles[suite];
      const currentCardOrder = type % CARDS_PER_SUITE;
      const viableBoardPiles: PileType[] = [];

      // if the suite pile is empty the card must be an ace.
      if (suitePile.length === currentCardOrder) {
        // check if the current card has any cards on top of it.
        // if so, it can't be moved to the suite pile.
        const { pile, cardIndex } = getPile(type);
        if (pile.length === cardIndex + 1) {
          viableBoardPiles.push(suite);
        }
      }

      const BOARD_PILE_OFFSET = 6;
      // check if the card can be moved to a board pile.
      // the card can be moved to a board pile if it is the next card in the pile and it is the opposite color of the last card in the pile.
      for (let i = BOARD_PILE_OFFSET; i < piles.length; i++) {
        const pile = piles[i];

        const lastCard = lastElement(pile);
        // if the last card is undefined, then the pile is empty and the card can be moved to it if it's a king.
        if (lastCard == null) {
          if (currentCardOrder === MAX_CARD_VALUE) {
            viableBoardPiles.push(i);
          }
          continue;
        }
        // otherwise the card can move to the pile if it is the next card in the pile and it is the opposite color of the last card in the pile.

        const lastCardSuite = CARD_TO_SUITE[lastCard];
        const lastCardOrder = lastCard % CARDS_PER_SUITE;
        // if the last card is an ace card, we can't place any cards on it.
        if (lastCardOrder === 0) continue;
        // if the card is the next card in the pile and it is the opposite color of the last card in the pile.
        if (
          lastCardOrder === currentCardOrder + 1 &&
          areOppositeColors(lastCardSuite, suite)
        ) {
          viableBoardPiles.push(i);
        }
      }
      // filter out the current pile.
      return viableBoardPiles.filter((pile) => pile !== currentPileType);
    },
    [gameOver, getPile, piles]
  );

  const scorePoints = useCallback((fromPile: PileType, toPile: PileType) => {
    // score 15 points for each card moved to a suit stack.
    if (toPile >= PileType.Hearts && toPile <= PileType.Spades) {
      setScore((score) => score + 15);
    }
    // score 5 points for each card moved from the deck to a row stack.
    if (fromPile === PileType.Deck && toPile >= PileType.Pile1) {
      setScore((score) => score + 5);
    }
    // score 5 points for each card moved from the peek pile to a row stack.
    if (fromPile === PileType.Peek && toPile >= PileType.Pile1) {
      setScore((score) => score + 5);
    }
    // score -15 points for each card moved from a suit stack to a row stack.
    if (fromPile >= PileType.Hearts && fromPile <= PileType.Spades) {
      setScore((score) => score - 15);
    }
  }, []);

  const autoCompleteGame = useCallback(() => {
    // get all cards in the deck.
    const deck = piles[PileType.Deck];
    // get all cards that are peeked.
    const peek = piles[PileType.Peek];
    // if there are any cards in the deck, the game isn't over.
    // or if there are more than 1 cards in the peek pile, the game isn't over.
    // or if there are any cards in the board piles, the game isn't over.
    if (hidden.length > 0 || deck.length > 0 || peek.length > 1) {
      return;
    }

    timer.pause();
    // get all cards that are in the board piles.
    const boardPiles = piles.slice(PileType.Pile1, PileType.Pile7 + 1);
    // get all cards that are in the suite piles.
    const suitePiles = piles.slice(PileType.Hearts, PileType.Spades + 1);
    // merge all the cards together.
    const allCards = [
      ...deck,
      ...peek,
      ...boardPiles.flat(),
      ...suitePiles.flat(),
    ];
    // now separate the cards into their suites.
    const suites = arrayFromLength(4).map(() => [] as CardType[]);
    allCards.forEach((card) => {
      const suite = CARD_TO_SUITE[card];
      suites[suite - PileType.Hearts].push(card);
    });
    // now sort each suite.
    suites.forEach((suite) => {
      suite.sort((a, b) => a - b);
    });
    // now update the piles.
    setPiles([
      // the deck is empty.
      [],
      // the reveal pile is empty.
      [],
      // the suite piles are now sorted.
      ...suites,
      // the board piles are empty.
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ]);

    setGameOver(true);
    player.completeGame();
  }, [hidden.length, piles, player, timer]);

  const moveAcrossPiles = useCallback(
    (type: CardType, toPile: PileType) => {
      if (gameOver) return;

      const { pileType: fromPileType, cardIndex } = getPile(type);
      //before performing the move save the current pile state to the undo stack.
      saveState();
      // move the card from the from pile to the to pile.
      const newPiles = cloneDeep(piles);
      // get the pile that the card is in.
      const fromPile = newPiles[fromPileType];
      // get all the cards on top of the card.
      const cardsToMove = fromPile.slice(cardIndex);
      // remove the cards from the from pile.
      fromPile.splice(cardIndex, cardsToMove.length);
      // add all the cards on top of the card to the to pile.
      newPiles[toPile].push(...cardsToMove);

      setPiles(newPiles);

      // score basic points
      scorePoints(fromPileType, toPile);

      // if we're coming from the peek pile, the card isn't a hidden card.
      if (fromPileType === PileType.Peek) {
        autoCompleteGame();
        return;
      }

      // if we're coming from a board pile, check if the card before the card we moved is face down.
      if (fromPileType < PileType.Pile1) {
        autoCompleteGame();
        return;
      }

      // check if the card before the card we moved is face down.
      const previousCard = fromPile[cardIndex - 1];
      if (previousCard == null) {
        autoCompleteGame();
        return;
      }
      // the card is already revealed.
      if (!hidden.includes(previousCard)) {
        autoCompleteGame();
        return;
      }
      // remove the card from the hidden pile.
      const oldHidden = cloneDeep(hidden).filter(
        (card) => card !== previousCard
      );
      setHidden(oldHidden);

      // score 5 points for each card turned face-up in a row stack.
      setScore((score) => score + 5);
      autoCompleteGame();
    },
    [gameOver, getPile, saveState, piles, scorePoints, hidden, autoCompleteGame]
  );

  const undoAction = useCallback(() => {
    if (gameOver) return;
    // take the state and move it back one step.
    // pop the last state off the stack.
    if (!pileState.length) return;
    const oldPile = cloneDeep(pileState);
    const oldHidden = cloneDeep(hiddenState);
    const oldScore = cloneDeep(scoreState);
    // pop the last state off the stack.
    const lastPile = oldPile.pop();
    const lastRevealed = oldHidden.pop();
    const lastScore = oldScore.pop();
    if (lastPile == null || lastRevealed == null || lastScore == null) return;
    // set the piles to the last state.
    setPiles(lastPile);
    setHidden(lastRevealed);
    setScore(lastScore);
    // set the state to the last state.
    setPileState(oldPile);
    setHiddenState(oldHidden);
    setScoreState(oldScore);
  }, [gameOver, pileState, hiddenState, scoreState]);

  return {
    piles,
    hidden,
    gameOver,
    score,
    time: timer.time,
    undoAction,
    peekTopCardOfDeck,
    resetRevealPile,
    getPile,
    shuffleAndServe,
    canMoveToPile,
    moveAcrossPiles,
  };
};

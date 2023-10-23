import { State } from './types';

const ADVANCE_TIME = (timeToAdd: number) =>
  createActionType('advanceTime', { timeToAdd });

const PAUSE = () => createActionType('pause');

const RESET = (initialTime: number) =>
  createActionType('reset', { initialTime });

const SET = (newTime: number) => createActionType('set', { newTime });

const START = (initialTime: number) =>
  createActionType('start', { initialTime });

const STOP = () => createActionType('stop');

export type TimerActionsType = ReturnType<
  | typeof ADVANCE_TIME
  | typeof PAUSE
  | typeof RESET
  | typeof SET
  | typeof START
  | typeof STOP
>;

export function createActionType<T extends string>(type: T): { type: T };

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export function createActionType<T extends string, P extends unknown>(
  type: T,
  payload: P
): { type: T; payload: P };

export function createActionType(type: string, payload?: unknown) {
  return { type, payload };
}

export function reducer(state: State, action: TimerActionsType): State {
  switch (action.type) {
    case 'advanceTime': {
      const { timeToAdd } = action.payload;

      return {
        ...state,
        time:
          state.timerType === 'DECREMENTAL'
            ? state.time - timeToAdd
            : state.time + timeToAdd,
      };
    }
    case 'pause': {
      return {
        ...state,
        status: 'PAUSED',
      };
    }
    case 'reset': {
      return {
        ...state,
        status: 'STOPPED',
        time: action.payload.initialTime,
      };
    }
    case 'set': {
      return {
        ...state,
        time: action.payload.newTime,
      };
    }
    case 'start': {
      const { initialTime } = action.payload;

      return {
        ...state,
        status: 'RUNNING',
        time: state.status === 'STOPPED' ? initialTime : state.time,
      };
    }
    case 'stop': {
      return {
        ...state,
        status: 'STOPPED',
      };
    }
    default:
      return state;
  }
}

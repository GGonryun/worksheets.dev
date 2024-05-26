import { TRPCError } from '@trpc/server';

import { aggregateErrors, defer } from '../form';
import { TaskData } from '../task';

export const parseTaskPollState = (poll: TaskData['POLL'], state: unknown) => {
  if (!state) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll state is missing',
    });
  }

  if (typeof state !== 'object' || Array.isArray(state)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll state is not an object',
    });
  }

  if (!('answer' in state)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll answer is missing',
    });
  }

  if (!state.answer || typeof state.answer !== 'string') {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll answer cannot be empty',
    });
  }

  if (!poll.options.some((o) => o.key === state.answer)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll answer is not a valid option',
    });
  }

  return {
    answer: state.answer,
  };
};

export const parseTaskPollData = (data: unknown): TaskData['POLL'] => {
  if (!data) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll information is missing',
    });
  }

  if (typeof data !== 'object' || Array.isArray(data)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll information is not an object',
    });
  }

  if (!('question' in data)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll question is missing',
    });
  }

  if (!data.question || typeof data.question !== 'string') {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll question is invalid',
    });
  }

  if (!('options' in data)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll options are missing',
    });
  }

  return {
    question: data.question,
    options: parseOptions(data.options),
  };
};

const parseOptions = (data: unknown) => {
  if (!Array.isArray(data)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll options are invalid',
    });
  }

  try {
    return aggregateErrors(data.map(defer(parseOption)));
  } catch (error) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll options are invalid',
      cause: error,
    });
  }
};

const parseOption = (data: unknown) => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll option is not an object',
    });
  }

  if (!('key' in data)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll option key is missing',
    });
  }

  if (!data.key || typeof data.key !== 'string') {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll option key is invalid',
    });
  }

  if (!('label' in data)) {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll option label is missing',
    });
  }

  if (!data.label || typeof data.label !== 'string') {
    throw new TRPCError({
      code: 'PARSE_ERROR',
      message: 'Poll option label is invalid',
    });
  }

  return {
    key: data.key,
    label: data.label,
  };
};

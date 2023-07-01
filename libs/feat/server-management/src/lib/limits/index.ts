import { request } from './request';
import { throttle } from './throttle';

export const limits = {
  request, // TODO: could we live in a world without using request limits like this?
  throttle,
};

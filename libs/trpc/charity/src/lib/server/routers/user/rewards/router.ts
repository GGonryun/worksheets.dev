import { t } from '../../../trpc';
import gamePlay from './gamePlay/router';
import gameTime from './gameTime/router';
import get from './get';
import giftBoxes from './giftBoxes/router';

export default t.router({
  get,
  gamePlay,
  gameTime,
  giftBoxes,
});

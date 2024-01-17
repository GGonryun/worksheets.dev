import { t } from '../../../trpc';
import create from './create';
import dailyReward from './dailyReward/router';
import gamePlay from './gamePlay/router';
import get from './get';
import giftBoxes from './giftBoxes/router';

export default t.router({
  create,
  get,
  dailyReward,
  gamePlay,
  giftBoxes,
});

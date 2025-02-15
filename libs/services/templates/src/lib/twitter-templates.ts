import { routes } from '@worksheets/routes';
import { printShortDate } from '@worksheets/util/time';
import pluralize from 'pluralize';

import { ExtractTemplatePayload } from './types';
import { GAME_URL } from './urls';

const RAFFLE_URL = (raffleId: number) =>
  routes.raffle.url({ params: { raffleId } });
export class TwitterTemplates {
  static newGame(opts: ExtractTemplatePayload<'new-game'>) {
    return `🚨 New Game Alert!\n📷 Play ${opts.title} by ${
      opts.developer.name
    }!\n\n${GAME_URL(opts.id)}\n\n#HTML5Games #FreeGames #BrowserGames`;
  }
  static newRaffle(opts: ExtractTemplatePayload<'new-raffle'>) {
    return `🎊 GIVEAWAY 🎊\n🎁 Enter our ${
      opts.name
    } giveaway!\n\n🏆 1 lucky winner will be chosen on ${printShortDate(
      opts.expiresAt
    )}.\n\n${RAFFLE_URL(opts.id)}\n\n#Giveaway #Sweepstakes #Raffle`;
  }
  static raffleExpired(opts: ExtractTemplatePayload<'raffle-expired'>) {
    return `🎉 Giveaway #${opts.id} for ${
      opts.name
    } has ended! 🎉\n\n1 lucky winner was chosen out of ${
      opts.participants.length
    } ${pluralize(
      'participant',
      opts.participants.length
    )}. View results: ${RAFFLE_URL(opts.id)}`;
  }
}

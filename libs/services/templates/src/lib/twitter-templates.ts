import { routes } from '@worksheets/routes';
import { printShortDate } from '@worksheets/util/time';
import pluralize from 'pluralize';

import { ExtractTemplatePayload } from './types';

const RAFFLE_URL = (raffleId: number) =>
  routes.raffle.url({ params: { raffleId } });
export class TwitterTemplates {
  static newGame(opts: ExtractTemplatePayload<'new-game'>) {
    return `🚨 New Game Alert!\n📷 Play ${opts.title} by ${
      opts.developer.name
    }!\n\n${routes.game.path({
      params: { gameId: opts.id },
    })}\n\n#HTML5Games #FreeGames #BrowserGames`;
  }
  static newRaffle(opts: ExtractTemplatePayload<'new-raffle'>) {
    return `💵🎊 GIVEAWAY 🎊💵\n🎁 Enter to win a ${opts.prize.name}!\n\n🏆${
      opts.numWinners
    } lucky ${pluralize(
      'winner',
      opts.numWinners
    )} will be chosen on ${printShortDate(
      opts.expiresAt
    )}.\n\n${routes.raffle.path({
      params: { raffleId: opts.id },
    })}\n\n#Giveaway #Sweepstakes #Raffle`;
  }
  static raffleExpired(opts: ExtractTemplatePayload<'raffle-expired'>) {
    return `🎉 A raffle for ${opts.prize.name} has ended! 🎉\n\n${
      opts.numWinners
    } lucky ${pluralize('winner', opts.numWinners)} was chosen out of ${
      opts.participants.length
    } ${pluralize(
      'participant',
      opts.participants.length
    )}. View results: ${RAFFLE_URL(opts.id)}`;
  }
}

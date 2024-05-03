import {
  GRUVIAN_API_KEY,
  GRUVIAN_EVENT_ID,
  GRUVIAN_NETWORK_ID,
} from '@worksheets/services/environment';
import { GruvianAdvertisementSchema } from '@worksheets/util/types';

// https://github.com/gruvianads/gruvian-examples/blob/develop/express/index.js
export class AdvertisementService {
  #eventId = GRUVIAN_EVENT_ID; // Specifc
  #networkId = GRUVIAN_NETWORK_ID;
  #testMode = true;

  async get(): Promise<GruvianAdvertisementSchema> {
    try {
      const response = await fetch('https://api.gruvian.com/auctions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GRUVIAN_API_KEY}`,
        },
        body: JSON.stringify({
          network_id: this.#networkId,
          test_mode: this.#testMode,
        }),
      });
      const json = await response.json();

      if (response.status === 201 && json.filled && json.winners.length > 0) {
        // get the winning ad and resolution_id
        const winner = json.winners[0];
        return { ...winner, filled: true };
      } else {
        // No active campaign or no ad available
        return { filled: false };
      }
    } catch (error) {
      // Handle fetch errors
      console.error('Error fetching ad:', error);
      return { filled: false };
    }
  }

  async click(opts: { resolutionId: string }) {
    try {
      const response = await fetch('https://api.gruvian.com/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GRUVIAN_API_KEY}`,
        },
        body: JSON.stringify({
          event_id: this.#eventId,
          test_mode: this.#testMode,
          resolution_id: opts.resolutionId,
        }),
      });

      if (response.status === 204) {
        // registered event successfully
      } else {
        console.error('Error registering event:', response.status);
      }
    } catch (error) {
      // Handle fetch errors
      console.error('Error registering event:', error);
    }

    return { okay: true };
  }
}

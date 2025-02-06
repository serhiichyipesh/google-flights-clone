import { TSearchFlightsTwoWayParams, TTicketsResponse } from '@/types';

import { ApiClient } from './instance';
import to from 'await-to-js';

export const searchFlightsTwoWay = async ({
  legs,
  cabinClass,
  adults,
}: TSearchFlightsTwoWayParams) => {
  const [err, response] = await to(
    ApiClient.get<{ data: { itineraries: TTicketsResponse[] } }>(
      'flights/searchFlightsMultiStops',
      {
        params: {
          cabinClass,
          adults,
          legs: `${JSON.stringify(legs)}`,
          sortBy: 'best',
          currency: 'USD',
          market: 'en-US',
          countryCode: 'US',
        },
      }
    )
  );

  if (err) {
    throw new Error(`Error while searching flights: ${err}`);
  }

  return response.data.data.itineraries;
};

import { TSearchFlightsParams } from '@/types';
import to from 'await-to-js';
import { ApiClient } from './instance';

export const searchFlights = async (params: TSearchFlightsParams) => {
  const [err, response] = await to(
    ApiClient.get('flights/searchFlightsMultiStops', {
      params: {
        ...params,
        sortBy: 'best',
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US',
      },
    })
  );

  if (err) {
    throw new Error(`Error while searching flights: ${err}`);
  }

  return response.data.data.itineraries.slice(0, 40);
};

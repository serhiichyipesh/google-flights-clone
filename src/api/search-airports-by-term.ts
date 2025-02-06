import { TGetNearbyAirportsResponse } from '@/types';
import to from 'await-to-js';
import { ApiClient } from './instance';

export const searchAirportsByTerm = async (query: string) => {
  const [err, response] = await to(
    ApiClient.get<{ data: TGetNearbyAirportsResponse[] }>(
      'flights/searchAirport',
      {
        params: {
          query,
          locale: 'en-US',
        },
      }
    )
  );

  if (err) {
    throw new Error(`Error while getting nearby airports: ${err}`);
  }

  return response.data.data;
};

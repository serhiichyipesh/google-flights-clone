import { TGetNearbyAirportsResponse } from '@/types';
import to from 'await-to-js';
import { ApiClient } from './instance';

export const getNearbyAirports = async (lat: number, lng: number) => {
  const [err, response] = await to(
    ApiClient.get<TGetNearbyAirportsResponse>('/flights/getNearbyAirports', {
      params: {
        lat,
        lng,
        locale: 'en-US',
      },
    })
  );

  if (err) {
    throw new Error(`Error while getting nearby airports: ${err}`);
  }

  return response.data;
};

import { TCabinClass, TParams, TSearchFlightsParams } from '@/types';
import { formatDate, processTicketsData } from '@/lib';
import { searchFlights, searchFlightsTwoWay } from '@/api';

import { useFlight } from '@/stores';
import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';

export const useTicketsData = () => {
  const {
    classOption,
    persons,
    departureDate,
    arriveDate,
    departureInfo,
    arriveInfo,
    isOneWay,
  } = useFlight();

  const departureQuery: TParams = useMemo(() => {
    return {
      date: formatDate(departureDate, 'yyyy-MM-dd') as unknown as Date,

      origin: departureInfo.origin,
      originEntityId: departureInfo.originEntityId,

      destination: arriveInfo.destination,
      destinationEntityId: arriveInfo.destinationEntityId,
    };
  }, [departureInfo, departureDate, arriveInfo]);

  const arriveQuery: TParams = useMemo(() => {
    return {
      date: formatDate(arriveDate, 'yyyy-MM-dd') as unknown as Date,

      origin: arriveInfo.destination,
      originEntityId: arriveInfo.destinationEntityId,

      destination: departureInfo.origin,
      destinationEntityId: departureInfo.originEntityId,
    };
  }, [arriveInfo, arriveDate, departureInfo]);

  const oneWayQuery: TSearchFlightsParams = useMemo(() => {
    return {
      date: formatDate(departureDate, 'yyyy-MM-dd') as unknown as Date,

      originSkyId: departureInfo.origin,
      originEntityId: departureInfo.originEntityId,

      destinationSkyId: arriveInfo.destination,
      destinationEntityId: arriveInfo.destinationEntityId,
      cabinClass: classOption.toLowerCase() as TCabinClass,
      adults: persons.Adults,
    };
  }, [departureInfo, departureDate, arriveInfo, classOption, persons]);

  const [
    { data: oneWayData, isLoading: isLoadingOneWay },
    { data: twoWayData, isLoading: isLoadingTwoWay },
  ] = useQueries({
    queries: [
      {
        queryKey: ['flights', oneWayQuery, classOption, persons],
        queryFn: () => searchFlights(oneWayQuery),
        enabled: !!departureDate && !arriveDate,
      },
      {
        queryKey: [
          'flights',
          departureQuery,
          arriveQuery,
          classOption,
          persons,
        ],
        queryFn: () =>
          searchFlightsTwoWay({
            legs: [departureQuery, arriveQuery],
            cabinClass: classOption.toLowerCase() as TCabinClass,
            adults: persons.Adults,
          }),
        enabled: !!departureDate && !!arriveDate,
      },
    ],
  });

  const tickets = useMemo(
    () => processTicketsData(isOneWay ? oneWayData : twoWayData),
    [isOneWay, oneWayData, twoWayData]
  );

  return { tickets, isLoading: isOneWay ? isLoadingOneWay : isLoadingTwoWay };
};

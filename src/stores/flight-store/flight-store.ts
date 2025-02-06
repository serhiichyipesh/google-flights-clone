import { CABIN_CLASSES, WAY_OPTIONS } from '@/constants';
import { TCabinClass, TParams, TPersons, TTicket, TWayOption } from '@/types';

import { createSelectors } from '@/lib';
import { useMemo } from 'react';
import { create } from 'zustand';

type TFlightStoreItems = {
  persons: TPersons;
  wayOption: TWayOption;
  classOption: TCabinClass;
  departureDate: Date | undefined;
  arriveDate: Date | undefined;
  selectedTicket: TTicket | undefined;
  departureInfo: Pick<TParams, 'origin' | 'originEntityId'>;
  arriveInfo: Pick<TParams, 'destination' | 'destinationEntityId'>;
};

type TFlightStoreActions = {
  setPersons: (persons: TPersons) => void;
  setWayOption: (wayOption: TWayOption) => void;
  setClassOption: (classOption: TCabinClass) => void;
  setDepartureDate: (fromDate: Date | undefined) => void;
  setArriveDate: (toDate: Date | undefined) => void;
  setSelectedTicket: (selectedTicket: TTicket | undefined) => void;
  setDepartureInfo: (
    departureInfo: Pick<TParams, 'origin' | 'originEntityId'>
  ) => void;
  setArriveInfo: (
    arriveInfo: Pick<TParams, 'destination' | 'destinationEntityId'>
  ) => void;
  resetStore: () => void;
};

const initialState: TFlightStoreItems = {
  persons: { Adults: 1 },
  wayOption: WAY_OPTIONS.ROUND,
  classOption: CABIN_CLASSES.ECONOMY,
  departureDate: undefined,
  arriveDate: undefined,
  selectedTicket: undefined,
  departureInfo: { origin: '', originEntityId: '' },
  arriveInfo: { destination: '', destinationEntityId: '' },
};

const useFlightStoreBase = create<TFlightStoreItems & TFlightStoreActions>(
  (set) => ({
    ...initialState,

    setPersons: (persons) => set({ persons }),
    setWayOption: (wayOption) => set({ wayOption }),
    setClassOption: (classOption) => set({ classOption }),
    setDepartureDate: (departureDate) => set({ departureDate }),
    setArriveDate: (arriveDate) => set({ arriveDate }),
    setSelectedTicket: (selectedTicket) => set({ selectedTicket }),
    setDepartureInfo: (departureInfo) => set({ departureInfo }),
    setArriveInfo: (arriveInfo) => set({ arriveInfo }),
    resetStore: () => set(initialState),
  })
);

export const useFlightStore = createSelectors(useFlightStoreBase);

export const useFlight = () => {
  const persons = useFlightStore.use.persons();
  const wayOption = useFlightStore.use.wayOption();
  const classOption = useFlightStore.use.classOption();
  const departureDate = useFlightStore.use.departureDate();
  const arriveDate = useFlightStore.use.arriveDate();
  const selectedTicket = useFlightStore.use.selectedTicket();
  const departureInfo = useFlightStore.use.departureInfo();
  const arriveInfo = useFlightStore.use.arriveInfo();

  const setPersons = useFlightStore.use.setPersons();
  const setWayOption = useFlightStore.use.setWayOption();
  const setClassOption = useFlightStore.use.setClassOption();
  const setDepartureDate = useFlightStore.use.setDepartureDate();
  const setArriveDate = useFlightStore.use.setArriveDate();
  const setSelectedTicket = useFlightStore.use.setSelectedTicket();
  const setDepartureInfo = useFlightStore.use.setDepartureInfo();
  const setArriveInfo = useFlightStore.use.setArriveInfo();
  const resetStore = useFlightStore.use.resetStore();

  const isOneWay = wayOption === WAY_OPTIONS.ONE_WAY;
  const isRoundTrip = wayOption === WAY_OPTIONS.ROUND;

  const totalAmountOfPersons = useMemo(
    () => Object.values(persons).reduce((acc, person) => acc + person, 0),
    [persons]
  );

  return {
    persons,
    totalAmountOfPersons,
    wayOption,
    classOption,
    departureDate,
    arriveDate,
    departureInfo,
    arriveInfo,
    selectedTicket,
    setPersons,
    setWayOption,
    setClassOption,
    setDepartureDate,
    setArriveDate,
    setSelectedTicket,
    setDepartureInfo,
    setArriveInfo,
    resetStore,
    isOneWay,
    isRoundTrip,
  };
};

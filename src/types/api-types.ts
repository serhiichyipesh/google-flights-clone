import { TCabinClass } from '@/types';

export type TPresentation = {
  title: string;
  suggestionTitle: string;
  subtitle: string;
};

export type TRelevantFlightParams = {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
};

export type TRelevantHotelParams = {
  entityId: string;
  entityType: string;
  localizedName: string;
};

export type TNavigation = {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: TRelevantFlightParams;
  relevantHotelParams: TRelevantHotelParams;
};

export type CurrentData = {
  skyId: string;
  entityId: string;
  presentation: TPresentation;
  navigation: TNavigation;
};

export type TGetNearbyAirportsResponse = CurrentData;

export type TParams = {
  origin: string;
  originEntityId: string;

  destination: string;
  destinationEntityId: string;
  date: Date;
};

export type TSearchFlightsTwoWayParams = {
  legs: [from: TParams, to: TParams];
  cabinClass: TCabinClass;
  adults: number;
};

export type TSearchFlightsParams = {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: Date;
  cabinClass: TCabinClass;
  adults: number;
};

export type TTicketsResponse = {
  id: string;
  price: string;
  outbound: {
    airline: string;
    departureAirport: string;
    arrivalAirport: string;
    departureTime: string;
    arrivalTime: string;
    flightNumber: string;
  };
  inbound: {
    airline: string;
    departureAirport: string;
    arrivalAirport: string;
    departureTime: string;
    arrivalTime: string;
    flightNumber: string;
  };
};

type TSegment = {
  marketingCarrier: {
    name: string;
  };
  flightNumber: string;
};

type TLeg = {
  origin: {
    displayCode: string;
  };
  destination: {
    displayCode: string;
  };
  departure: string;
  arrival: string;
  segments: TSegment[];
};

export type TTicketsRawResponse = {
  id: string;
  price: {
    formatted: string;
  };
  legs: TLeg[];
};

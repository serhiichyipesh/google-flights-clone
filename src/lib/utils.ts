import { TTicketsRawResponse } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { format, parseISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { StoreApi, UseBoundStore } from 'zustand';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type WithSelectors<S extends UseBoundStore<StoreApi<object>>> = S extends {
  getState: () => infer T;
}
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <
  T extends object,
  S extends UseBoundStore<StoreApi<T>>,
>(
  _store: S
) => {
  const store = _store as WithSelectors<S>;
  store.use = {} as { [K in keyof T]: () => T[K] };

  for (const k of Object.keys(store.getState()) as Array<keyof T>) {
    store.use[k] = () => store((s) => s[k]);
  }

  return store;
};

export const formatDate = (
  date: unknown,
  dateFormat = 'PP hh:mm a'
): string => {
  if (typeof date === 'string') {
    try {
      const parsed = parseISO(date);
      if (!isNaN(parsed.getTime())) {
        return format(parsed, dateFormat);
      }
    } catch {}
    return date;
  }

  if (date instanceof Date) {
    return format(date, dateFormat);
  }

  return String(date);
};

export const processTicketsData = (data: TTicketsRawResponse[]) => {
  if (!data) return [];

  return data.slice(0, 40).map((itinerary) => {
    const price = itinerary.price.formatted;

    const outboundLeg = itinerary.legs[0];
    const outboundSegment = outboundLeg.segments[0];
    const outbound = {
      airline: outboundSegment.marketingCarrier.name,
      departureAirport: outboundLeg.origin.displayCode,
      arrivalAirport: outboundLeg.destination.displayCode,
      departureTime: outboundLeg.departure,
      arrivalTime: outboundLeg.arrival,
      flightNumber: outboundSegment.flightNumber,
    };

    const inboundLeg = itinerary.legs[1];
    const inboundSegment = inboundLeg.segments[0];
    const inbound = {
      airline: inboundSegment.marketingCarrier.name,
      departureAirport: inboundLeg.origin.displayCode,
      arrivalAirport: inboundLeg.destination.displayCode,
      departureTime: inboundLeg.departure,
      arrivalTime: inboundLeg.arrival,
      flightNumber: inboundSegment.flightNumber,
    };

    return {
      id: itinerary.id,
      price: price,
      outbound,
      inbound,
    };
  });
};

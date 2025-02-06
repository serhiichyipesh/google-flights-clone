import { CABIN_CLASSES, WAY_OPTIONS } from '@/constants';

export type TWayOption = (typeof WAY_OPTIONS)[keyof typeof WAY_OPTIONS];

export type TCabinClass = (typeof CABIN_CLASSES)[keyof typeof CABIN_CLASSES];

export type TPersons = {
  Adults: number;
};

export type TTicket = {
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

export type TAirportsListProps = {
  searchTerm: string;
  isFrom: boolean;
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  setInputValue: (value: string) => void;
};

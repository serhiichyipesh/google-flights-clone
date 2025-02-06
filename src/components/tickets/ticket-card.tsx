import { Button } from '../ui/button';
import { TTicket } from '@/types';
import { VIEWS } from '@/constants';
import { formatDate } from '@/lib';
import { useCallback } from 'react';
import { useFlight } from '@/stores';
import { useViewProvider } from '../../providers/view-provider';

export const TicketCard = ({ id, price, outbound, inbound }: TTicket) => {
  const { setSelectedTicket } = useFlight();
  const { setCurrentView } = useViewProvider();

  const handleSelect = useCallback(() => {
    setSelectedTicket({ id, price, outbound, inbound });
    setCurrentView(VIEWS.DETAILS);
  }, [id, price, outbound, inbound]);

  return (
    <div className="w-full rounded-lg border border-border bg-card p-2 text-card-foreground shadow">
      {/* Price Header (uses a muted background for a subtle highlight) */}
      <div className="mb-2 flex items-center justify-between border-b px-2 pb-2">
        <span className="text-2xl font-semibold text-primary">{price}</span>
        <Button size="lg" className="h-8 text-sm" onClick={handleSelect}>
          Select
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
        {/* Outbound Flight Details (with secondary background) */}
        <div className="rounded-md bg-secondary p-4">
          <h3 className="mb-2 text-lg font-semibold text-secondary-foreground">
            OUTBOUND
          </h3>
          <p className="text-secondary-foreground">
            Airline:{' '}
            <span className="font-medium text-primary-foreground">
              {outbound.airline}
            </span>
          </p>
          <p className="text-secondary-foreground">
            Flight:{' '}
            <span className="font-medium text-primary-foreground">
              {outbound.flightNumber}
            </span>
          </p>
          <p className="text-secondary-foreground">
            Depart:{' '}
            <span className="font-medium">
              {outbound.departureAirport} at{' '}
              {formatDate(outbound.departureTime)}
            </span>
          </p>
          <p className="text-secondary-foreground">
            Arrive:{' '}
            <span className="font-medium">
              {outbound.arrivalAirport} at {formatDate(outbound.arrivalTime)}
            </span>
          </p>
        </div>

        {/* Inbound Flight Details (with accent background) */}
        <div className="rounded-md bg-accent p-4">
          <h3 className="mb-2 text-lg font-semibold text-accent-foreground">
            INBOUND
          </h3>
          <p className="text-accent-foreground">
            Airline:{' '}
            <span className="font-medium text-primary-foreground">
              {inbound.airline}
            </span>
          </p>
          <p className="text-accent-foreground">
            Flight:{' '}
            <span className="font-medium text-primary-foreground">
              {inbound.flightNumber}
            </span>
          </p>
          <p className="text-accent-foreground">
            Depart:{' '}
            <span className="font-medium">
              {inbound.departureAirport} at {formatDate(inbound.departureTime)}
            </span>
          </p>
          <p className="text-accent-foreground">
            Arrive:{' '}
            <span className="font-medium">
              {inbound.arrivalAirport} at {formatDate(inbound.arrivalTime)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

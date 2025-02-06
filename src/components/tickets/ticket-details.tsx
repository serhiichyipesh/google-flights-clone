import { ArrowBigLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { VIEWS } from '@/constants';
import { formatDate } from '@/lib';
import { motion } from 'motion/react';
import { useFlight } from '@/stores';
import { useViewProvider } from '@/providers';

export const TicketDetails = () => {
  const { setCurrentView, isInDetailsView } = useViewProvider();
  const { selectedTicket } = useFlight();

  const goBack = () => {
    setCurrentView(VIEWS.EXPLORE);
  };

  if (!isInDetailsView) return null;

  if (!selectedTicket)
    return <p className="text-center">Please select a ticket</p>;

  const { inbound, outbound } = selectedTicket;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex h-full flex-1 flex-col sm:mx-8 md:mx-16"
    >
      <Button
        size="sm"
        className="mb-4 self-start max-sm:hidden"
        onClick={goBack}
      >
        <ArrowBigLeft />
      </Button>

      <div className="grid grid-cols-1 gap-1 border border-border bg-card p-1 max-sm:mx-4 max-sm:rounded-sm max-sm:bg-card sm:rounded-sm md:grid-cols-2 md:gap-2">
        {/* Outbound Flight Details */}
        <div className="rounded-sm bg-secondary p-4">
          <h3 className="mb-2 text-center text-lg font-semibold text-secondary-foreground">
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

        {/* Inbound Flight Details */}
        <div className="rounded-sm bg-secondary p-4">
          <h3 className="mb-2 text-center text-lg font-semibold text-accent-foreground">
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

      <Button className="m-4 mt-auto sm:hidden" onClick={goBack}>
        Back
      </Button>
    </motion.div>
  );
};

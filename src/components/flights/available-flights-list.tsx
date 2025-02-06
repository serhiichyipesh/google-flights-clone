import { PropagateLoader } from 'react-spinners';
import { TicketCard } from '../tickets';
import { motion } from 'motion/react';
import { useFlight } from '@/stores';
import { useTicketsData } from '@/hooks';
import { useViewProvider } from '@/providers';

export const AvailableFlightsList = () => {
  const { isInExploreView, isInDetailsView } = useViewProvider();
  const { tickets, isLoading } = useTicketsData();
  const {
    isOneWay,
    arriveDate,
    arriveInfo,
    isRoundTrip,
    departureInfo,
    departureDate,
  } = useFlight();

  if (isInExploreView || isInDetailsView) return null;

  if (!departureInfo.origin || !arriveInfo.destination) {
    return (
      <p className="text-center">
        Please select a departure and return airport
      </p>
    );
  }

  if (isRoundTrip && (!departureDate || !arriveDate)) {
    return (
      <p className="text-center">Please select a departure and return date</p>
    );
  }

  if (isOneWay && !departureDate) {
    return <p className="text-center">Please select a departure date</p>;
  }

  if (isLoading)
    return (
      <div className="flex w-full justify-center">
        <PropagateLoader color="#E11D48" />
      </div>
    );

  if (!tickets?.length) {
    return <p className="text-center text-xl">No flights found</p>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative mx-4 flex flex-col gap-2 rounded-md pb-8 md:mx-16"
    >
      <h2 className="mb-1 text-center text-xl md:text-2xl">
        Available Flights
      </h2>

      <div className="grid w-full gap-2 lg:grid-cols-2">
        {tickets.map(
          (ticket) => ticket.id && <TicketCard key={ticket.id} {...ticket} />
        )}
      </div>
    </motion.section>
  );
};

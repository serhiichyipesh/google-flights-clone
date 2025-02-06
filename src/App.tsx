import { AvailableFlightsList, SearchFlights } from '@/components/flights';

import { ModeToggle } from '@/providers';
import { TicketDetails } from '@/components/tickets';
import flightBg from '/flights.svg';

export function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <img
          src={flightBg}
          className="max-h-48 w-full rounded-b-md object-cover"
        />

        <div className="flex flex-row px-2 py-2">
          <h2 className="flex-1 py-4 text-center text-3xl font-bold md:text-5xl">
            Flights
          </h2>

          <div className="absolute right-2 top-2 self-start">
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex h-full w-full flex-1 grow flex-col gap-12">
        <SearchFlights />
        <TicketDetails />
        <AvailableFlightsList />
      </main>
    </div>
  );
}

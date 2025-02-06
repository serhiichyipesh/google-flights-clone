import { VIEWS, useTheme, useViewProvider } from '@/providers';
import { ArrowLeftRight, Search } from 'lucide-react';
import { useCallback, useState } from 'react';

import { useFlight } from '@/stores';
import { debounce } from 'lodash';
import { Button } from '../ui/button';
import { DatePicker } from '../ui/date-picker';
import { AirportsList } from './airports-list';
import { SelectClassOption } from './select-class-option';
import { SelectPersons } from './select-persons';
import { SelectWayOption } from './select-way-option';

export const SearchFlights = () => {
  const {
    isRoundTrip,
    departureDate,
    arriveDate,
    setDepartureDate,
    setArriveDate,
    departureInfo,
    arriveInfo,
    setDepartureInfo,
    setArriveInfo,
    resetStore,
  } = useFlight();

  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  const { setCurrentView, isInDetailsView } = useViewProvider();

  const [fromTerm, setFromTerm] = useState('');
  const [fromInputValue, setFromInputValue] = useState('');

  const [toTerm, setToTerm] = useState('');
  const [toInputValue, setToInputValue] = useState('');

  const debouncedSetFromTerm = useCallback(
    debounce((value) => {
      setFromTerm(value);
    }, 300),
    []
  );

  const debouncedSetToTerm = useCallback(
    debounce((value) => {
      setToTerm(value);
    }, 300),
    []
  );

  const handleSwapDestinations = useCallback(() => {
    setFromInputValue(toInputValue);
    setToInputValue(fromInputValue);
    setDepartureInfo({
      origin: arriveInfo.destination,
      originEntityId: arriveInfo.destinationEntityId,
    });
    setArriveInfo({
      destination: departureInfo.origin,
      destinationEntityId: departureInfo.originEntityId,
    });
  }, [fromInputValue, toInputValue, arriveInfo, departureInfo]);

  const handleFromInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFromInputValue(value);
      debouncedSetFromTerm(value);
    },
    []
  );

  const handleToInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setToInputValue(value);
      debouncedSetToTerm(value);
    },
    []
  );

  const handleExplorePress = () => {
    setCurrentView((prev) =>
      prev === VIEWS.MAIN ? VIEWS.EXPLORE : VIEWS.MAIN
    );
  };

  const handleResetPress = () => {
    resetStore();
    debouncedSetFromTerm('');
    debouncedSetToTerm('');
    setCurrentView(VIEWS.MAIN);
  };

  if (isInDetailsView) return null;

  return (
    <section className="relative flex flex-col gap-2 border-[1px] bg-card p-2 pb-8 shadow-lg max-sm:border-x-0 sm:mx-8 sm:rounded-md sm:border-border sm:p-4 sm:pb-8 md:mx-16">
      <div className="flex flex-wrap-reverse items-center gap-2 max-md:justify-between max-smallPhone:grow">
        <SelectWayOption />
        <SelectPersons />
        <SelectClassOption />

        <Button
          variant={isDarkTheme ? 'outline' : 'default'}
          className="ml-auto h-7"
          onClick={handleResetPress}
        >
          Reset
        </Button>
      </div>

      <div className="relative flex justify-between gap-2 max-md:flex-col md:flex-row">
        <AirportsList
          isFrom
          placeholder="Where from?"
          searchTerm={fromTerm}
          inputValue={fromInputValue}
          setInputValue={setFromInputValue}
          handleInputChange={handleFromInputChange}
        />

        <Button
          variant={isDarkTheme ? 'outline' : 'default'}
          className="flex flex-[0.2] flex-col"
          onClick={handleSwapDestinations}
        >
          <ArrowLeftRight className="max-md:rotate-90" />
        </Button>

        <AirportsList
          isFrom={false}
          placeholder="Where to?"
          searchTerm={toTerm}
          inputValue={toInputValue}
          setInputValue={setToInputValue}
          handleInputChange={handleToInputChange}
        />

        <div className="flex flex-1 gap-2 max-sm:flex-col md:ml-1">
          <DatePicker
            placeholder="Departure Date"
            flightDate={departureDate}
            setFlightDate={setDepartureDate}
          />

          {isRoundTrip && (
            <DatePicker
              placeholder="Return Date"
              flightDate={arriveDate}
              setFlightDate={(date: Date) =>
                departureDate && date.getTime() < departureDate.getTime()
                  ? setDepartureDate(date)
                  : setArriveDate(date)
              }
            />
          )}
        </div>
      </div>

      <Button
        onClick={handleExplorePress}
        className="absolute -bottom-5 left-1/2 w-[300px] -translate-x-1/2 transform rounded-full shadow-md"
      >
        Explore
        <Search />
      </Button>
    </section>
  );
};

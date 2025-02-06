import { memo, useState } from 'react';

import { Input } from '../ui/input';
import { MapPin } from 'lucide-react';
import { TAirportsListProps } from '@/types';
import { searchAirportsByTerm } from '@/api';
import { useFlight } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import { useViewProvider } from '@/providers';

export const AirportsList = memo(
  ({
    searchTerm,
    isFrom,
    inputValue,
    setInputValue,
    handleInputChange,
    placeholder,
  }: TAirportsListProps) => {
    const { setArriveInfo, setDepartureInfo } = useFlight();
    const { isInExploreView } = useViewProvider();

    const [showData, setShowData] = useState(!isInExploreView);

    const { data } = useQuery({
      queryKey: ['airports', searchTerm],
      queryFn: () => searchAirportsByTerm(searchTerm),
      enabled: !!searchTerm,
    });

    return (
      <div className="relative flex flex-1 flex-col">
        <Input
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={() => setShowData(true)}
        />

        {showData && data && (
          <ul className="absolute left-6 top-10 z-10 flex max-h-64 flex-col gap-2 overflow-y-auto rounded-sm bg-accent p-2 shadow-xl">
            {data.map((item) => (
              <li
                key={item.entityId}
                className="flex cursor-pointer items-center gap-4 rounded-sm p-2 hover:bg-primary/50"
                onClick={() => {
                  console.log('click');
                  if (isFrom) {
                    setArriveInfo({
                      destination: item.presentation.title,
                      destinationEntityId: item.entityId,
                    });
                  } else {
                    setDepartureInfo({
                      origin: item.presentation.title,
                      originEntityId: item.entityId,
                    });
                  }

                  setInputValue(item.presentation.title);
                  setShowData(false);
                }}
              >
                <MapPin />
                {item.presentation.title}, {item.presentation.subtitle}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

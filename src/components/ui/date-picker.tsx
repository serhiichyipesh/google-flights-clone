import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { SelectSingleEventHandler } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type TDatePickerProps = {
  flightDate: Date | undefined;
  setFlightDate: (date: Date) => void;
  placeholder: string;
};

export function DatePicker({
  flightDate,
  setFlightDate,
  placeholder,
}: TDatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'flex flex-1 justify-start bg-transparent text-left font-normal',
            !flightDate && 'text-muted-foreground'
          )}
        >
          <CalendarIcon />
          {flightDate ? format(flightDate, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={flightDate}
          onSelect={setFlightDate as SelectSingleEventHandler}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

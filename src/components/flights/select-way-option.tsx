import {
  ArrowLeftRight,
  ArrowRight,
  ChevronDown,
  ChevronsLeftRightEllipsis,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { WAY_OPTIONS } from '@/constants';
import { motion } from 'motion/react';
import { useFlight } from '@/stores';
import { useState } from 'react';

export const SelectWayOption = () => {
  const { wayOption, setWayOption, isOneWay, isRoundTrip } = useFlight();

  const [opened, setOpened] = useState(false);

  return (
    <DropdownMenu open={opened} onOpenChange={setOpened}>
      <DropdownMenuTrigger className="rounded-sm hover:bg-secondary">
        <div className="flex w-40 items-center gap-2 px-3 py-1">
          {isOneWay ? (
            <ArrowRight className="h-4 w-4" />
          ) : isRoundTrip ? (
            <ArrowLeftRight className="h-4 w-4" />
          ) : (
            <ChevronsLeftRightEllipsis className="h-4 w-4" />
          )}

          {wayOption}

          <motion.div
            animate={{ rotate: opened ? -180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {Object.values(WAY_OPTIONS).map((option) => (
          <DropdownMenuItem key={option} onClick={() => setWayOption(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

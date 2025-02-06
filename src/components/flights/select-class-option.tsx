import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { CABIN_CLASSES } from '@/constants';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useFlight } from '@/stores';
import { useState } from 'react';

export const SelectClassOption = () => {
  const { classOption, setClassOption } = useFlight();

  const [opened, setOpened] = useState(false);

  return (
    <DropdownMenu open={opened} onOpenChange={setOpened}>
      <DropdownMenuTrigger className="rounded-sm hover:bg-secondary">
        <div className="flex items-center gap-2 px-3 py-1">
          {classOption}

          <motion.div
            animate={{ rotate: opened ? -180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {Object.values(CABIN_CLASSES).map((option) => (
          <DropdownMenuItem key={option} onClick={() => setClassOption(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import { ChevronDown, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { Button } from '../ui/button';
import { PERSONS_OPTIONS } from '@/constants';
import { motion } from 'motion/react';
import { useFlight } from '@/stores';
import { useState } from 'react';

export const SelectPersons = () => {
  const { totalAmountOfPersons, persons, setPersons } = useFlight();

  const [opened, setOpened] = useState(false);

  return (
    <DropdownMenu open={opened} onOpenChange={setOpened}>
      <DropdownMenuTrigger className="rounded-sm hover:bg-secondary">
        <div className="flex items-center px-3 py-1">
          <User className="h-5 w-5" />
          <p className="w-8 text-center">{totalAmountOfPersons}</p>
          <motion.div
            animate={{ rotate: opened ? -180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {PERSONS_OPTIONS.map((option) => {
          const isAdult = option === 'Adults';

          return (
            <DropdownMenuItem
              key={option}
              className="focus:bg-transparent"
              onSelect={(e) => e.preventDefault()}
            >
              <div className="flex w-full items-center justify-between gap-4">
                <span>{option}</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={persons[option] === (isAdult ? 1 : 0)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPersons({
                        ...persons,
                        [option]: Math.max(
                          persons[option] - 1,
                          option === 'Adults' ? 1 : 0
                        ),
                      });
                    }}
                  >
                    -
                  </Button>
                  <p className="w-8 text-center">{persons[option]}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPersons({
                        ...persons,
                        [option]: Math.min(persons[option] + 1, 10),
                      });
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

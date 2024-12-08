import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const vaults = ['Default', 'Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];

export function VaultComboBox() {
  const [open, setOpen] = useState(false);
  const [currentVault, setCurrentVault] = useState('Default');

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-[200px]"
          >
            {currentVault}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Default" />
            <CommandList>
              <CommandEmpty>No vaults added...</CommandEmpty>
              <CommandGroup>
                {vaults.map((vault, index) => (
                  <CommandItem
                    key={index}
                    value={vault}
                    onSelect={(vault) => {
                      setCurrentVault(vault);
                      setOpen(false);
                    }}
                  >
                    {vault}
                    <Check
                      className={cn(
                        'ml-auto',
                        vault === currentVault ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}

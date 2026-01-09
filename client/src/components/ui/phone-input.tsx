import React, { useState, forwardRef } from "react";
import { IMaskInput } from "react-imask";
import { ChevronDown, Check } from "lucide-react";
import * as Flags from "country-flag-icons/react/3x2";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  { code: "BR", name: "Brasil", dial: "+55", mask: "(00) 0000-0000" },
  { code: "US", name: "Estados Unidos", dial: "+1", mask: "(000) 000-0000" },
  { code: "PT", name: "Portugal", dial: "+351", mask: "000 000 000" },
  { code: "AR", name: "Argentina", dial: "+54", mask: "(000) 000-0000" },
  { code: "GB", name: "Reino Unido", dial: "+44", mask: "0000 000000" },
] as const;

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, className, error, ...props }, ref) => {
    const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
    const [open, setOpen] = useState(false);

    const FlagComponent = Flags[selectedCountry.code as keyof typeof Flags];

    return (
      <div className={cn("flex rounded-lg border bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all duration-200 shadow-sm", error ? "border-destructive ring-destructive/20" : "border-input")}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 border-r hover:bg-muted transition-colors rounded-l-lg outline-none"
            >
              {FlagComponent && <FlagComponent className="w-6 h-4 rounded-sm shadow-sm" />}
              <span className="text-sm font-medium text-muted-foreground">{selectedCountry.dial}</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] p-0 opacity-100 bg-popover" align="start">
            <Command className="bg-popover opacity-100">
              <CommandInput placeholder="Buscar país..." />
              <CommandList>
                <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
                <CommandGroup>
                  {COUNTRIES.map((country) => {
                    const CFlag = Flags[country.code as keyof typeof Flags];
                    return (
                      <CommandItem
                        key={country.code}
                        value={country.name}
                        onSelect={() => {
                          setSelectedCountry(country);
                          setOpen(false);
                          onChange(""); 
                        }}
                      >
                        <CFlag className="mr-2 h-3 w-4 rounded-sm" />
                        <span className="flex-1">{country.name}</span>
                        <span className="text-muted-foreground ml-2">{country.dial}</span>
                        {selectedCountry.code === country.code && (
                          <Check className="ml-auto h-4 w-4" />
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <IMaskInput
          className={cn(
            "flex h-11 w-full bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 font-mono",
            className
          )}
          mask={selectedCountry.mask}
          dispatch={(appended, dynamicMasked) => {
            const isBR = selectedCountry.code === "BR";
            const currentRaw = (dynamicMasked.unmaskedValue || "") + appended;
            if (isBR && currentRaw.length > 10) {
              return "(00) 0 0000-0000";
            }
            return selectedCountry.mask;
          }}
          definitions={{
            '0': /[0-9]/,
          }}
          value={value}
          lazy={false}
          unmask={true}
          onAccept={(val: string) => {
            // val is the unmasked value (only digits from the input)
            onChange(val);
          }}
          placeholder={selectedCountry.mask.replace(/0/g, "_")}
          inputRef={ref as any}
          {...props}
        />
      </div>
    );
  }
);
PhoneInput.displayName = "PhoneInput";

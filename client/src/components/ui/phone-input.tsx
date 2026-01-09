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

// Define supported countries with codes and masks
// Simplified list for demo purposes
const COUNTRIES = [
  { code: "BR", name: "Brazil", dial: "+55", mask: "(00) 0 0000-0000" },
  { code: "US", name: "United States", dial: "+1", mask: "(000) 000-0000" },
  { code: "PT", name: "Portugal", dial: "+351", mask: "000 000 000" },
  { code: "AR", name: "Argentina", dial: "+54", mask: "(000) 000-0000" },
  { code: "GB", name: "United Kingdom", dial: "+44", mask: "0000 000000" },
] as const;

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, className, error, ...props }, ref) => {
    // Default to Brazil or first option
    const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
    const [open, setOpen] = useState(false);

    // This is the raw value for the input field (without country code)
    // We need to parse the incoming value to separate CC if needed, 
    // but for simplicity in this component we assume 'value' passed in 
    // is the full string including CC, or we manage internal state.
    // 
    // However, the requirement is to save: CC + DDD + Digits.
    // And input mask is (00) ...
    // Let's keep the internal state as just the masked part for the input,
    // and emit the full numeric string on change.

    const FlagComponent = Flags[selectedCountry.code as keyof typeof Flags];

    return (
      <div className={cn("flex rounded-lg border bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all duration-200", error ? "border-destructive ring-destructive/20" : "border-input")}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 border-r hover:bg-muted/50 transition-colors rounded-l-lg outline-none"
            >
              {FlagComponent && <FlagComponent className="w-6 h-4 rounded-sm shadow-sm" />}
              <span className="text-sm font-medium text-muted-foreground">{selectedCountry.dial}</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
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
                          // Clear input on country change to prevent format mess
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
            "flex h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 font-mono",
            className
          )}
          mask={selectedCountry.mask}
          definitions={{
            '0': /[0-9]/,
          }}
          value={value} // Controls the display value in the input
          unmask={true} // We want unmasked value for processing? No, let's handle manually
          onAccept={(val: string, mask: any) => {
            // val is the raw unmasked value of the input part
            // We need to combine Country Code + Val
            // But the parent form expects the 'phone' string.
            // Requirement: "ao salvar salve somente os numeros o codigo de pais e os 2 primeiros que seria o ddd e os 8 ultimos numeros"
            
            // We pass just the raw digits of the input to the parent.
            // The parent (or this component) should combine with Dial Code.
            // Let's pass the raw digits combined with CC.
            
            const rawDigits = val.replace(/\D/g, "");
            if (rawDigits.length > 0) {
              const cc = selectedCountry.dial.replace(/\D/g, "");
              onChange(cc + rawDigits);
            } else {
              onChange("");
            }
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

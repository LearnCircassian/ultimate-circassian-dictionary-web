import React, { ChangeEvent } from "react";
import { cn } from "~/utils/classNames";

export interface LabeledValue<T> {
  label: string;
  value: T;
}

interface DropdownProps<T> {
  options: LabeledValue<T>[];
  selectedOption: LabeledValue<T>;
  setSelectedOption: (v: LabeledValue<T>) => void;
  showBorders?: boolean;
  overrideClassName?: string;
}

export default function Dropdown<T>({
  options,
  selectedOption,
  setSelectedOption,
  showBorders = true,
  overrideClassName,
}: DropdownProps<T>) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedLabel = event.target.value;
    const newSelectedOption = options.find((option) => option.label === selectedLabel);
    if (!newSelectedOption) {
      return;
    }
    setSelectedOption(newSelectedOption);
  }

  return (
    <div>
      <select
        id="options"
        value={selectedOption.label}
        onChange={handleChange}
        className={cn(
          "bg-transparent p-2",
          { "border-gray border border-solid": showBorders },
          overrideClassName,
        )}
      >
        {options.map((option, idx) => (
          <option key={idx} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
